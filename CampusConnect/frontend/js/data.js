/**
 * TEMPORARY SAMPLE DATA — display only for Stage 2.
 * This is not connected to Django or PostgreSQL.
 * Stage 5 will replace these arrays with API responses.
 */
window.CampusConnect = window.CampusConnect || {};

CampusConnect.SAMPLE_DATA = {
  college: {
    name: "Riverside College",
    tagline: "Learning that connects campus life.",
    intro:
      "Riverside College is a fictional undergraduate campus used for the CampusConnect portal. Students discover announcements, join clubs, and register for events in one place.",
    address: "14 Riverbank Avenue, Campus District, Pune 411001",
    phone: "+91 20 5550 2140",
    email: "hello@riversidecollege.example",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM"
  },
  announcements: [
    {
      id: 1,
      title: "Library extended hours during midterms",
      date: "2026-10-16",
      body: "The central library will stay open until 11:00 PM from 20–31 October."
    },
    {
      id: 2,
      title: "Campus Wi-Fi maintenance window",
      date: "2026-10-14",
      body: "Wireless access in the science block will pause on Sunday, 19 October, 2:00–4:00 AM."
    },
    {
      id: 3,
      title: "Scholarship workshop this Thursday",
      date: "2026-10-12",
      body: "Career Services is hosting a walk-in session on merit scholarships in Hall B."
    }
  ],
  clubs: [
    {
      id: 1,
      name: "Robotics Society",
      category: "Technical",
      short: "Build, code, and compete with campus robots.",
      description:
        "Weekly build nights, Arduino labs, and an annual inter-college robotics meet. Beginners are welcome; no prior hardware experience required.",
      meeting: "Wednesdays, 5:30 PM — Innovation Lab",
      email: "robotics@riversidecollege.example"
    },
    {
      id: 2,
      name: "Drama Circle",
      category: "Cultural",
      short: "Stage plays, street theatre, and festival productions.",
      description:
        "Auditions are held each term. Members can act, write, design sets, or run lighting for the winter production.",
      meeting: "Tuesdays, 4:30 PM — Auditorium",
      email: "drama@riversidecollege.example"
    },
    {
      id: 3,
      name: "Football Club",
      category: "Sports",
      short: "Training twice a week plus friendly matches.",
      description:
        "Open to all skill levels. Bring indoor shoes for the sports hall and a water bottle. Match fixtures are posted monthly.",
      meeting: "Mondays & Thursdays, 6:00 PM — Sports Ground",
      email: "football@riversidecollege.example"
    },
    {
      id: 4,
      name: "Literary Society",
      category: "Academic",
      short: "Readings, debates, and the student magazine.",
      description:
        "Fortnightly book discussions and a student-edited magazine published each semester. Submissions are open to every department.",
      meeting: "Fridays, 3:30 PM — Library Seminar Room",
      email: "literary@riversidecollege.example"
    },
    {
      id: 5,
      name: "Green Campus",
      category: "Community",
      short: "Tree drives, waste audits, and river clean-ups.",
      description:
        "Volunteer with sustainability projects around campus. Tools and gloves are provided for weekend clean-up events.",
      meeting: "Saturdays, 9:00 AM — Admin Lawn",
      email: "green@riversidecollege.example"
    },
    {
      id: 6,
      name: "Music Collective",
      category: "Cultural",
      short: "Open mics, ensembles, and recording sessions.",
      description:
        "Acoustic and electric practice rooms bookable through the club. The autumn open mic is the best place to start.",
      meeting: "Thursdays, 5:00 PM — Arts Block Studio",
      email: "music@riversidecollege.example"
    }
  ],
  events: [
    {
      id: 1,
      title: "Freshers Orientation Fair",
      date: "2026-10-25",
      time: "10:00 AM",
      venue: "Main Quad",
      description: "Meet clubs, collect your ID card, and tour academic buildings."
    },
    {
      id: 2,
      title: "Inter-College Debate",
      date: "2026-11-02",
      time: "2:00 PM",
      venue: "Hall A",
      description: "Watch six teams argue this year's motion. Audience seats are free with registration."
    },
    {
      id: 3,
      title: "Hack Night",
      date: "2026-11-08",
      time: "5:00 PM",
      venue: "Innovation Lab",
      description: "A 6-hour build session hosted by the Robotics Society. Snacks provided."
    },
    {
      id: 4,
      title: "River Clean-up Day",
      date: "2026-11-15",
      time: "8:30 AM",
      venue: "East Gate",
      description: "Join Green Campus for a morning clean-up. Gloves and bags supplied."
    },
    {
      id: 5,
      title: "Winter Concert",
      date: "2026-12-05",
      time: "6:30 PM",
      venue: "Auditorium",
      description: "Ensembles from the Music Collective perform seasonal pieces. Limited seating."
    }
  ]
};

CampusConnect.CLUB_CATEGORIES = [
  "All",
  "Academic",
  "Cultural",
  "Sports",
  "Technical",
  "Community"
];
