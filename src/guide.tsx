/**
 * The discussion guide: a two-page A4 booklet generated from the chapter
 * data.
 *
 * Page one is the guide's cover and apparatus — the book, the three-week
 * reading schedule, and how the club runs a meeting. Page two walks the
 * chapters in order: every discussion question in the book's data, each
 * with the margin note that provoked it, printed beside it as a
 * MarginNote. Print it, fold it into the book, bring it on the night.
 */
import {
  Column,
  Divider,
  Document,
  Heading,
  PageBreak,
  PageFooter,
  PageNumber,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { book, chapters, club, featuredChapter, finePrint, host, meeting, member, readingSchedule } from "./data";
import { palette, marginaliaTheme, webFonts } from "./theme";
import { BookCover, MarginNote } from "./elements";

export default function DiscussionGuide() {
  return (
    <Document
      size="A4"
      orientation="portrait"
      margin={[48, 52, 44, 52]}
      theme={marginaliaTheme}
      title={`Discussion guide — ${book.title}, ${club.name}`}
      lang="en"
      fonts={webFonts}
      style={{ fontSize: 13, lineHeight: 1.55, gap: 12 }}
    >
      {/* ---------- Page one: the apparatus ---------- */}
      <Row style={{ gap: 30, alignItems: "start" }}>
        <BookCover width={168} height={252} />
        <Column style={{ gap: 10 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.gold }}>{club.name} · Discussion guide</Text>
          <Heading level={1} style={{ fontSize: 34, lineHeight: 1.12 }}>{book.title}</Heading>
          <Text style={{ fontSize: 16, lineHeight: 1.45, color: palette.inkSoft }}>
            by {book.author} · {book.genre.toLowerCase()} · {book.pages} pages
          </Text>
          <Text style={{ fontSize: 13.5, lineHeight: 1.65 }}>{book.blurb}</Text>
          <Text style={{ fontSize: 12, lineHeight: 1.55, color: token("colors.muted") }}>
            {book.publisher}, {book.published} · ISBN {book.isbn} · Guide prepared for {member.fullName} · Hosted by{" "}
            {host.fullName}
          </Text>
        </Column>
      </Row>

      <Divider />

      <Column style={{ gap: 8 }}>
        <Text style={{ apply: ["metaLabel"] }}>The meeting</Text>
        <Text style={{ fontSize: 13.5, lineHeight: 1.6 }}>
          {meeting.dateLabel} · {club.venue}, {club.addressLines.join(", ")} · Doors {meeting.doors}, discussion{" "}
          {meeting.discussion}–{meeting.close}. Bring this guide inside your copy of the book.
        </Text>
      </Column>

      <Column style={{ gap: 8 }}>
        <Text style={{ apply: ["metaLabel"] }}>The reading, in three weeks</Text>
        <Table
          style={{
            cellPadding: [7, 9],
            rowBorder: { width: 1, style: "solid", color: token("colors.border") },
            fontSize: 12.5,
          }}
        >
          <TableRow header>
            <TableCell>Week</TableCell>
            <TableCell>Dates</TableCell>
            <TableCell>Reading</TableCell>
            <TableCell style={{ textAlign: "right" }}>Pages</TableCell>
          </TableRow>
          {readingSchedule.map((row) => (
            <TableRow key={row.week}>
              <TableCell style={{ fontWeight: 700 }}>{row.week}</TableCell>
              <TableCell>{row.dates}</TableCell>
              <TableCell>{row.reading}</TableCell>
              <TableCell style={{ textAlign: "right" }}>{row.pages}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Column>

      <Column style={{ gap: 8 }}>
        <Text style={{ apply: ["metaLabel"] }}>The opening page</Text>
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontStyle: "italic",
            fontSize: 16.5,
            lineHeight: 1.6,
            color: palette.ink,
          }}
        >
          “{featuredChapter.passage}”
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.55, color: token("colors.muted") }}>
          Chapter 12, page 214 — the passage we open with, read aloud before any arguing begins.
        </Text>
      </Column>

      <Column style={{ gap: 8 }}>
        <Text style={{ apply: ["metaLabel"] }}>Before you come</Text>
        <Text style={{ fontSize: 13.5, lineHeight: 1.65 }}>
          Bring your copy, annotated — pencil notes in the margins are not just allowed, they are the agenda. Bring
          one passage to read aloud, ninety seconds from any chapter. And bring one question of your own: the thing
          you are still arguing with the book about.
        </Text>
      </Column>

      <Column style={{ gap: 8 }}>
        <Text style={{ apply: ["metaLabel"] }}>How the club discusses</Text>
        <Text style={{ fontSize: 13.5, lineHeight: 1.65 }}>
          We open with the passage on page 214, read aloud. Then the chapters in order — the questions on the next
          page are the agenda, and the margin notes printed beside them are the opening positions, not the
          conclusions. Anyone may defend any note, including someone else's. Spoilers are assumed; the host keeps
          the wine and the clock.
        </Text>
      </Column>

      <PageBreak />

      {/* ---------- Page two: chapter by chapter ---------- */}
      <Column style={{ gap: 6 }}>
        <Text style={{ apply: ["eyebrow"], color: palette.gold }}>The agenda</Text>
        <Heading level={2} style={{ fontSize: 24 }}>Questions, chapter by chapter</Heading>
        <Text style={{ fontSize: 12.5, lineHeight: 1.6, color: token("colors.muted") }}>
          Each question stands beside the margin note that provoked it. Bring a position on at least one question
          per chapter — and a passage to prove it with.
        </Text>
      </Column>

      {chapters.map((chapter) => (
        <Column key={chapter.number} style={{ gap: 5 }}>
          <Row style={{ gap: 12, alignItems: "start" }}>
            <Column style={{ gap: 5 }}>
              <Text style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.35, color: palette.oxblood }}>
                Chapter {chapter.number} — {chapter.title}{" "}
                <Span style={{ fontSize: 11.5, fontWeight: 600, color: palette.muted }}>{chapter.pages}</Span>
              </Text>
              {chapter.questions.map((q, i) => (
                <Text key={i} style={{ fontSize: 12.25, lineHeight: 1.5 }}>
                  <Span style={{ fontWeight: 700, color: palette.oxblood }}>{i + 1}. </Span>
                  {q}
                </Text>
              ))}
            </Column>
            <Column style={{ width: 218, flex: "none", gap: 10, padding: [2, 0, 0] }}>
              {chapter.annotations.slice(0, 1).map((a) => (
                <MarginNote key={a.marker} marker={a.marker} note={a.note} by={a.by} tone={a.tone} size="compact" />
              ))}
            </Column>
          </Row>
          <Divider />
        </Column>
      ))}

      <PageFooter style={{ padding: [8, 0, 0], border: { top: `1px solid ${palette.border}` }, gap: 2 }}>
        <Row style={{ gap: 16 }}>
          <Text style={{ fontSize: 9.5, color: token("colors.muted") }}>
            {club.name} · {book.title} discussion guide · {club.email}
          </Text>
          <Text style={{ width: 110, textAlign: "right", fontSize: 9.5, color: token("colors.muted") }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
        {finePrint.map((line) => (
          <Text key={line} style={{ fontSize: 8.5, lineHeight: 1.4, color: token("colors.muted") }}>
            {line}
          </Text>
        ))}
      </PageFooter>
    </Document>
  );
}
