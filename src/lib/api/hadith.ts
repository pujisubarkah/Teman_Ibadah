import { HadithBook, HadithResponse, HadithItem } from "@/lib/types";

export const HADITH_BOOKS: HadithBook[] = [
  { name: "Shahih Bukhari", slug: "bukhari", total: 6638 },
  { name: "Shahih Muslim", slug: "muslim", total: 4930 },
  { name: "Sunan Abu Dawud", slug: "abu-dawud", total: 4419 },
  { name: "Sunan At-Tirmidzi", slug: "tirmidzi", total: 3625 },
  { name: "Sunan An-Nasa'i", slug: "nasai", total: 5364 },
  { name: "Sunan Ibnu Majah", slug: "ibnu-majah", total: 4285 },
  { name: "Musnad Ahmad", slug: "ahmad", total: 4305 },
  { name: "Muwatha' Malik", slug: "malik", total: 1587 },
  { name: "Sunan Ad-Darimi", slug: "darimi", total: 2949 },
];

export async function getHadithBooks(): Promise<HadithBook[]> {
  return HADITH_BOOKS;
}

export async function getHadithsByBook(
  slug: string,
  page: number = 1,
  limit: number = 20
): Promise<HadithResponse> {
  try {
    const res = await fetch(
      `https://hadis-api-id.vercel.app/hadith/${slug}?page=${page}&limit=${limit}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Gagal memuat hadits dari ${slug}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching hadiths for ${slug}:`, error);
    return getFallbackHadiths(slug, page, limit);
  }
}

export async function getHadithByNumber(slug: string, number: number): Promise<HadithItem | null> {
  try {
    const res = await fetch(`https://hadis-api-id.vercel.app/hadith/${slug}/${number}`);
    if (!res.ok) throw new Error("Hadits tidak ditemukan");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching hadith ${slug} #${number}:`, error);
    const fallback = getFallbackHadiths(slug, 1, 10);
    return fallback.items.find((h) => h.number === number) || fallback.items[0] || null;
  }
}

export const FEATURED_HADITHS = [
  {
    book: "Bukhari",
    number: 1,
    title: "Niat dalam Setiap Amal",
    arab: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
    id: "Semua perbuatan tergantung niatnya, dan (balasan) bagi tiap-tiap orang (tergantung) apa yang diniatkan; Barangsiapa niat hijrahnya karena dunia yang ingin digapainya atau karena seorang wanita yang ingin dinikahinya, maka hijrahnya adalah kepada apa dia diniatkan.",
  },
  {
    book: "Muslim",
    number: 1,
    title: "Islam, Iman, dan Ihsan",
    arab: "الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَتُقِيمَ الصَّلاَةَ وَتُؤْتِيَ الزَّكَاةَ وَتَصُومَ رَمَضَانَ وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً",
    id: "Islam adalah engkau bersaksi bahwa tidak ada sesembahan yang berhak disembah selain Allah dan Muhammad adalah utusan Allah, menegakkan shalat, menunaikan zakat, berpuasa Ramadhan, dan berhaji ke Baitullah jika engkau mampu menempuh jalannya.",
  },
  {
    book: "Bukhari",
    number: 13,
    title: "Mencintai Sesama Muslim",
    arab: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    id: "Tidaklah beriman seorang di antara kalian hingga dia mencintai untuk saudaranya apa yang dia cintai untuk dirinya sendiri.",
  },
  {
    book: "Tirmidzi",
    number: 1987,
    title: "Taqwa dan Akhlak yang Baik",
    arab: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    id: "Bertaqwalah kepada Allah di mana pun engkau berada, dan iringilah keburukan dengan kebaikan niscaya kebaikan itu akan menghapusnya, serta pergaulilah manusia dengan akhlak yang mulia.",
  },
  {
    book: "Bukhari",
    number: 6011,
    title: "Menahan Amarah",
    arab: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    id: "Bukanlah orang yang kuat itu yang pandai bergulat, tetapi orang yang kuat adalah orang yang dapat menahan dirinya ketika sedang marah.",
  },
  {
    book: "Bukhari",
    number: 5027,
    title: "Keutamaan Mempelajari Al-Quran",
    arab: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    id: "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya.",
  },
];

function getFallbackHadiths(slug: string, page: number, limit: number): HadithResponse {
  const items: HadithItem[] = FEATURED_HADITHS.map((h, i) => ({
    number: i + 1,
    arab: h.arab,
    id: h.id,
  }));

  return {
    name: slug.toUpperCase(),
    slug,
    total: items.length,
    pagination: {
      totalItems: items.length,
      currentPage: page,
      pageSize: limit,
      totalPages: 1,
      startPage: 1,
      endPage: 1,
      startIndex: 0,
      endIndex: items.length - 1,
      pages: [1],
    },
    items,
  };
}
