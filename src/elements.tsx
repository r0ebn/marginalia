/**
 * Marginalia's own elements.
 *
 * The centrepiece is `MarginNote`, a custom element made with
 * `defineElement()`: one annotation — where it sits in the book, what it
 * says, who wrote it, and the colour of their pencil. It is the same
 * element in the letter (as an inset note), on the annotated page (in the
 * margin column, beside the passage it annotates), in the discussion
 * guide, and on the quote card. Its render uses only text primitives, so
 * it works in every root, email included.
 *
 * The drawn artwork lives here too: `BookCover` (the novel's cover as Svg
 * shapes) and `MarginDoodles` (pencil marks for the quote card). No image
 * is ever fetched.
 */
import {
  Circle,
  Column,
  Line,
  Path,
  Polygon,
  Rect,
  Row,
  Svg,
  Text,
  defineElement,
  prop,
  token,
} from "@hyper-elements/react";
import { book, club } from "./data";
import { palette } from "./theme";

const TONE_COLORS: Record<string, string> = {
  oxblood: palette.oxblood,
  gold: palette.gold,
  ink: palette.inkSoft,
};

/**
 * A margin note: a pencil-coloured rule on the left, the page marker in
 * small caps, the note itself in italic serif, and the annotator's name.
 *
 *   <MarginNote marker="p. 214" note="Read this page twice." by="Theo" tone="oxblood" />
 */
export const MarginNote = defineElement({
  type: "marginalia.MarginNote",
  label: "Margin note",
  description:
    "One annotation in the margin of the book: a page marker, the note in italic serif, and the member who wrote it, ruled in their pencil colour.",
  props: {
    marker: prop.text({ label: "Page marker", required: true }),
    note: prop.text({ label: "Note text", default: "" }),
    by: prop.text({ label: "Written by", default: "" }),
    tone: prop.choice(["oxblood", "gold", "ink"], { label: "Pencil colour", default: "oxblood" }),
    size: prop.choice(["regular", "compact"], { label: "Size", default: "regular" }),
  },
  render: ({ marker, note, by, tone, size }) => {
    const color = TONE_COLORS[tone as string] ?? palette.oxblood;
    const compact = size === "compact";
    return (
      <Column
        style={{
          gap: 4,
          padding: [2, 0, 2, 14],
          border: { left: { width: 3, style: "solid", color } },
        }}
      >
        <Text style={{ fontSize: compact ? 9 : 10, fontWeight: 700, letterSpacing: 1.8, lineHeight: 1.3, color }}>
          {`${marker.toUpperCase()} — IN THE MARGIN`}
        </Text>
        <Text
          style={{
            fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: compact ? 13 : 15,
            lineHeight: 1.45,
            color: palette.ink,
          }}
        >
          {note}
        </Text>
        {by ? (
          <Text style={{ fontSize: compact ? 10.5 : 11.5, fontWeight: 600, lineHeight: 1.3, color: palette.muted }}>— {by}</Text>
        ) : null}
      </Column>
    );
  },
});

/**
 * The cover of "The Salt Road Atlas", drawn entirely from Svg shapes: an
 * oxblood cloth cover with a gilt frame, a winding salt road crossing a
 * coastline, a compass rose, and a bookmark ribbon. Svg holds shapes
 * only, so the title and author are set in Text beneath it by the caller.
 */
export function BookCover({ width = 300, height = 450 }: { width?: number; height?: number }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 300 450"
      title={`Cover of ${book.title} by ${book.author}: a winding salt road along a coastline, under a compass rose.`}
      style={{ borderRadius: 6, flex: "none" }}
    >
      {/* Cloth cover and spine shade */}
      <Rect x={0} y={0} width={300} height={450} style={{ fill: palette.oxblood }} />
      <Rect x={0} y={0} width={18} height={450} style={{ fill: palette.oxbloodDeep }} />
      {/* Gilt frame */}
      <Rect x={30} y={22} width={248} height={406} style={{ fill: "transparent", stroke: palette.gold, strokeWidth: 2 }} />
      <Rect x={38} y={30} width={232} height={390} style={{ fill: "transparent", stroke: palette.gold, strokeWidth: 0.8, opacity: 0.7 }} />
      {/* The sea, right of the coastline */}
      <Path
        d="M196,44 C168,96 214,138 188,188 C164,234 206,272 182,318 C164,354 184,388 176,412 L278,412 L278,44 Z"
        style={{ fill: palette.paperDeep, opacity: 0.28 }}
      />
      {/* The salt road, winding down the land */}
      <Path
        d="M84,412 C96,352 66,318 92,268 C116,222 76,196 96,150 C110,116 92,84 108,44"
        style={{ fill: "transparent", stroke: palette.paper, strokeWidth: 5, opacity: 0.95 }}
      />
      <Path
        d="M84,412 C96,352 66,318 92,268 C116,222 76,196 96,150 C110,116 92,84 108,44"
        style={{ fill: "transparent", stroke: palette.gold, strokeWidth: 1.2, opacity: 0.9 }}
      />
      <Circle cx={92} cy={268} r={5} style={{ fill: palette.gold }} />
      <Circle cx={96} cy={150} r={5} style={{ fill: palette.gold }} />
      <Circle cx={108} cy={44} r={5} style={{ fill: palette.paper }} />
      {/* Compass rose over the sea */}
      <Circle cx={232} cy={84} r={17} style={{ fill: "transparent", stroke: palette.paper, strokeWidth: 1.4, opacity: 0.9 }} />
      <Polygon points="232,64 236,84 232,104 228,84" style={{ fill: palette.paper, opacity: 0.95 }} />
      <Polygon points="212,84 232,80 252,84 232,88" style={{ fill: palette.paper, opacity: 0.6 }} />
      {/* Bookmark ribbon at the foot */}
      <Polygon points="52,428 70,428 70,450 61,442 52,450" style={{ fill: palette.gold }} />
    </Svg>
  );
}

/** Pencil marginalia for the quote card: an asterisk, an underline flourish, a circled mark. */
export function MarginDoodles({ width = 1080, height = 120 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 1080 120" title="Pencil marginalia: an asterisk, an underline flourish and a circle.">
      <Line x1={70} y1={28} x2={70} y2={84} style={{ stroke: palette.gold, strokeWidth: 5, opacity: 0.9 }} />
      <Line x1={46} y1={42} x2={94} y2={70} style={{ stroke: palette.gold, strokeWidth: 5, opacity: 0.9 }} />
      <Line x1={94} y1={42} x2={46} y2={70} style={{ stroke: palette.gold, strokeWidth: 5, opacity: 0.9 }} />
      <Path d="M340,84 C460,66 620,66 740,84" style={{ fill: "transparent", stroke: palette.oxblood, strokeWidth: 4, opacity: 0.75 }} />
      <Path d="M380,100 C480,88 600,88 700,100" style={{ fill: "transparent", stroke: palette.gold, strokeWidth: 3, opacity: 0.8 }} />
      <Circle cx={990} cy={56} r={30} style={{ fill: "transparent", stroke: palette.oxblood, strokeWidth: 4, opacity: 0.75 }} />
      <Circle cx={990} cy={56} r={7} style={{ fill: palette.gold }} />
    </Svg>
  );
}

/** The club's name set as a book's running head: small, letterspaced, centred. */
export function RunningHead({ note }: { note: string }) {
  return (
    <Column style={{ gap: 6, alignItems: "center", textAlign: "center" }}>
      <Text
        style={{
          fontFamily: token("fonts.heading"),
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 3.4,
          lineHeight: 1.2,
          color: palette.oxblood,
        }}
      >
        THE MARGINALIA CLUB
      </Text>
      <Text style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2, lineHeight: 1.3, color: palette.muted }}>
        {note.toUpperCase()}
      </Text>
    </Column>
  );
}

/** The club's address and contact lines, for the foot of a letter or page. */
export function ClubColophon({ light = false }: { light?: boolean }) {
  return (
    <Column style={{ gap: 2 }}>
      <Text style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: light ? palette.paper : palette.oxblood }}>
        {club.name} · {club.tagline}
      </Text>
      <Text style={{ fontSize: 13, lineHeight: 1.5, color: light ? palette.paperDeep : token("colors.muted") }}>
        {club.addressLines.join(", ")} · {club.phone} · {club.email}
      </Text>
    </Column>
  );
}
