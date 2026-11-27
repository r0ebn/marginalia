/**
 * Build: validate every template, then render everything into `out/`.
 *
 *   npm run build
 *
 * The build gate is `validate()`: any error fails the build, warnings are
 * printed. The letter is also checked with the
 * `@hyper-elements/email-clients` plugin (classic Outlook, Gmail, Apple
 * Mail and the rest), and per-client previews are written to
 * `out/clients/`.
 *
 * Outputs:
 *   out/letter.html, out/letter.txt    the invitation letter + text twin
 *   out/annotated-page.html            the annotated book page
 *   out/guide.html, out/guide.pdf      the discussion guide (A4)
 *   out/quote-card.png, out/quote-card.svg  the quote card (1080 x 1080)
 *   out/clients/*.html                 the letter as Outlook, Gmail and
 *                                      Apple Mail draw it
 *
 * Nothing is fetched at build time: the PDF and the quote card get their
 * fonts as local WOFF files from the @fontsource packages — see
 * `src/fonts.ts`.
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { ElementsError, formatDiagnostics, render, validate } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import InvitationLetter from "../src/letter";
import AnnotatedPage from "../src/annotated-page";
import DiscussionGuide from "../src/guide";
import QuoteCard from "../src/quote-card";
import { loadFontFiles } from "../src/fonts";

const OUT = new URL("../out/", import.meta.url);

function report(name: string, diagnostics: { severity: string }[] | readonly { severity: string }[], formatted: string) {
  const errors = diagnostics.filter((d) => d.severity === "error").length;
  const warnings = diagnostics.filter((d) => d.severity === "warning").length;
  console.log(`\n== ${name}: ${errors} error(s), ${warnings} warning(s)`);
  if (formatted.trim()) console.log(formatted);
  return errors;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(new URL("clients/", OUT), { recursive: true });

  const clientsPlugin = await emailClients();

  // --- Build gate: validate all four templates. Errors fail the build. ---
  let errors = 0;
  const letterEl = createElement(InvitationLetter);
  const pageEl = createElement(AnnotatedPage);
  const guideEl = createElement(DiscussionGuide);
  const cardEl = createElement(QuoteCard);

  const letterValidation = validate(letterEl, { plugins: [clientsPlugin] });
  errors += report("validate letter (+ email-clients)", letterValidation.diagnostics, formatDiagnostics(letterValidation.diagnostics));
  const pageValidation = validate(pageEl);
  errors += report("validate annotated page", pageValidation.diagnostics, formatDiagnostics(pageValidation.diagnostics));
  const guideValidation = validate(guideEl);
  errors += report("validate guide", guideValidation.diagnostics, formatDiagnostics(guideValidation.diagnostics));
  const cardValidation = validate(cardEl);
  errors += report("validate quote card", cardValidation.diagnostics, formatDiagnostics(cardValidation.diagnostics));
  if (errors > 0) {
    console.error(`\nBuild failed: ${errors} validation error(s).`);
    process.exitCode = 1;
    return;
  }

  // --- Letter: HTML + plain-text twin. ---
  const letter = await render(letterEl, { plugins: [clientsPlugin] });
  report("render letter", letter.diagnostics, formatDiagnostics(letter.diagnostics));
  await writeFile(new URL("letter.html", OUT), letter.html);
  await writeFile(new URL("letter.txt", OUT), letter.text);
  console.log("Wrote out/letter.html, out/letter.txt");

  // --- Per-client previews of the letter. ---
  const previews = await renderInEmailClients(letterEl, {
    emailClients: ["outlook", "gmail", "apple-mail"],
    fonts: "inline",
  });
  for (const preview of previews.previews) {
    await writeFile(new URL(`clients/${preview.filename}`, OUT), preview.html);
    console.log(`Wrote out/clients/${preview.filename}`);
  }
  for (const skipped of previews.skipped) {
    console.log(`Skipped client preview: ${skipped.client} — ${skipped.reason}`);
  }
  report("email-clients previews", previews.diagnostics, formatDiagnostics(previews.diagnostics));

  // --- Annotated page. ---
  const page = await render(pageEl);
  report("render annotated page", page.diagnostics, formatDiagnostics(page.diagnostics));
  await writeFile(new URL("annotated-page.html", OUT), page.html);
  console.log("Wrote out/annotated-page.html");

  // --- Guide: print HTML + PDF. ---
  const guide = await render(guideEl);
  report("render guide", guide.diagnostics, formatDiagnostics(guide.diagnostics));
  await writeFile(new URL("guide.html", OUT), guide.html);
  console.log("Wrote out/guide.html");

  const fonts = await loadFontFiles();
  console.log(`\nLoaded ${fonts.length} font files for the PDF and image engines`);
  const pdf = await renderPdf(guideEl, { fonts });
  report("renderPdf guide", pdf.diagnostics, formatDiagnostics(pdf.diagnostics));
  await writeFile(new URL("guide.pdf", OUT), pdf.pdf);
  console.log(`Wrote out/guide.pdf (${pdf.pdf.length} bytes)`);

  // --- Quote card: PNG + SVG. ---
  const png = await renderImage(cardEl, { fonts });
  report("renderImage quote card (png)", png.diagnostics, formatDiagnostics(png.diagnostics));
  await writeFile(new URL("quote-card.png", OUT), png.image);
  console.log(`Wrote out/quote-card.png (${png.width}x${png.height}, ${png.image.length} bytes)`);

  const svg = await renderImage(cardEl, { fonts, format: "svg" });
  report("renderImage quote card (svg)", svg.diagnostics, formatDiagnostics(svg.diagnostics));
  await writeFile(new URL("quote-card.svg", OUT), svg.image);
  console.log(`Wrote out/quote-card.svg (${svg.image.length} bytes)`);

  // The README embeds the quote card, and `out/` is gitignored — so a
  // copy lives in `docs/`, refreshed on every build.
  await mkdir(new URL("../docs/screenshots/", import.meta.url), { recursive: true });
  await copyFile(new URL("quote-card.svg", OUT), new URL("../docs/quote-card.svg", import.meta.url));
  await copyFile(new URL("quote-card.png", OUT), new URL("../docs/screenshots/canvas.png", import.meta.url));
  console.log("Copied quote card to docs/quote-card.svg and docs/screenshots/canvas.png");

  console.log("\nBuild complete. Open out/letter.html, out/annotated-page.html, out/guide.html, out/guide.pdf or out/quote-card.png.");
}

main().catch((error) => {
  if (error instanceof ElementsError) {
    console.error(formatDiagnostics(error.diagnostics));
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
