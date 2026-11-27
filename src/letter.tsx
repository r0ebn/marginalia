/**
 * The invitation, written as a letter.
 *
 * Priya, this month's host, writes to Theo the way the club actually
 * talks: a date line, a salutation, flowing paragraphs, the particulars
 * set down plainly mid-letter, one of Theo's own margin notes quoted back
 * at him, a sign-off and a postscript. No cards, no banner — a sheet of
 * paper in an envelope. The plain-text twin comes from the same render.
 */
import {
  Column,
  Divider,
  Email,
  Heading,
  Link,
  Row,
  Section,
  Span,
  Text,
  token,
} from "@hyper-elements/react";
import { book, chapters, club, featuredChapter, host, meeting, member, nextBook } from "./data";
import { palette, marginaliaTheme, webFonts } from "./theme";
import { ClubColophon, MarginNote } from "./elements";

const theoNote = featuredChapter.annotations[0];

export default function InvitationLetter() {
  return (
    <Email
      width={600}
      theme={marginaliaTheme}
      title={`A letter from ${club.name} — ${book.title}, ${meeting.dateShort}`}
      previewText={`${host.firstName} writes: ${member.firstName}, we meet on ${book.title} on ${meeting.dateLabel}. Bring your annotated copy.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      <Section style={{ padding: [28, 24], mobile: { padding: [16, 12] } }}>
        <Column style={{ apply: ["sheet"], padding: [40, 44], gap: 18, mobile: { padding: [28, 24] } }}>
          {/* The letterhead: the club, and the date of writing. */}
          <Row style={{ alignItems: "start", gap: 16 }}>
            <Column style={{ gap: 2 }}>
              <Text
                style={{
                  fontFamily: token("fonts.heading"),
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: 2.6,
                  lineHeight: 1.2,
                  color: palette.oxblood,
                }}
              >
                THE MARGINALIA CLUB
              </Text>
              <Text style={{ fontSize: 11, lineHeight: 1.4, color: token("colors.muted") }}>
                {club.venue} · {club.addressLines[0]}
              </Text>
            </Column>
            <Text style={{ fontSize: 12.5, lineHeight: 1.5, color: token("colors.muted"), textAlign: "right" }}>
              {meeting.letterDate}
            </Text>
          </Row>

          <Divider />

          <Heading level={1} style={{ fontFamily: token("fonts.heading"), fontSize: 30 }}>
            Dear {member.firstName},
          </Heading>

          <Text style={{ fontSize: 16.5, lineHeight: 1.7 }}>
            This month we read <Span style={{ fontWeight: 700 }}>{book.title}</Span>, by {book.author} — all{" "}
            {book.pages} pages of salt roads, drowned ports and maps that will not sit still. I finished it on
            Tuesday and have been arguing with it ever since, which is exactly the condition we ask a book of the
            month to produce.
          </Text>

          <Text style={{ fontSize: 16.5, lineHeight: 1.7 }}>
            We meet on <Span style={{ fontWeight: 700 }}>{meeting.dateLabel}</Span>, at Larkspur Books — the back
            room, as ever. Doors at {meeting.doors} for wine and settling in; I will call us to order at{" "}
            {meeting.discussion}, and we are usually done — though never finished — by {meeting.close}. The
            particulars, so you can pin them to the fridge:
          </Text>

          <Column style={{ gap: 5, padding: [4, 0, 4, 18] }}>
            <Text style={{ fontSize: 15.5, lineHeight: 1.6 }}>
              <Span style={{ fontWeight: 700, color: palette.oxblood }}>Where — </Span>
              {club.venue}, {club.addressLines.join(", ")}
            </Text>
            <Text style={{ fontSize: 15.5, lineHeight: 1.6 }}>
              <Span style={{ fontWeight: 700, color: palette.oxblood }}>When — </Span>
              {meeting.dateShort}, doors {meeting.doors}, discussion {meeting.discussion}
            </Text>
            <Text style={{ fontSize: 15.5, lineHeight: 1.6 }}>
              <Span style={{ fontWeight: 700, color: palette.oxblood }}>Bring — </Span>
              your copy, annotated; one passage to read aloud; one good argument
            </Text>
          </Column>

          <Text style={{ fontSize: 16.5, lineHeight: 1.7 }}>
            You left a note in my copy last month that I have not been able to shake, so I am returning it to you —
            with interest — as this month's opening page:
          </Text>

          <MarginNote marker={theoNote.marker} note={theoNote.note} by={theoNote.by} tone={theoNote.tone} />

          <Text style={{ fontSize: 16.5, lineHeight: 1.7 }}>
            The reading is split across three weeks in the discussion guide, and the questions are already
            gathering in the margins — Marta wants to fight about the ledger keeper's thumb, and Sam has Views
            about chapter {chapters[2].number}. Come ready.
          </Text>

          <Column style={{ gap: 2, padding: [6, 0, 0] }}>
            <Text style={{ fontSize: 16.5, lineHeight: 1.6 }}>Yours in the margins,</Text>
            <Text
              style={{
                fontFamily: token("fonts.heading"),
                fontStyle: "italic",
                fontSize: 24,
                lineHeight: 1.3,
                color: palette.oxblood,
              }}
            >
              {host.firstName}
            </Text>
            <Text style={{ fontSize: 13.5, lineHeight: 1.5, color: token("colors.muted") }}>
              {host.fullName}, host for March · member since 2020
            </Text>
          </Column>

          <Divider />

          <Text style={{ fontSize: 14.5, lineHeight: 1.65 }}>
            <Span style={{ fontWeight: 700 }}>P.S. </Span>
            Please <Link href={meeting.rsvpHref}>tell us you are coming</Link>, so Larkspur keeps the back room —
            and if you finish early, April's book is {nextBook.title} by {nextBook.author}. No head starts on the
            arguing.
          </Text>
        </Column>

        <Column style={{ gap: 8, padding: [18, 8, 0] }}>
          <ClubColophon />
          <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
            You are receiving this letter because you are a member of {club.name} — {member.booksRead} books in,{" "}
            {member.firstName}. Write back to {club.email} to change how the club writes to you.
          </Text>
        </Column>
      </Section>
    </Email>
  );
}
