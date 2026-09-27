export interface TajweedRule {
  tag: string;
  name: string;
  arabicName: string;
  category: "mad" | "ghunnah" | "qalqalah" | "idgham" | "silent";
  color: string;
  bgBadge: string;
  textBadge: string;
  harakat: string;
  description: string;
  exampleLetters: string;
}

export const TAJWEED_RULES: Record<string, TajweedRule> = {
  p: {
    tag: "p",
    name: "Mad Wajib Muttashil",
    arabicName: "مَدّ وَاجِب مُتَّصِل",
    category: "mad",
    color: "#e11d48", // rose-600
    bgBadge: "bg-rose-50 border-rose-200",
    textBadge: "text-rose-700",
    harakat: "4-5 Harakat",
    description: "Huruf mad bertemu hamzah dalam satu kata yang bersambung.",
    exampleLetters: "سَوَآءٌ / جَآءَ",
  },
  m: {
    tag: "m",
    name: "Mad Lazim",
    arabicName: "مَدّ لَازِم",
    category: "mad",
    color: "#9f1239", // rose-800
    bgBadge: "bg-rose-100 border-rose-300",
    textBadge: "text-rose-900",
    harakat: "6 Harakat",
    description: "Huruf mad bertemu sukun asli atau tasydid dalam kata/huruf fawatihussuwar.",
    exampleLetters: "الضَّآلِّينَ / الٓمٓ",
  },
  o: {
    tag: "o",
    name: "Mad Jaiz Munfashil",
    arabicName: "مَدّ جَائِز مُنْفَصِل",
    category: "mad",
    color: "#ea580c", // orange-600
    bgBadge: "bg-orange-50 border-orange-200",
    textBadge: "text-orange-700",
    harakat: "4-5 Harakat",
    description: "Huruf mad berada di akhir kata dan hamzah berada di awal kata berikutnya.",
    exampleLetters: "إِنَّآ أَعْطَيْنَاكَ",
  },
  n: {
    tag: "n",
    name: "Mad Thabi'i (Asli)",
    arabicName: "مَدّ طَبِيعِيّ",
    category: "mad",
    color: "#d97706", // amber-600
    bgBadge: "bg-amber-50 border-amber-200",
    textBadge: "text-amber-700",
    harakat: "2 Harakat",
    description: "Panjang dasar 2 harakat (Alif setelah fathah, Wawu setelah dhammah, Ya setelah kasrah).",
    exampleLetters: "نُوحِيهَا / قَالَ",
  },
  a: {
    tag: "a",
    name: "Mad 'Aridh Lissukun",
    arabicName: "مَدّ عَارِض لِلسُّكُون",
    category: "mad",
    color: "#c2410c", // orange-700
    bgBadge: "bg-orange-50 border-orange-300",
    textBadge: "text-orange-800",
    harakat: "2, 4, atau 6 Harakat",
    description: "Mad thabi'i yang dihentikan (waqaf) di akhir ayat/bacaan karena sukun mendadak.",
    exampleLetters: "الْعَالَمِينَ / الرَّحِيمِ",
  },
  q: {
    tag: "q",
    name: "Qalqalah (Memantul)",
    arabicName: "قَلْقَلَة (صُغْرَى / كُبْرَى)",
    category: "qalqalah",
    color: "#0284c7", // sky-600
    bgBadge: "bg-sky-50 border-sky-200",
    textBadge: "text-sky-700",
    harakat: "Pantulan bunyi",
    description: "Bunyi huruf yang memantul ketika sukun atau waqaf. Terdiri dari 5 huruf: ق, ط, ب, ج, د (Baju Ditoko / Quthbu Jadin).",
    exampleLetters: "قْ, طْ, بْ, جْ, دْ (misal: الْفَلَقِ, أَحَدٌ)",
  },
  g: {
    tag: "g",
    name: "Ghunnah Musyaddadah",
    arabicName: "غُنَّة مُشَدَّدَة",
    category: "ghunnah",
    color: "#059669", // emerald-600
    bgBadge: "bg-emerald-50 border-emerald-200",
    textBadge: "text-emerald-700",
    harakat: "Dengung 2 Harakat",
    description: "Dengung yang wajib ditahan 2 harakat pada huruf Nun bertasydid (نّ) dan Mim bertasydid (مّ).",
    exampleLetters: "إِنَّ / عَمَّ / النَّاسِ",
  },
  f: {
    tag: "f",
    name: "Ikhfa Haqiqi",
    arabicName: "إِخْفَاء حَقِيقِيّ",
    category: "ghunnah",
    color: "#0d9488", // teal-600
    bgBadge: "bg-teal-50 border-teal-200",
    textBadge: "text-teal-700",
    harakat: "Samar Dengung 2 Harakat",
    description: "Nun mati (نْ) atau Tanwin bertemu salah satu dari 15 huruf ikhfa (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك).",
    exampleLetters: "مِن شَرِّ / كِتَابًا كَرِيمًا",
  },
  c: {
    tag: "c",
    name: "Ikhfa Syafawi",
    arabicName: "إِخْفَاء شَفَوِيّ",
    category: "ghunnah",
    color: "#0f766e", // teal-700
    bgBadge: "bg-teal-50 border-teal-300",
    textBadge: "text-teal-800",
    harakat: "Samar Dengung 2 Harakat",
    description: "Mim sukun (مْ) bertemu huruf Ba (ب). Dibaca samar pada bibir disertai dengung.",
    exampleLetters: "تَرْمِيهِم بِحِجَارَةٍ",
  },
  w: {
    tag: "w",
    name: "Idgham Bighunnah",
    arabicName: "إِدْغَام بِغُنَّة",
    category: "idgham",
    color: "#7c3aed", // violet-600
    bgBadge: "bg-violet-50 border-violet-200",
    textBadge: "text-violet-700",
    harakat: "Melebur + Dengung 2 Harakat",
    description: "Nun mati atau tanwin melebur ke 4 huruf (ي, ن, م, و / Yanmu) disertai dengung yang ditahan.",
    exampleLetters: "مَن يَقُولُ / هُدًى مِّن",
  },
  u: {
    tag: "u",
    name: "Iqlab",
    arabicName: "إِقْلَاب",
    category: "idgham",
    color: "#4f46e5", // indigo-600
    bgBadge: "bg-indigo-50 border-indigo-200",
    textBadge: "text-indigo-700",
    harakat: "Berubah Bunyi 'M' + Dengung",
    description: "Nun mati atau tanwin bertemu huruf Ba (ب). Bunyi 'N' digantikan suara 'M' samar berdengung.",
    exampleLetters: "مِنۢ بَعْدِ / أَنۢبِئْهُم",
  },
  d: {
    tag: "d",
    name: "Idgham Mutajanisayn / Mutaqaribayn",
    arabicName: "إِدْغَام مُتَجَانِسَيْن / مُتَقَارِبَيْن",
    category: "idgham",
    color: "#9333ea", // purple-600
    bgBadge: "bg-purple-50 border-purple-200",
    textBadge: "text-purple-700",
    harakat: "Melebur Sempurna",
    description: "Peleburan dua huruf yang sama makhraj atau berdekatan sifatnya (misal: د bertemu ت, atau ب bertemu م).",
    exampleLetters: "قَد تَّبَيَّنَ / ارْكَب مَّعَنَا",
  },
  i: {
    tag: "i",
    name: "Idgham Bilaghunnah",
    arabicName: "إِدْغَام بِلَا غُنَّة",
    category: "idgham",
    color: "#9ca3af", // gray-400
    bgBadge: "bg-stone-100 border-stone-200",
    textBadge: "text-stone-600",
    harakat: "Melebur Tanpa Dengung",
    description: "Nun mati atau tanwin melebur langsung ke huruf Lam (ل) atau Ra (ر) tanpa dengung.",
    exampleLetters: "مِن لَّدُنْهُ / غَفُورٌ رَّحِيمٌ",
  },
  h: {
    tag: "h",
    name: "Hamzah Wasal",
    arabicName: "هَمْزَة وَصْل",
    category: "silent",
    color: "#9ca3af", // gray-400
    bgBadge: "bg-stone-100 border-stone-200",
    textBadge: "text-stone-600",
    harakat: "Dilewati (Washal)",
    description: "Hamzah yang gugur (tidak dibaca) ketika disambung dari kata sebelumnya.",
    exampleLetters: "ٱلْحَمْدُ / بِٱسْمِ",
  },
  l: {
    tag: "l",
    name: "Lam Syamsiyah",
    arabicName: "لَام شَمْسِيَّة",
    category: "silent",
    color: "#9ca3af", // gray-400
    bgBadge: "bg-stone-100 border-stone-200",
    textBadge: "text-stone-600",
    harakat: "Dilebur / Tak Berbunyi",
    description: "Alif lam yang huruf lam-nya dilebur langsung ke huruf syamsiyah setelahnya bertasydid.",
    exampleLetters: "ٱلشَّمْسِ / ٱلنَّاسِ",
  },
  s: {
    tag: "s",
    name: "Huruf Tak Dibaca (Silent)",
    arabicName: "حَرْف مَحْذُوف / سَاكِن",
    category: "silent",
    color: "#9ca3af", // gray-400
    bgBadge: "bg-stone-100 border-stone-200",
    textBadge: "text-stone-600",
    harakat: "Tidak Dibaca",
    description: "Huruf yang tertulis dalam rasm mushaf tetapi tidak diucapkan dalam bacaan.",
    exampleLetters: "قَالُوا۟ / مِاْئَةَ",
  },
};

/**
 * Parses bracketed tajweed tags [tag:id[content] or [tag[content] into rich HTML span elements.
 */
export function parseTajweedToHtml(tajweedText: string): string {
  if (!tajweedText) return "";

  let result = tajweedText;
  let prev = "";

  // Recursively resolve nested tags
  while (prev !== result) {
    prev = result;
    result = result.replace(/\[([a-z])(?::\d+)?\[([^\[\]]+)\]/g, (match, tag, content) => {
      const rule = TAJWEED_RULES[tag];
      if (!rule) {
        return `<span>${content}</span>`;
      }
      return `<span class="tajweed-span" style="color:${rule.color};" title="${rule.name} (${rule.harakat}): ${rule.description}">${content}</span>`;
    });
  }

  return result;
}

/**
 * Strips all tajweed brackets to return clean pure text
 */
export function stripTajweedTags(text: string): string {
  if (!text) return "";
  let result = text;
  let prev = "";
  while (prev !== result) {
    prev = result;
    result = result.replace(/\[([a-z])(?::\d+)?\[([^\[\]]+)\]/g, "$2");
  }
  return result;
}
