/**
 * The quote card: one passage, set large.
 *
 * Chapter 12's apology, in big serif on warm paper, with pencil
 * marginalia drawn around it and Theo's margin note on that very page
 * set underneath — the club's whole idea in one square: a passage, and
 * what a reader wrote back to it.
 */
import { Canvas, Column, Heading, Row, Span, Text, token } from "@hyper-elements/react";
import { book, club, featuredChapter, meeting } from "./data";
import { palette, marginaliaTheme } from "./theme";
import { MarginDoodles, MarginNote } from "./elements";

const theoNote = featuredChapter.annotations[0];

export default function QuoteCard() {
  return (
    <Canvas
      width={1080}
      height={1080}
      theme={marginaliaTheme}
      title={`“${book.title}” — a passage, with ${club.name}`}
      lang="en"
      style={{
        backgroundColor: palette.paper,
        color: palette.ink,
        padding: [64, 76],
        gap: 22,
        justifyContent: "space-between",
      }}
    >
      <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2.6, color: palette.oxblood }}>
          THE MARGINALIA CLUB
        </Text>
        <Text style={{ apply: ["pill"], flex: "none", fontSize: 13 }}>
          Chapter {featuredChapter.number}
        </Text>
      </Row>

      <Column style={{ gap: 26 }}>
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontSize: 120,
            fontWeight: 700,
            lineHeight: 0.8,
            color: palette.oxblood,
          }}
        >
          “
        </Text>
        <Heading
          level={1}
          style={{ fontSize: 55, lineHeight: 1.28, fontWeight: 600, fontStyle: "italic", color: palette.ink }}
        >
          {featuredChapter.passage}
        </Heading>
        <Text style={{ fontSize: 20, lineHeight: 1.5, color: palette.inkSoft }}>
          — {book.author},{" "}
          <Span style={{ fontFamily: token("fonts.heading"), fontStyle: "italic" }}>{book.title}</Span>, chapter{" "}
          {featuredChapter.number},{" "}
          “{featuredChapter.title}”
        </Text>
      </Column>

      <MarginDoodles width={928} height={104} />

      <Row style={{ gap: 28, alignItems: "start", justifyContent: "space-between" }}>
        <Column style={{ width: 520, flex: "none" }}>
          <MarginNote marker={theoNote.marker} note={theoNote.note} by={theoNote.by} tone={theoNote.tone} />
        </Column>
        <Text style={{ fontSize: 16, lineHeight: 1.55, color: palette.muted, textAlign: "right" }}>
          Book of the month ·{" "}
          <Span style={{ fontWeight: 700, color: palette.ink }}>{meeting.dateShort}</Span>
        </Text>
      </Row>
    </Canvas>
  );
}
