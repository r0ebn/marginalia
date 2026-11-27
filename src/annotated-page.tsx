/**
 * The book of the month, presented as an annotated book page.
 *
 * A running head, the drawn cover beside the book's particulars, and then
 * the reading itself: for three chapters, the passage runs in a wide
 * serif column while the members' MarginNotes sit beside it in a true
 * margin — the same custom element, in the place margins actually go.
 * Under each passage, the questions that chapter will have to answer for.
 */
import {
  Button,
  Column,
  Divider,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Span,
  Text,
  token,
} from "@hyper-elements/react";
import { book, chapters, club, meeting, nextBook } from "./data";
import { palette, marginaliaTheme, webFonts } from "./theme";
import { BookCover, ClubColophon, MarginNote, RunningHead } from "./elements";

const annotatedChapters = [chapters[0], chapters[3], chapters[5]];

export default function AnnotatedPage() {
  return (
    <Page
      width={960}
      theme={marginaliaTheme}
      title={`${book.title} by ${book.author} — ${club.name}`}
      description={`${club.name} reads ${book.title} by ${book.author}: the passages, the margin notes, and the questions for ${meeting.dateLabel}.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* Running head over a hairline, like the top of a printed page. */}
      <Section style={{ padding: [30, 40, 0], mobile: { padding: [24, 24, 0] } }}>
        <RunningHead note={`${meeting.dateLabel} · ${club.venue}`} />
      </Section>

      {/* The book itself: cover, blurb, particulars. */}
      <Section style={{ padding: [30, 40, 8], mobile: { padding: [24, 24, 0] } }}>
        <Row style={{ gap: 36, alignItems: "start" }}>
          <BookCover width={240} height={360} />
          <Column style={{ gap: 14 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.gold }}>Book of the month · March 2027</Text>
            <Heading level={1}>{book.title}</Heading>
            <Text style={{ fontSize: 19, lineHeight: 1.4, color: palette.inkSoft }}>
              by <Span style={{ fontWeight: 700, color: palette.oxblood }}>{book.author}</Span>
            </Text>
            <Text style={{ fontSize: 16.5, lineHeight: 1.7 }}>{book.blurb}</Text>
            <Text style={{ fontSize: 14, lineHeight: 1.65, color: token("colors.muted") }}>{book.authorBio}</Text>
            <Text style={{ fontSize: 13.5, lineHeight: 1.6, color: token("colors.muted") }}>
              {book.genre} · {book.pages} pages · {book.publisher}, {book.published} · ISBN {book.isbn}
            </Text>
            <Row style={{ gap: 14 }}>
              <Button href={meeting.rsvpHref} style={{ flex: "none" }}>
                I&rsquo;m coming — {meeting.dateShort}
              </Button>
              <Button href={meeting.bookHref} variant="outline" style={{ flex: "none" }}>
                The discussion guide
              </Button>
            </Row>
          </Column>
        </Row>
      </Section>

      {/* The annotated reading: passage in the text column, notes in the margin. */}
      <Section style={{ padding: [24, 40, 0], mobile: { padding: [16, 24, 0] } }}>
        <Column style={{ gap: 10 }}>
          <Divider />
          <Text style={{ apply: ["eyebrow"], color: palette.gold }}>From the reading</Text>
          <Heading level={2}>The passages, as the club has marked them up</Heading>
          <Text style={{ fontSize: 15.5, lineHeight: 1.65, color: token("colors.muted") }}>
            Three passages the members could not leave alone. The notes in the margin are real club marginalia —
            written in four different pencils, argued over in advance.
          </Text>
        </Column>
      </Section>

      {annotatedChapters.map((chapter) => (
        <Section key={chapter.number} style={{ padding: [26, 40, 0], mobile: { padding: [20, 24, 0] } }}>
          <Row style={{ gap: 36, alignItems: "start" }}>
            {/* The text column */}
            <Column style={{ gap: 12 }}>
              <Text style={{ apply: ["metaLabel"] }}>
                Chapter {chapter.number} · {chapter.pages}
              </Text>
              <Heading level={3} style={{ fontSize: 22 }}>{chapter.title}</Heading>
              <Text
                style={{
                  fontFamily: token("fonts.heading"),
                  fontSize: 20,
                  lineHeight: 1.65,
                  color: palette.ink,
                }}
              >
                {chapter.passage}
              </Text>
              <Column style={{ gap: 6, padding: [6, 0, 0] }}>
                <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, color: palette.oxblood }}>
                  FOR DISCUSSION
                </Text>
                {chapter.questions.map((q) => (
                  <Text key={q} style={{ fontSize: 14.5, lineHeight: 1.6, color: palette.inkSoft }}>
                    — {q}
                  </Text>
                ))}
              </Column>
            </Column>
            {/* The margin */}
            <Column style={{ width: 264, flex: "none", gap: 18, padding: [44, 0, 0], mobile: { padding: [0, 0, 0] } }}>
              {chapter.annotations.map((a) => (
                <MarginNote key={a.marker} marker={a.marker} note={a.note} by={a.by} tone={a.tone} />
              ))}
            </Column>
          </Row>
        </Section>
      ))}

      {/* Next month, and the colophon. */}
      <Section style={{ padding: [36, 40, 44], mobile: { padding: [28, 24, 32] } }}>
        <Column style={{ gap: 18 }}>
          <Divider />
          <Grid columns={2} style={{ gap: 24 }}>
            <Column style={{ gap: 4 }}>
              <Text style={{ apply: ["metaLabel"] }}>Next month</Text>
              <Text style={{ fontFamily: token("fonts.heading"), fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>
                {nextBook.title}
              </Text>
              <Text style={{ fontSize: 14, lineHeight: 1.55, color: token("colors.muted") }}>
                by {nextBook.author} · {nextBook.meetingLabel}
              </Text>
            </Column>
            <Column style={{ gap: 4 }}>
              <Text style={{ apply: ["metaLabel"] }}>The meeting</Text>
              <Text style={{ fontFamily: token("fonts.heading"), fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>
                {meeting.dateLabel}
              </Text>
              <Text style={{ fontSize: 14, lineHeight: 1.55, color: token("colors.muted") }}>
                Doors {meeting.doors} · discussion {meeting.discussion} · {club.venue}
              </Text>
            </Column>
          </Grid>
          <Divider />
          <ClubColophon />
        </Column>
      </Section>
    </Page>
  );
}
