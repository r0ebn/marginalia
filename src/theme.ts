/**
 * Marginalia — the brand, written once.
 *
 * One `defineTheme()` serves all four roots: the meeting invitation email,
 * the book-of-the-month page, the printable discussion guide and the quote
 * card. Warm paper cream, ink and oxblood; Source Serif 4 for display
 * type, Inter for body.
 *
 * The hex palette lives in `palette` so the drawn Svg artwork (the book
 * cover, the bookmark ribbon, the quote marks) uses exactly the same
 * colors as the theme tokens.
 */
import { defineTheme } from "@hyper-elements/react";

export const palette = {
  paper: "#FAF5EC",
  paperDeep: "#F1E8D8",
  card: "#FFFFFF",
  ink: "#1E1B16",
  inkSoft: "#3A352B",
  muted: "#7A7261",
  border: "#E3D9C6",
  oxblood: "#7A2E2E",
  oxbloodDeep: "#5E2222",
  oxbloodSoft: "#A85B5B",
  gold: "#B98A2F",
  white: "#FFFFFF",
} as const;

export const fontStacks = {
  display: "'Source Serif 4', Georgia, 'Times New Roman', serif",
  body: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

/**
 * Web fonts for the HTML roots (email, page, print HTML). The latin
 * subsets only — the templates are English. Inter is served from Google
 * Fonts; Source Serif 4 from the @fontsource package on the jsDelivr CDN.
 * The PDF and the quote card do not fetch these; `src/fonts.ts` hands
 * them the same families as local WOFF files from the @fontsource
 * packages.
 */
export const webFonts = [
  {
    family: "Source Serif 4",
    src: "https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.2.5/files/source-serif-4-latin-400-normal.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Source Serif 4",
    src: "https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.2.5/files/source-serif-4-latin-600-normal.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Source Serif 4",
    src: "https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.2.5/files/source-serif-4-latin-700-normal.woff2",
    format: "woff2" as const,
    weight: 700,
  },
  {
    family: "Source Serif 4",
    src: "https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.2.5/files/source-serif-4-latin-400-italic.woff2",
    format: "woff2" as const,
    weight: 400,
    style: "italic" as const,
  },
  {
    family: "Source Serif 4",
    src: "https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5.2.5/files/source-serif-4-latin-600-italic.woff2",
    format: "woff2" as const,
    weight: 600,
    style: "italic" as const,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 500,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 700,
  },
];

export const marginaliaTheme = defineTheme({
  colors: {
    background: palette.paper,
    foreground: palette.ink,
    primary: palette.oxblood,
    primaryForeground: palette.paper,
    muted: palette.muted,
    border: palette.border,
    accent: palette.paperDeep,
    accentForeground: palette.ink,
    paper: palette.paper,
    paperDeep: palette.paperDeep,
    card: palette.card,
    ink: palette.ink,
    inkSoft: palette.inkSoft,
    oxblood: palette.oxblood,
    oxbloodDeep: palette.oxbloodDeep,
    gold: palette.gold,
  },
  fonts: {
    body: fontStacks.body,
    heading: fontStacks.display,
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.6 },
  radii: { card: 10, pill: 999 },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 40, lineHeight: 1.1, fontWeight: 600, letterSpacing: -0.4, mobile: { fontSize: 30 } },
          2: { fontSize: 26, lineHeight: 1.22, fontWeight: 600, letterSpacing: -0.2, mobile: { fontSize: 22 } },
          3: { fontSize: 18, lineHeight: 1.3, fontWeight: 600 },
        },
      },
    },
    Button: {
      backgroundColor: "{colors.primary}",
      color: "{colors.primaryForeground}",
      fontSize: 16,
      fontWeight: 600,
      padding: [14, 28],
      borderRadius: 999,
      hover: { backgroundColor: "{colors.oxbloodDeep}" },
      variants: {
        outline: {
          backgroundColor: "{colors.card}",
          color: "{colors.primary}",
          hover: { backgroundColor: "{colors.accent}" },
        },
        light: {
          backgroundColor: "{colors.paper}",
          color: "{colors.oxblood}",
          hover: { backgroundColor: "{colors.paperDeep}" },
        },
      },
    },
    Link: {
      color: "{colors.primary}",
      fontWeight: 600,
    },
  },
  styles: {
    /** A sheet of writing paper: white, hairline-ruled, gently shadowed by its border. */
    sheet: {
      backgroundColor: "{colors.card}",
      border: { width: 1, style: "solid", color: "{colors.border}" },
      borderRadius: 4,
      padding: 36,
      gap: 16,
    },
    /** Small-caps eyebrow above a heading. */
    eyebrow: {
      fontFamily: "{fonts.body}",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
    /** A label over a value (date, doors, host). */
    metaLabel: {
      fontFamily: "{fonts.body}",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      lineHeight: 1.4,
      color: "{colors.muted}",
    },
    /** A rounded pill, e.g. the chapter tag on the quote card. */
    pill: {
      backgroundColor: "{colors.oxblood}",
      color: palette.paper,
      fontFamily: "{fonts.body}",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 1.2,
      padding: [8, 16],
      borderRadius: 999,
    },
  },
  formats: {
    email: {
      elements: {
        Heading: {
          by: {
            level: {
              1: { fontSize: 36, mobile: { fontSize: 28 } },
              2: { fontSize: 24, mobile: { fontSize: 20 } },
            },
          },
        },
      },
    },
  },
});

/** Type every token name in templates. */
declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof marginaliaTheme;
  }
}
