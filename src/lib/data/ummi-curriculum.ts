export interface UmmiPracticeItem {
  id: string;
  arabic: string;
  latin: string;
  hint?: string;
  highlightIndices?: number[];
}

export interface UmmiPracticeRow {
  rowNumber: number;
  items: UmmiPracticeItem[];
}

export interface UmmiQuizQuestion {
  id: string;
  question: string;
  arabicPrompt?: string;
  soundPrompt?: string;
  options: {
    text: string;
    arabic?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface UmmiPage {
  pageNumber: number;
  title: string;
  subTitle?: string;
  ruleTitle: string;
  ruleDescription: string;
  keyRuleTip?: string;
  mainFocus: {
    arabic: string;
    latin: string;
    note?: string;
  }[];
  practiceRows: UmmiPracticeRow[];
  quiz?: UmmiQuizQuestion[];
}

export interface UmmiJilid {
  id: number;
  title: string;
  badge: string;
  level: string;
  color: string;
  gradient: string;
  borderClass: string;
  bgLight: string;
  textAccent: string;
  description: string;
  coreObjective: string;
  pages: UmmiPage[];
}

export const UMMI_CURRICULUM: UmmiJilid[] = [
  {
    id: 1,
    title: "Jilid 1",
    badge: "Tingkat Dasar",
    level: "Jilid 1 / 6",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    borderClass: "border-emerald-200 hover:border-emerald-400",
    bgLight: "bg-emerald-50 text-emerald-800",
    textAccent: "text-emerald-600",
    description: "Pengenalan huruf tunggal dan bersambung dengan harakat Fathah (A). Dibaca langsung pendek-cepat 1 ketukan.",
    coreObjective: "Mampu membaca huruf berharakat fathah secara langsung (tanpa dieja) dengan makhraj yang benar & tempo cepat-tepat.",
    pages: [
      {
        pageNumber: 1,
        title: "Huruf Alif (A) & Ba (Ba)",
        ruleTitle: "Pokok Bahasan & Prinsip Baca",
        ruleDescription: "Langsung dibaca pendek-cepat 'A' dan 'BA'. Tidak boleh dieja, dipanjangkan, atau diseret.",
        keyRuleTip: "Pastikan mulut terbuka sempurna untuk bunyi 'A' (fathah), dan bibir rapat untuk 'BA'.",
        mainFocus: [
          { arabic: "اَ", latin: "A", note: "Fathah di atas Alif" },
          { arabic: "بَ", latin: "BA", note: "Fathah di atas Ba" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "1-1-1", arabic: "اَ بَ", latin: "A - BA" },
              { id: "1-1-2", arabic: "بَ اَ", latin: "BA - A" },
              { id: "1-1-3", arabic: "اَ اَ", latin: "A - A" },
              { id: "1-1-4", arabic: "بَ بَ", latin: "BA - BA" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "1-1-5", arabic: "اَ بَ اَ", latin: "A - BA - A" },
              { id: "1-1-6", arabic: "بَ اَ بَ", latin: "BA - A - BA" },
              { id: "1-1-7", arabic: "بَ بَ اَ", latin: "BA - BA - A" },
              { id: "1-1-8", arabic: "اَ اَ بَ", latin: "A - A - BA" },
            ]
          },
          {
            rowNumber: 3,
            items: [
              { id: "1-1-9", arabic: "بَ اَ اَ", latin: "BA - A - A" },
              { id: "1-1-10", arabic: "اَ بَ بَ", latin: "A - BA - BA" },
              { id: "1-1-11", arabic: "بَ اَ بَ اَ", latin: "BA - A - BA - A" },
              { id: "1-1-12", arabic: "اَ بَ اَ بَ", latin: "A - BA - A - BA" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-1-1",
            question: "Manakah bacaan yang tepat untuk lafal di bawah ini?",
            arabicPrompt: "بَ اَ بَ",
            options: [
              { text: "BA - A - BA", isCorrect: true },
              { text: "A - BA - A", isCorrect: false },
              { text: "BA - BA - A", isCorrect: false },
              { text: "A - A - BA", isCorrect: false }
            ],
            explanation: "Huruf pertama 'بَ' (BA), kedua 'اَ' (A), ketiga 'بَ' (BA)."
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Huruf Ta (Ta) & Tsa (Tsa)",
        ruleTitle: "Pengenalan Huruf Ta & Tsa",
        ruleDescription: "Ta berbunyi tipis keluar dari ujung lidah ke pangkal gigi seri atas. Tsa keluar dari ujung lidah yang ditempelkan di tepi dua gigi seri atas.",
        keyRuleTip: "Jangan tertukar jumlah titik: Ba (1 di bawah), Ta (2 di atas), Tsa (3 di atas).",
        mainFocus: [
          { arabic: "تَ", latin: "TA", note: "2 titik di atas" },
          { arabic: "ثَ", latin: "TSA", note: "3 titik di atas, lidah sedikit digigit" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "1-2-1", arabic: "بَ تَ ثَ", latin: "BA - TA - TSA" },
              { id: "1-2-2", arabic: "تَ اَ بَ", latin: "TA - A - BA" },
              { id: "1-2-3", arabic: "ثَ بَ تَ", latin: "TSA - BA - TA" },
              { id: "1-2-4", arabic: "اَ تَ ثَ", latin: "A - TA - TSA" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "1-2-5", arabic: "تَ ثَ اَ", latin: "TA - TSA - A" },
              { id: "1-2-6", arabic: "بَ ثَ تَ", latin: "BA - TSA - TA" },
              { id: "1-2-7", arabic: "ثَ اَ ثَ", latin: "TSA - A - TSA" },
              { id: "1-2-8", arabic: "تَ بَ تَ", latin: "TA - BA - TA" },
            ]
          },
          {
            rowNumber: 3,
            items: [
              { id: "1-2-9", arabic: "اَ بَ تَ ثَ", latin: "A - BA - TA - TSA" },
              { id: "1-2-10", arabic: "ثَ تَ بَ اَ", latin: "TSA - TA - BA - A" },
              { id: "1-2-11", arabic: "تَ اَ ثَ بَ", latin: "TA - A - TSA - BA" },
              { id: "1-2-12", arabic: "بَ ثَ اَ تَ", latin: "BA - TSA - A - TA" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-1-2",
            question: "Lafal 'ثَ بَ تَ' dibaca bagaimana?",
            arabicPrompt: "ثَ بَ تَ",
            options: [
              { text: "TSA - BA - TA", isCorrect: true },
              { text: "TA - BA - TSA", isCorrect: false },
              { text: "BA - TA - TSA", isCorrect: false },
              { text: "A - TA - TSA", isCorrect: false }
            ],
            explanation: "Huruf bertitik tiga adalah TSA, titik satu di bawah adalah BA, titik dua di atas adalah TA."
          }
        ]
      },
      {
        pageNumber: 3,
        title: "Huruf Jim (Ja), Ha (Ha), & Kho (Kho)",
        ruleTitle: "Makharijul Huruf Halqiyah & Syafawiyah",
        ruleDescription: "Ja (tengah lidah), Ha (tengah tenggorokan bersih/halus), Kho (ujung tenggorokan berbunyi tebal/ngorok halus).",
        keyRuleTip: "Beda titik: Jim (titik di dalam/bawah), Ha (tanpa titik), Kho (titik di atas).",
        mainFocus: [
          { arabic: "جَ", latin: "JA", note: "Titik di tengah/bawah" },
          { arabic: "حَ", latin: "HA", note: "Bersih tanpa titik" },
          { arabic: "خَ", latin: "KHO", note: "Titik di atas (Tebal)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "1-3-1", arabic: "جَ حَ خَ", latin: "JA - HA - KHO" },
              { id: "1-3-2", arabic: "حَ تَ جَ", latin: "HA - TA - JA" },
              { id: "1-3-3", arabic: "خَ ثَ حَ", latin: "KHO - TSA - HA" },
              { id: "1-3-4", arabic: "جَ اَ خَ", latin: "JA - A - KHO" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "1-3-5", arabic: "بَ حَ ثَ", latin: "BA - HA - TSA" },
              { id: "1-3-6", arabic: "تَ خَ جَ", latin: "TA - KHO - JA" },
              { id: "1-3-7", arabic: "حَ جَ خَ", latin: "HA - JA - KHO" },
              { id: "1-3-8", arabic: "خَ حَ جَ", latin: "KHO - HA - JA" },
            ]
          },
          {
            rowNumber: 3,
            items: [
              { id: "1-3-9", arabic: "اَ بَ تَ ثَ", latin: "A - BA - TA - TSA" },
              { id: "1-3-10", arabic: "جَ حَ خَ دَ", latin: "JA - HA - KHO - DA" },
              { id: "1-3-11", arabic: "ثَ حَ تَ خَ", latin: "TSA - HA - TA - KHO" },
              { id: "1-3-12", arabic: "جَ بَ خَ اَ", latin: "JA - BA - KHO - A" },
            ]
          }
        ]
      },
      {
        pageNumber: 4,
        title: "Huruf Dal (Da), Dzal (Dza), Ro (Ro), & Zai (Za)",
        ruleTitle: "Huruf Lidah & Getaran",
        ruleDescription: "Da & Dza (ujung lidah), Ro (getaran tebal saat fathah), Za (desis tajam seperti lebah).",
        keyRuleTip: "Ro' berharakat fathah dibaca tebal (Tafkhim).",
        mainFocus: [
          { arabic: "دَ", latin: "DA", note: "Tanpa titik" },
          { arabic: "ذَ", latin: "DZA", note: "1 titik di atas (Lidah digigit tipis)" },
          { arabic: "رَ", latin: "RO", note: "Tebal berharakat fathah" },
          { arabic: "زَ", latin: "ZA", note: "Desis tajam" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "1-4-1", arabic: "دَ ذَ رَ زَ", latin: "DA - DZA - RO - ZA" },
              { id: "1-4-2", arabic: "رَ دَ زَ", latin: "RO - DA - ZA" },
              { id: "1-4-3", arabic: "ذَ رَ دَ", latin: "DZA - RO - DA" },
              { id: "1-4-4", arabic: "زَ دَ ذَ", latin: "ZA - DA - DZA" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "1-4-5", arabic: "جَ دَ رَ", latin: "JA - DA - RO" },
              { id: "1-4-6", arabic: "خَ ذَ بَ", latin: "KHO - DZA - BA" },
              { id: "1-4-7", arabic: "حَ رَ زَ", latin: "HA - RO - ZA" },
              { id: "1-4-8", arabic: "تَ زَ دَ", latin: "TA - ZA - DA" },
            ]
          }
        ]
      },
      {
        pageNumber: 5,
        title: "Evaluasi & Kelancaran Jilid 1",
        ruleTitle: "Uji Ketuntasan Jilid 1",
        ruleDescription: "Baca seluruh kombinasi huruf hijaiyah dari Alif sampai Ya dengan tempo stabil pendek-cepat 1 ketukan.",
        keyRuleTip: "Jangan sampai ada yang tertukar antara huruf berdesis (Za, Sin) dan huruf tebal (Kho, Shod).",
        mainFocus: [
          { arabic: "سَ شَ", latin: "SA - SYA", note: "Sin desis vs Syin tebal" },
          { arabic: "صَ ضَ", latin: "SHO - DHO", note: "Huruf Isti'la (Tebal)" },
          { arabic: "طَ ظَ", latin: "THO - ZHO", note: "Huruf Isti'la (Tebal)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "1-5-1", arabic: "سَ شَ صَ ضَ", latin: "SA - SYA - SHO - DHO" },
              { id: "1-5-2", arabic: "طَ ظَ عَ غَ", latin: "THO - ZHO - 'A - GHO" },
              { id: "1-5-3", arabic: "فَ قَ كَ لَ", latin: "FA - QO - KA - LA" },
              { id: "1-5-4", arabic: "مَ نَ وَ هَ يَ", latin: "MA - NA - WA - HA - YA" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "1-5-5", arabic: "قَ رَ اَ", latin: "QO - RO - A" },
              { id: "1-5-6", arabic: "كَتَبَ", latin: "KA - TA - BA" },
              { id: "1-5-7", arabic: "خَلَقَ", latin: "KHO - LA - QO" },
              { id: "1-5-8", arabic: "نَظَرَ", latin: "NA - ZHO - RO" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-1-5",
            question: "Lafal 'خَلَقَ' terdiri dari huruf apa saja?",
            arabicPrompt: "خَلَقَ",
            options: [
              { text: "Kho - Lam - Qof", isCorrect: true },
              { text: "Ha - Kaf - Fa", isCorrect: false },
              { text: "Jim - Lam - Kaf", isCorrect: false },
              { text: "Kho - Kaf - Tho", isCorrect: false }
            ],
            explanation: "'خَ' (Kho) + 'لَ' (Lam) + 'قَ' (Qof)."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Jilid 2",
    badge: "Harakat & Mad Asli",
    level: "Jilid 2 / 6",
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    borderClass: "border-blue-200 hover:border-blue-400",
    bgLight: "bg-blue-50 text-blue-800",
    textAccent: "text-blue-600",
    description: "Pengenalan harakat Kasrah (I), Dhammah (U), dan bacaan panjang 1 Alif / 2 Harakat (Mad Thabi'i).",
    coreObjective: "Mampu membedakan dengan presisi mana bacaan pendek 1 ketukan dan mana bacaan panjang 2 ketukan (1 ayunan suara).",
    pages: [
      {
        pageNumber: 1,
        title: "Harakat Kasrah (I) & Dhammah (U)",
        ruleTitle: "Perubahan Bunyi Harakat",
        ruleDescription: "Fathah = A (mulut terbuka), Kasrah = I (bibir ditarik ke bawah), Dhammah = U (bibir dimonyongkan bulat).",
        keyRuleTip: "Tetap dibaca pendek 1 ketukan jika tidak bertemu huruf Mad.",
        mainFocus: [
          { arabic: "بِ", latin: "BI", note: "Kasrah (I) di bawah garis" },
          { arabic: "بُ", latin: "BU", note: "Dhammah (U) di atas huruf" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "2-1-1", arabic: "اَ  اِ  اُ", latin: "A - I - U" },
              { id: "2-1-2", arabic: "بَ  بِ  بُ", latin: "BA - BI - BU" },
              { id: "2-1-3", arabic: "تَ  تِ  تُ", latin: "TA - TI - TU" },
              { id: "2-1-4", arabic: "ثَ  ثِ  ثُ", latin: "TSA - TSI - TSU" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "2-1-5", arabic: "رُسُلُ", latin: "RU - SU - LU" },
              { id: "2-1-6", arabic: "كُتُبُ", latin: "KU - TU - BU" },
              { id: "2-1-7", arabic: "عَلِمَ", latin: "'A - LI - MA" },
              { id: "2-1-8", arabic: "حَسُنَ", latin: "HA - SU - NA" },
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Mad Thabi'i: Fathah Diikuti Alif (Aa)",
        ruleTitle: "Kaidah Panjang 1 Alif / 2 Harakat",
        ruleDescription: "Setiap Fathah diikuti Alif dibaca panjang 1 Alif / 2 ketukan (1 ayunan suara).",
        keyRuleTip: "Ingat rumus Ummi: 'Satu ayunan suara, jangan lebih jangan kurang'.",
        mainFocus: [
          { arabic: "بَا", latin: "BAA", note: "Fathah + Alif = Panjang 2 Harakat" },
          { arabic: "تَا", latin: "TAA", note: "Fathah + Alif = Panjang 2 Harakat" },
          { arabic: "ثَا", latin: "TSAA", note: "Fathah + Alif = Panjang 2 Harakat" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "2-2-1", arabic: "بَ  بَا", latin: "BA - BAA" },
              { id: "2-2-2", arabic: "تَ  تَا", latin: "TA - TAA" },
              { id: "2-2-3", arabic: "ثَ  ثَا", latin: "TSA - TSAA" },
              { id: "2-2-4", arabic: "جَ  جَا", latin: "JA - JAA" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "2-2-5", arabic: "قَالَ", latin: "QOO - LA" },
              { id: "2-2-6", arabic: "كَانَ", latin: "KAA - NA" },
              { id: "2-2-7", arabic: "تَابَ", latin: "TAA - BA" },
              { id: "2-2-8", arabic: "صَابِرًا", latin: "SHOO - BI - RO(N)" },
            ]
          },
          {
            rowNumber: 3,
            items: [
              { id: "2-2-9", arabic: "جَاهَدَ", latin: "JAA - HA - DA" },
              { id: "2-2-10", arabic: "خَالِقُ", latin: "KHOO - LI - QU" },
              { id: "2-2-11", arabic: "سَافَرَ", latin: "SAA - FA - RO" },
              { id: "2-2-12", arabic: "عَابِدُ", latin: "'AA - BI - DU" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-2-2",
            question: "Berapa panjang harakat pada lafal 'قَالَ' pada huruf Qof?",
            arabicPrompt: "قَالَ",
            options: [
              { text: "2 Harakat (1 Alif)", isCorrect: true },
              { text: "1 Harakat (Pendek)", isCorrect: false },
              { text: "6 Harakat", isCorrect: false },
              { text: "4 Harakat", isCorrect: false }
            ],
            explanation: "Huruf Qof berharakat Fathah diikuti Alif sehingga dibaca Mad Thabi'i sepanjang 2 Harakat."
          }
        ]
      },
      {
        pageNumber: 3,
        title: "Mad Thabi'i: Kasrah + Ya Sukun & Dhammah + Wawu Sukun",
        ruleTitle: "Kaidah Mad Ii & Uu",
        ruleDescription: "Kasrah diikuti Ya Sukun dibaca panjang 2 harakat (Ii). Dhammah diikuti Wawu Sukun dibaca panjang 2 harakat (Uu).",
        keyRuleTip: "Perhatikan bentuk harakat tegak berdiri (fathah berdiri / kasrah berdiri) juga dibaca panjang 2 harakat.",
        mainFocus: [
          { arabic: "فِيْ", latin: "FII", note: "Kasrah + Ya Sukun" },
          { arabic: "يَقُوْلُ", latin: "YA - QUU - LU", note: "Dhammah + Wawu Sukun" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "2-3-1", arabic: "دِيْنُ", latin: "DII - NU" },
              { id: "2-3-2", arabic: "عَلِيْمٌ", latin: "'A - LII - M" },
              { id: "2-3-3", arabic: "بَصِيْرٌ", latin: "BA - SHII - R" },
              { id: "2-3-4", arabic: "حَكِيْمٌ", latin: "HA - KII - M" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "2-3-5", arabic: "تَكُوْنُ", latin: "TA - KUU - NU" },
              { id: "2-3-6", arabic: "يَقُوْمُ", latin: "YA - QUU - MU" },
              { id: "2-3-7", arabic: "نُوْرُ", latin: "NUU - RU" },
              { id: "2-3-8", arabic: "غَفُوْرٌ", latin: "GHO - FUU - R" },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Jilid 3",
    badge: "Sukun & Qalqalah",
    level: "Jilid 3 / 6",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    borderClass: "border-amber-200 hover:border-amber-400",
    bgLight: "bg-amber-50 text-amber-800",
    textAccent: "text-amber-600",
    description: "Pengenalan tanda Sukun (mati), huruf Lin (Ai/Au), dan hukum pantulan Qalqalah (Ba, Jim, Dal, Tho, Qof).",
    coreObjective: "Mampu melafalkan huruf mati secara jelas dan memantulkan huruf Qalqalah dengan tepat tanpa menambah hamzah.",
    pages: [
      {
        pageNumber: 1,
        title: "Tanda Sukun (Mati) & Huruf Lin",
        ruleTitle: "Membaca Huruf Sukun",
        ruleDescription: "Huruf berharakat sukun ditekan pada makhrajnya. Wawu sukun setelah fathah berbunyi 'AU', Ya sukun setelah fathah berbunyi 'AI'.",
        keyRuleTip: "Jangan memantulkan huruf sukun kecuali termasuk 5 huruf Qalqalah.",
        mainFocus: [
          { arabic: "يَوْمَ", latin: "YAW - MA", note: "Lin Fathah + Wawu Sukun" },
          { arabic: "بَيْتَ", latin: "BAY - TA", note: "Lin Fathah + Ya Sukun" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "3-1-1", arabic: "خَوْفٍ", latin: "KHOW - FIN" },
              { id: "3-1-2", arabic: "صَوْمَ", latin: "SHOW - MA" },
              { id: "3-1-3", arabic: "قَوْمِ", latin: "QOW - MI" },
              { id: "3-1-4", arabic: "نَوْمَ", latin: "NOW - MA" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "3-1-5", arabic: "عَيْنَ", latin: "'AY - NA" },
              { id: "3-1-6", arabic: "غَيْبَ", latin: "GHAY - BA" },
              { id: "3-1-7", arabic: "كَيْفَ", latin: "KAY - FA" },
              { id: "3-1-8", arabic: "شَيْءٍ", latin: "SYAY - IN" },
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Hukum Qalqalah (Pantulan Suara)",
        ruleTitle: "5 Huruf Qalqalah: ب ج د ط ق (Baju Ditoko)",
        ruleDescription: "Jika huruf Ba, Jim, Dal, Tho, atau Qof berharakat sukun (mati), maka suaranya memantul secara alami.",
        keyRuleTip: "Qalqalah Sugra = di tengah kata, pantulan ringan. Qalqalah Kubra = di akhir kata/waqaf, pantulan kuat.",
        mainFocus: [
          { arabic: "أَبْ", latin: "AB", note: "Ba memantul" },
          { arabic: "أَجْ", latin: "AJ", note: "Jim memantul" },
          { arabic: "أَدْ", latin: "AD", note: "Dal memantul" },
          { arabic: "أَطْ", latin: "ATH", note: "Tho memantul (Tebal)" },
          { arabic: "أَقْ", latin: "AQ", note: "Qof memantul (Tebal)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "3-2-1", arabic: "يَبْصُرُ", latin: "YAB - SHU - RU" },
              { id: "3-2-2", arabic: "يَجْعَلْ", latin: "YAJ - 'AL" },
              { id: "3-2-3", arabic: "يَدْخُلُ", latin: "YAD - KHU - LU" },
              { id: "3-2-4", arabic: "يَطْمَعُ", latin: "YATH - MA - 'U" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "3-2-5", arabic: "يَقْرَأُ", latin: "YAQ - RO - U" },
              { id: "3-2-6", arabic: "أَبْصَارُ", latin: "AB - SHOO - RU" },
              { id: "3-2-7", arabic: "أَجْرٌ", latin: "AJ - RUN" },
              { id: "3-2-8", arabic: "أَدْبَارَ", latin: "AD - BAA - RO" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-3-2",
            question: "Manakah di bawah ini yang BUKAN merupakan huruf Qalqalah?",
            options: [
              { text: "Kaf (ك)", isCorrect: true },
              { text: "Ba (ب)", isCorrect: false },
              { text: "Jim (ج)", isCorrect: false },
              { text: "Tho (ط)", isCorrect: false }
            ],
            explanation: "5 Huruf Qalqalah adalah: Ba (ب), Jim (ج), Dal (د), Tho (ط), dan Qof (ق) [Baju Ditoko]."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Jilid 4",
    badge: "Tanwin & Tasydid",
    level: "Jilid 4 / 6",
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    borderClass: "border-rose-200 hover:border-rose-400",
    bgLight: "bg-rose-50 text-rose-800",
    textAccent: "text-rose-600",
    description: "Pengenalan Tanwin (An, In, Un), tanda Tasydid / Syaddah, serta dengung Ghunnah Musyaddadah.",
    coreObjective: "Mampu membaca huruf bertasydid dengan penekanan mantap dan menahan dengung 2 harakat pada Nun & Mim bertasydid.",
    pages: [
      {
        pageNumber: 1,
        title: "Tanwin: Fathatain, Kasratain, Dhammatain",
        ruleTitle: "Bunyi Suara Tanwin (Bunyi N di Akhir)",
        ruleDescription: "Fathatain = An, Kasratain = In, Dhammatain = Un. Dibaca pendek-cepat.",
        keyRuleTip: "Fathatain biasanya disertai huruf alif bantu, tetapi tetap dibaca 'An' pendek bila dibaca sambung.",
        mainFocus: [
          { arabic: "بًا", latin: "BAN", note: "Fathatain" },
          { arabic: "بٍ", latin: "BIN", note: "Kasratain" },
          { arabic: "بٌ", latin: "BUN", note: "Dhammatain" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "4-1-1", arabic: "كِتَابًا", latin: "KI - TAA - BAN" },
              { id: "4-1-2", arabic: "عَذَابٍ", latin: "'A - DZAA - BIN" },
              { id: "4-1-3", arabic: "غَفُوْرٌ", latin: "GHO - FUU - RUN" },
              { id: "4-1-4", arabic: "رَحِيْمًا", latin: "RO - HII - MAN" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "4-1-5", arabic: "شَيْئًا", latin: "SYAY - AN" },
              { id: "4-1-6", arabic: "سَمِيْعٌ", latin: "SA - MII - 'UN" },
              { id: "4-1-7", arabic: "أَحَدٌ", latin: "A - HA - DUN" },
              { id: "4-1-8", arabic: "قَوْلًا", latin: "QOW - LAN" },
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Tasydid & Ghunnah Musyaddadah (نّ & مّ)",
        ruleTitle: "Kaidah Tasydid & Dengung 2 Harakat",
        ruleDescription: "Tasydid artinya ditekan dan ditahan. Khusus pada huruf Nun Bertasydid (نّ) dan Mim Bertasydid (مّ), wajib didengungkan (Ghunnah) ditahan 2 ketukan.",
        keyRuleTip: "Tahan dengung di pangkal hidung (Khaisyum) selama 2 harakat.",
        mainFocus: [
          { arabic: "إِنَّ", latin: "INNA", note: "Nun Tasydid: Dengung 2 harakat" },
          { arabic: "ثُمَّ", latin: "TSUMMA", note: "Mim Tasydid: Dengung 2 harakat" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "4-2-1", arabic: "إِنَّ رَبَّهُمْ", latin: "INNA ROBBAHUM" },
              { id: "4-2-2", arabic: "عَمَّ يَتَسَآءَلُونَ", latin: "'AMMA YATASAAA-ALUUN" },
              { id: "4-2-3", arabic: "مِنَ الْجِنَّةِ", latin: "MINAL JINNATI" },
              { id: "4-2-4", arabic: "فَأُمُّهُ هَاوِيَةٌ", latin: "FA-UMMUHUU HAAWIYAH" },
            ]
          },
          {
            rowNumber: 2,
            items: [
              { id: "4-2-5", arabic: "قُلْ أَعُوْذُ بِرَبِّ النَّاسِ", latin: "QUL A'UUDZU BI ROBBIN-NAAS" },
              { id: "4-2-6", arabic: "مَلِكِ النَّاسِ", latin: "MALIKIN-NAAS" },
              { id: "4-2-7", arabic: "إِلَهِ النَّاسِ", latin: "ILAAHIN-NAAS" },
              { id: "4-2-8", arabic: "مِن شَرِّ الْوَسْوَاسِ", latin: "MIN SYARRIL WASWAAS" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-4-2",
            question: "Bagaimana cara membaca huruf Nun atau Mim yang memiliki tanda Tasydid (نّ / مّ)?",
            options: [
              { text: "Ditekan dan ditahan dengung selama 2 harakat", isCorrect: true },
              { text: "Dibaca cepat tanpa ditahan", isCorrect: false },
              { text: "Dipantulkan seperti Qalqalah", isCorrect: false },
              { text: "Dibaca samar-samar", isCorrect: false }
            ],
            explanation: "Nun dan Mim bertasydid adalah Ghunnah Musyaddadah, wajib didengungkan dan ditahan selama 2 harakat."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Jilid 5",
    badge: "Waqaf & Nun Mati",
    level: "Jilid 5 / 6",
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    borderClass: "border-purple-200 hover:border-purple-400",
    bgLight: "bg-purple-50 text-purple-800",
    textAccent: "text-purple-600",
    description: "Kaidah Waqaf (cara berhenti di akhir ayat/kata) & Hukum Nun Sukun/Tanwin (Idzhar, Idgham, Ikhfa, Iqlab).",
    coreObjective: "Mampu mempraktikkan hukum nun sukun dengan dengung yang tepat dan membaca waqaf dengan kaidah yang benar.",
    pages: [
      {
        pageNumber: 1,
        title: "Kaidah Waqaf (Berhenti Membaca)",
        ruleTitle: "Cara Mematikan Huruf di Akhir Kata",
        ruleDescription: "1. Huruf hidup berharakat di akhir kata disukunkan (dimatikan).\n2. Ta Marbuthah (ة/ـة) berubah bunyi menjadi 'H' sukun (هْ).\n3. Fathatain (ـًـا) menjadi Mad 'Iwadh (panjang 2 harakat).",
        keyRuleTip: "Contoh: رَحِيْمًا dibaca saat waqaf menjadi 'ROHII-MAA'.",
        mainFocus: [
          { arabic: "عَلِيْمٌ ← عَلِيْمْ", latin: "'ALIIM", note: "Disukunkan" },
          { arabic: "جَنَّةٌ ← جَنَّهْ", latin: "JANNAH", note: "Ta Marbuthah jadi H" },
          { arabic: "أَبَدًا ← أَبَدَا", latin: "ABADAA", note: "Mad 'Iwadh (2 Harakat)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "5-1-1", arabic: "مِنْ مَسَدٍ ← مَسَدْ", latin: "MASAD (Qalqalah)" },
              { id: "5-1-2", arabic: "فِي الْعُقَدِ ← الْعُقَدْ", latin: "AL-'UQOD (Qalqalah)" },
              { id: "5-1-3", arabic: "حَاسِدٍ إِذَا حَسَدَ ← حَسَدْ", latin: "HASAD" },
              { id: "5-1-4", arabic: "الْقَارِعَةُ ← الْقَارِعَهْ", latin: "AL-QOORI'AH" },
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Hukum Nun Mati & Tanwin: 4 Hukum Utama",
        ruleTitle: "Idzhar, Idgham, Ikhfa, dan Iqlab",
        ruleDescription: "1. IDZHAR (Jelas): Depan huruf Halqi (ء هـ ع ح غ خ)\n2. IDGHAM (Masuk & Dengung/Tanpa Dengung): Depan (ي ن م و / ل ر)\n3. IQLAB (Menjadi bunyi M dengung): Depan huruf Ba (ب)\n4. IKHFA (Samar & Dengung): Depan 15 huruf Ikhfa.",
        keyRuleTip: "Ikhfa dan Idgham Bighunnah ditahan dengungnya selama 2 harakat.",
        mainFocus: [
          { arabic: "مَنْ آمَنَ", latin: "MAN AAMANA", note: "Idzhar (Jelas)" },
          { arabic: "مَن يَقُولُ", latin: "MAY-YAQUULU", note: "Idgham Bighunnah (Dengung)" },
          { arabic: "مِن بَعْدِ", latin: "MIM-BA'DI", note: "Iqlab (Bunyi M)" },
          { arabic: "مِن قَبْلِ", latin: "MING-QOBLI", note: "Ikhfa (Samar & Dengung)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "5-2-1", arabic: "مَنْ آمَنَ بِاللَّهِ", latin: "MAN AAMANA BILLAAH" },
              { id: "5-2-2", arabic: "فَمَن يَعْمَلْ", latin: "FAMAY-YA'MAL" },
              { id: "5-2-3", arabic: "أَنبِئْهُم", latin: "AM-BI'HUM" },
              { id: "5-2-4", arabic: "إِن كُنتُمْ", latin: "ING-KUNTUM" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-5-2",
            question: "Lafal 'مَن يَقُولُ' dibaca dengan hukum apa?",
            arabicPrompt: "مَن يَقُولُ",
            options: [
              { text: "Idgham Bighunnah (Masuk dengan dengung)", isCorrect: true },
              { text: "Idzhar Halqi (Jelas)", isCorrect: false },
              { text: "Iqlab (Bunyi Mim)", isCorrect: false },
              { text: "Qalqalah", isCorrect: false }
            ],
            explanation: "Nun mati bertemu huruf Ya (ي) termasuk Idgham Bighunnah, dibaca melebur dan ditahan dengung 2 harakat."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Jilid 6",
    badge: "Mad Far'i & Ayat Al-Quran",
    level: "Jilid 6 / 6",
    color: "teal",
    gradient: "from-teal-600 to-emerald-700",
    borderClass: "border-teal-200 hover:border-teal-400",
    bgLight: "bg-teal-50 text-teal-800",
    textAccent: "text-teal-700",
    description: "Kaidah Mim Mati, Alif Lam (Syamsiyah & Qamariyah), Tanda Mad Panjang 4-6 Harakat, dan Latihan Membaca Ayat Utuh.",
    coreObjective: "Mampu membaca ayat-ayat Al-Qur'an secara tartil, lancar, dan tepat sesuai seluruh kaidah tajwid.",
    pages: [
      {
        pageNumber: 1,
        title: "Alif Lam Syamsiyah & Qamariyah, serta Mim Mati",
        ruleTitle: "Kaidah Bacaan Lam & Mim Sukun",
        ruleDescription: "1. Alif Lam Qamariyah: Huruf Lam dibaca jelas (Contoh: الْحَمْدُ).\n2. Alif Lam Syamsiyah: Huruf Lam dimasukkan ke huruf berikutnya bertasydid (Contoh: النَّاسُ).\n3. Mim Sukun bertemu Mim (Idgham Mimi / Dengung), bertemu Ba (Ikhfa Syafawi / Dengung), selain itu Idzhar Syafawi (Jelas).",
        keyRuleTip: "Perhatikan tanda tasydid di atas huruf setelah Alif Lam sebagai penanda Syamsiyah.",
        mainFocus: [
          { arabic: "الْقَمَرُ", latin: "AL-QOMARU", note: "Alif Lam Qamariyah (Jelas)" },
          { arabic: "الشَّمْسُ", latin: "ASY-SYAMSU", note: "Alif Lam Syamsiyah (Lebur)" },
          { arabic: "لَهُم مَّا", latin: "LAHUM-MAA", note: "Idgham Mimi (Dengung)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "6-1-1", arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", latin: "AL-HAMDU LILLAAHI ROBBIL 'AALAMIIN" },
              { id: "6-1-2", arabic: "مَالِكِ يَوْمِ الدِّينِ", latin: "MAALIKI YAWMID-DIIN" },
              { id: "6-1-3", arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", latin: "IYYAAKA NA'BUDU WA IYYAAKA NASTA'IIN" },
              { id: "6-1-4", arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", latin: "IHDINASH-SHIROOTHOL MUSTAQIIM" },
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Tanda Mad Wajib, Jaiz, & Lazim (Panjang 4-6 Harakat)",
        ruleTitle: "Tanda Alis/Gelombang di Atas Huruf",
        ruleDescription: "Tanda alis (~) menunjukkan bacaan dibaca panjang lebih dari 2 harakat: Mad Wajib Muttashil (4-5 harakat), Mad Jaiz Munfashil (4-5 harakat), dan Mad Lazim (6 harakat).",
        keyRuleTip: "Bila tanda alis bertemu huruf bertasydid dalam 1 kata (Mad Lazim Kilmi Mutsaqqal), panjangkan 6 harakat lalu tekan ke tasydid.",
        mainFocus: [
          { arabic: "جَآءَ", latin: "JAAA-A", note: "Mad Wajib (4-5 Harakat)" },
          { arabic: "يَا أَيُّهَا", latin: "YAAA-AYYUHA", note: "Mad Jaiz (4-5 Harakat)" },
          { arabic: "وَلَا الضَّآلِّينَ", latin: "WALADH-DHOOOOLLLIIN", note: "Mad Lazim (6 Harakat)" }
        ],
        practiceRows: [
          {
            rowNumber: 1,
            items: [
              { id: "6-2-1", arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", latin: "IDZAA JAAA-A NASHRULLOOHI WAL FAT-H" },
              { id: "6-2-2", arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", latin: "WA RO-AITAN-NAASA YADKHULUUNA FII DIINILLAAHI AFWAAJAA" },
              { id: "6-2-3", arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ", latin: "FASABBIH BIHAMDI ROBBIKA WASTAGHFIRH" },
              { id: "6-2-4", arabic: "إِنَّهُ كَانَ تَوَّابًا", latin: "INNAHUU KAANA TAWWAABAA" },
            ]
          }
        ],
        quiz: [
          {
            id: "q-6-2",
            question: "Berapa panjang harakat lafal 'الضَّآلِّينَ' pada bagian huruf bergelombang?",
            arabicPrompt: "الضَّآلِّينَ",
            options: [
              { text: "6 Harakat (Mad Lazim)", isCorrect: true },
              { text: "2 Harakat", isCorrect: false },
              { text: "1 Harakat", isCorrect: false },
              { text: "3 Harakat", isCorrect: false }
            ],
            explanation: "Mad Lazim Kilmi Mutsaqqal dibaca panjang maksimal yaitu 6 harakat sebelum ditekan ke huruf Lam bertasydid."
          }
        ]
      }
    ]
  }
];
