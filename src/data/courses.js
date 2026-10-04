export const COURSES = [
  {
    slug: "noorani-qaida",
    title: "Noorani Qaida Basics",
    audience: "Kids (4+) & Adults",
    level: "Beginner",
    levelColor: "bg-brand-100 text-brand-800",
    description:
      "The foundational course for beginners to learn Arabic letters, correct pronunciation (Makharij), and basic reading rules.",
    icon: "BookOpen",
    whoFor: [
      "Children aged 4+ starting their Quranic journey",
      "New adult learners with no Arabic background",
      "Students who need a strong base before reading the Quran",
    ],
    syllabus: [
      { unit: "Arabic Alphabet", detail: "Recognition, naming and writing of all 28 letters in isolated and joined forms." },
      { unit: "Makharij (Articulation Points)", detail: "Correct tongue, throat and lip positions for every letter from day one." },
      { unit: "Harakat & Vowels", detail: "Fatha, Kasra and Dammah with joined-letter reading practice." },
      { unit: "Tanween", detail: "Double vowels (An, In, Un) and their effect on pronunciation." },
      { unit: "Sukoon & Shaddah", detail: "Silent letters and doubled letters for smooth, connected reading." },
      { unit: "Basic Madd (Elongation)", detail: "Natural stretching rules and an introduction to joined reading fluency." },
    ],
  },
  {
    slug: "quran-recitation",
    title: "Quran Recitation & Reading",
    audience: "All age groups",
    level: "Intermediate",
    levelColor: "bg-amber-100 text-amber-800",
    description:
      "Learn to read the Holy Quran fluently and smoothly. Ideal for students who finished Qaida and want to read the entire Quran.",
    icon: "BookMarked",
    whoFor: [
      "Students who completed Noorani Qaida",
      "Learners aiming to read the whole Quran fluently",
      "Adults returning to Quran reading after a long break",
    ],
    syllabus: [
      { unit: "Fluent Reading Practice", detail: "Guided, page-by-page reading of the Mushaf with live tutor correction." },
      { unit: "Connected Speech", detail: "Joining words and verses naturally without hesitation or stammering." },
      { unit: "Applied Makharij Review", detail: "Reinforcing correct articulation inside real verses, not just drills." },
      { unit: "Basic Waqf (Stopping)", detail: "Where to pause and resume while reciting so the meaning stays intact." },
      { unit: "Reading Pace Control", detail: "Balanced recitation speed — clear, steady and confident." },
      { unit: "Full Quran Completion", detail: "A structured plan to complete a full reading (Khatm) of the Holy Quran." },
    ],
  },
  {
    slug: "tajweed",
    title: "Tajweed al Quran",
    audience: "Ages 8+ to Adults",
    level: "Advanced",
    levelColor: "bg-emerald-100 text-emerald-800",
    description:
      "Master the rules of Tajweed to recite the Holy Quran exactly the way it was revealed to Prophet Muhammad (PBUH).",
    icon: "Sparkles",
    whoFor: [
      "Students aged 8+ who read the Quran but want perfection",
      "Adults preparing for Ijazah-level recitation",
      "Anyone who wants to recite beautifully and correctly",
    ],
    syllabus: [
      { unit: "Rules of Noon Sakinah & Tanween", detail: "Izhar, Idgham, Iqlab and Ikhfa with their letters and examples." },
      { unit: "Rules of Meem Sakinah", detail: "Ikhfa Shafawi, Idgham Shafawi and Izhar Shafawi." },
      { unit: "Madd (Elongation) Rules", detail: "Natural, connected, separated and necessary Madd with correct counts." },
      { unit: "Sifaat of Letters", detail: "Characteristics such as Qalqalah, Hams, Jahr and Tafkheem/Tarqeeq." },
      { unit: "Waqf & Ibtida", detail: "Advanced stopping and starting rules for meaningful recitation." },
      { unit: "Practical Recitation Drills", detail: "Applying every rule inside selected Surahs with instant tutor feedback." },
    ],
  },
  {
    slug: "hifz",
    title: "Quran Memorization (Hifz)",
    audience: "Ages 6+ & Adults",
    level: "All Levels",
    levelColor: "bg-teal-100 text-teal-800",
    description:
      "A structured, personalized plan to memorize the Quran with expert guidance, periodic revision, and spiritual support.",
    icon: "Heart",
    whoFor: [
      "Children aged 6+ with a memorization goal",
      "Adults pursuing Hifz alongside work or study",
      "Students seeking a guided revision system",
    ],
    syllabus: [
      { unit: "Sabaq (New Lesson)", detail: "Daily new memorization assigned to your pace and retention capacity." },
      { unit: "Sabqi (Recent Revision)", detail: "Revision of the last 7 days of lessons to lock them into memory." },
      { unit: "Manzil (Full Revision)", detail: "Cycling through previously memorized Juz for long-term retention." },
      { unit: "Tajweed-Guided Memorization", detail: "Memorizing with correct pronunciation so Tajweed becomes habit." },
      { unit: "Memorization Techniques", detail: "Chunking, rhythmic repetition and visual association methods." },
      { unit: "Milestone Reviews", detail: "Juz completion checks and motivation tracking with your tutor." },
    ],
  },
];
