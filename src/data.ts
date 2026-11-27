/**
 * Marginalia — everything the club has written in the margins.
 *
 * The organising unit of this kit is not an event or an order; it is an
 * annotation. The novel is broken into chapters, each chapter carries a
 * passage, the margin notes members left beside that passage, and the
 * questions they want to argue about at the meeting. The letter, the
 * annotated page, the discussion guide and the quote card all read from
 * these chapters.
 *
 * The club, the novel, the author and every member are fictional. Dates
 * are fixed strings, so every build renders identical output.
 */

export const club = {
  name: "The Marginalia Club",
  tagline: "Notes in the margins, wine on the table.",
  founded: 2019,
  venue: "The back room at Larkspur Books",
  addressLines: ["14 Bellflower Lane", "Millbrook, Vermont 05401"],
  phone: "+1 (802) 555-0119",
  phoneHref: "tel:+18025550119",
  email: "hello@marginalia.example",
  site: "marginalia.example",
} as const;

export const member = {
  firstName: "Theo",
  lastName: "Barrett",
  fullName: "Theo Barrett",
  memberSince: 2021,
  booksRead: 34,
} as const;

/** The host of this month's meeting, and the letter's author. */
export const host = {
  firstName: "Priya",
  fullName: "Priya Nair",
} as const;

export const book = {
  title: "The Salt Road Atlas",
  author: "Ines Duarte",
  authorBio:
    "Ines Duarte is a novelist invented for this kit. In her invented biography she writes about coastlines, cartographers, and the people who redraw both.",
  pages: 342,
  published: "March 2026",
  publisher: "Bellflower Press",
  isbn: "978-0-00-000000-0",
  genre: "Literary fiction",
  blurb:
    "When cartographer Mara Venn inherits a salt merchant's atlas whose roads move between editions, she follows its shifting routes from a drowned port to a desert caravanserai — and finds, near the end, a page drawn in her own hand and dated next year.",
} as const;

export const meeting = {
  dateShort: "Thu 26 Mar 2027",
  dateLabel: "Thursday, 26 March 2027",
  letterDate: "Millbrook, 12 March 2027",
  doors: "6:30 PM",
  discussion: "7:00 PM",
  close: "9:00 PM",
  rsvpHref: "https://marginalia.example/rsvp/salt-road-atlas",
  bookHref: "https://marginalia.example/books/the-salt-road-atlas",
} as const;

export interface MarginAnnotation {
  /** Where the note sits, e.g. "p. 34". */
  marker: string;
  note: string;
  by: string;
  tone: "oxblood" | "gold" | "ink";
}

export interface Chapter {
  number: number;
  title: string;
  pages: string;
  /** A short invented passage from the chapter. */
  passage: string;
  annotations: MarginAnnotation[];
  questions: string[];
}

export const chapters: Chapter[] = [
  {
    number: 1,
    title: "The Drowned Port",
    pages: "pp. 1–46",
    passage:
      "The atlas arrived smelling of brine and camphor, its first map showing a harbour that had gone under the water forty years before Mara was born — drawn, all the same, with the ferry times inked in a careful hand.",
    annotations: [
      {
        marker: "p. 9",
        note: "Ferry times for a drowned port. She is not mapping places, she is mapping habits. Nobody in this book can let anything go.",
        by: "Theo",
        tone: "oxblood",
      },
      {
        marker: "p. 31",
        note: "First moving road — did anyone else catch the street that changes its name between page 31 and page 33?",
        by: "Priya",
        tone: "gold",
      },
    ],
    questions: [
      "Why open with a place that no longer exists? What does the drowned port let Duarte do that a living town would not?",
      "Mara trusts the atlas immediately. Should she? What would you have done with it on the first night?",
    ],
  },
  {
    number: 6,
    title: "The Caravanserai Ledger",
    pages: "pp. 118–159",
    passage:
      "The ledger keeper weighed salt the way other men weighed souls: slowly, publicly, and with a thumb he pretended was not on the scale. 'A road,' he told Mara, 'is only a debt that learned to walk.'",
    annotations: [
      {
        marker: "p. 124",
        note: "Salt preserves, flavours and corrodes. Three jobs — track which one it is doing in every scene from here on.",
        by: "Marta",
        tone: "ink",
      },
      {
        marker: "p. 141",
        note: "‘A debt that learned to walk.’ The whole novel in one sentence? Argue with me at the meeting.",
        by: "Theo",
        tone: "oxblood",
      },
    ],
    questions: [
      "The ledger keeper's thumb is on the scale. Who else in the book is quietly cheating a measurement, and who pays for it?",
    ],
  },
  {
    number: 9,
    title: "Roads That Move",
    pages: "pp. 187–213",
    passage:
      "By the ninth road, Mara had stopped asking where the atlas was taking her and started asking the harder question: what it was walking her away from, one redrawn mile at a time.",
    annotations: [
      {
        marker: "p. 198",
        note: "The hinge of the book. Everything before is a journey; everything after is an avoidance.",
        by: "Sam",
        tone: "gold",
      },
    ],
    questions: [
      "Is the atlas protecting Mara or imprisoning her? Find the passage that best supports the opposite of your first instinct.",
      "Duarte never explains the moving roads. Does the book earn that silence?",
    ],
  },
  {
    number: 12,
    title: "The Cartographer's Apology",
    pages: "pp. 214–248",
    passage:
      "Every map is a promise the land never made. We draw the road, and then we spend our lives apologising to the journey.",
    annotations: [
      {
        marker: "p. 214",
        note: "Read this page twice. Then read it once more, out loud, at the meeting — this is the page we open with.",
        by: "Theo",
        tone: "oxblood",
      },
      {
        marker: "p. 233",
        note: "An apology to the journey, not to the traveller. The distinction is the whole argument of chapter 12.",
        by: "Priya",
        tone: "ink",
      },
    ],
    questions: [
      "Who is apologising in this chapter, and to whom? Is the apology accepted?",
    ],
  },
  {
    number: 16,
    title: "A Page Dated Next Year",
    pages: "pp. 279–310",
    passage:
      "The hand was hers — the same cramped slope, the same bitten-off capitals — but the date at the foot of the page had not happened yet, and the road it drew led somewhere she had sworn never to go again.",
    annotations: [
      {
        marker: "p. 296",
        note: "Supernatural, metaphor, or Mara lying to herself? I have changed my mind three times. Currently: metaphor, held weakly.",
        by: "Marta",
        tone: "gold",
      },
    ],
    questions: [
      "Supernatural, metaphor, or self-deception: settle the page in chapter 16, and name the passage that settles it.",
      "What has Mara sworn never to do again, and does the book think she is right to swear it?",
    ],
  },
  {
    number: 19,
    title: "The Unfinished Coastline",
    pages: "pp. 311–342",
    passage:
      "The last map in the atlas is unfinished — the coastline simply stops, mid-bay, where the ink ran out or the courage did. Mara picks up the pen the book has been holding out to her since page one.",
    annotations: [
      {
        marker: "p. 342",
        note: "An unfinished map as an ending: hope, exhaustion, or a hand-over to the reader? My money is on the hand-over. We are the next cartographers.",
        by: "Theo",
        tone: "oxblood",
      },
    ],
    questions: [
      "Would a finished map have made a better ending? What exactly does the book gain by stopping mid-bay?",
    ],
  },
];

/** The passage the quote card sets, from chapter 12. */
export const featuredChapter = chapters[3];

export interface ScheduleWeek {
  week: string;
  dates: string;
  reading: string;
  pages: string;
}

export const readingSchedule: ScheduleWeek[] = [
  { week: "Week 1", dates: "5–11 Mar", reading: "Chapters 1–6", pages: "pp. 1–159" },
  { week: "Week 2", dates: "12–18 Mar", reading: "Chapters 7–13", pages: "pp. 160–261" },
  { week: "Week 3", dates: "19–25 Mar", reading: "Chapters 14–19", pages: "pp. 262–342" },
];

export const nextBook = {
  title: "A Field Guide to Vanishing Rivers",
  author: "Ellis Grant",
  meetingLabel: "April meeting · Thursday, 30 April 2027",
} as const;

export const finePrint = [
  "New members are welcome — finish the book if you can, come anyway if you cannot; spoilers are assumed after 7:00 PM.",
  "The Marginalia Club, The Salt Road Atlas and Ines Duarte are fictional; no real club, book or author sits behind this kit.",
];
