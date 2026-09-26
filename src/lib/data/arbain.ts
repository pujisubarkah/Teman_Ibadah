export interface ArbainHadith {
  number: number;
  title: string;
  arabic: string;
  translation: string;
  theme: string;
  narrator: string;
}

export const ARBAIN_HADITHS: ArbainHadith[] = [
  {
    number: 1,
    title: "Ikhlas dan Niat",
    theme: "Niat & Keikhlasan",
    narrator: "HR. Bukhari & Muslim",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا، أَوْ امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.",
    translation: "Sesungguhnya setiap amalan tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan sesuai apa yang dia niatkan. Barangsiapa hijrahnya karena Allah dan Rasul-Nya, maka hijrahnya kepada Allah dan Rasul-Nya. Dan barangsiapa hijrahnya karena dunia yang ingin diraihnya atau wanita yang ingin dinikahinya, maka hijrahnya adalah kepada apa yang dia tuju.",
  },
  {
    number: 2,
    title: "Islam, Iman, dan Ihsan (Hadits Jibril)",
    theme: "Rukun Agama",
    narrator: "HR. Muslim",
    arabic: "أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً... أَنْ تُؤْمِنَ بِاللَّهِ، وَمَلاَئِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ... أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ.",
    translation: "Islam adalah engkau bersaksi tiada tuhan selain Allah dan Muhammad utusan Allah, mendirikan shalat, menunaikan zakat, puasa Ramadhan, dan haji bila mampu. Iman adalah engkau beriman kepada Allah, malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan takdir baik maupun buruk. Ihsan adalah engkau beribadah kepada Allah seakan-akan engkau melihat-Nya, jika engkau tidak melihat-Nya maka sesungguhnya Dia melihatmu.",
  },
  {
    number: 3,
    title: "Rukun Islam",
    theme: "Pondasi Agama",
    narrator: "HR. Bukhari & Muslim",
    arabic: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ.",
    translation: "Islam dibangun di atas lima perkara: bersaksi bahwa tiada sesembahan yang berhak disembah selain Allah dan Muhammad utusan Allah, mendirikan shalat, menunaikan zakat, haji ke Baitullah, dan puasa Ramadhan.",
  },
  {
    number: 4,
    title: "Penciptaan Manusia dan Takdir",
    theme: "Aqidah & Takdir",
    narrator: "HR. Bukhari & Muslim",
    arabic: "إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا نُطْفَةً، ثُمَّ يَكُونُ عَلَقَةً مِثْلَ ذَلِكَ، ثُمَّ يَكُونُ مُضْغَةً مِثْلَ ذَلِكَ، ثُمَّ يُرْسَلُ إِلَيْهِ الْمَلَكُ فَيَنْفُخُ فِيهِ الرُّوحَ، وَيُؤْمَرُ بِأَرْبَعِ كَلِمَاتٍ: بِكَتْبِ رِزْقِهِ، وَأَجَلِهِ، وَعَمَلِهِ، وَشَقِيٌّ أَوْ سَعِيدٌ.",
    translation: "Sesungguhnya setiap kalian dikumpulkan penciptaannya dalam rahim ibunya selama empat puluh hari berupa nutfah, lalu menjadi segumpal darah dalam waktu yang sama, lalu menjadi segumpal daging dalam waktu yang sama. Kemudian diutuslah malaikat untuk meniupkan ruh dan diperintahkan mencatat empat ketetapan: rezekinya, ajalnya, amalnya, dan apakah ia celaka atau bahagia.",
  },
  {
    number: 5,
    title: "Menolak Perkara Baru yang Diada-adakan",
    theme: "Sunnah & Syariat",
    narrator: "HR. Bukhari & Muslim",
    arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ.",
    translation: "Barangsiapa mengada-adakan dalam urusan (agama) kami ini sesuatu yang bukan darinya, maka hal itu tertolak.",
  },
  {
    number: 6,
    title: "Halal, Haram, dan Syubhat",
    theme: "Hati & Kehati-hatian",
    narrator: "HR. Bukhari & Muslim",
    arabic: "إِنَّ الْحَلاَلَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ، وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لاَ يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ... أَلاَ وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلاَ وَهِيَ الْقَلْبُ.",
    translation: "Sesungguhnya yang halal itu jelas dan yang haram itu jelas. Di antara keduanya ada perkara samar (syubhat) yang tidak diketahui banyak orang. Barangsiapa menjaga diri dari perkara syubhat, ia telah memelihara agama dan kehormatannya... Ketahuilah bahwa di dalam jasad ada segumpal daging; jika ia baik maka baiklah seluruh jasadnya, dan jika ia rusak maka rusaklah seluruh jasadnya. Ketahuilah ia adalah hati.",
  },
  {
    number: 7,
    title: "Agama adalah Nasihat",
    theme: "Persaudaraan & Dakwah",
    narrator: "HR. Muslim",
    arabic: "الدِّينُ النَّصِيحَةُ، قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ.",
    translation: "Agama adalah nasihat. Kami bertanya: Untuk siapa wahai Rasulullah? Beliau bersabda: Untuk Allah, Kitab-Nya, Rasul-Nya, para pemimpin kaum muslimin, dan segenap kaum muslimin.",
  },
  {
    number: 8,
    title: "Kehormatan Darah dan Harta Muslim",
    theme: "Muamalah",
    narrator: "HR. Bukhari & Muslim",
    arabic: "أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَيُقِيمُوا الصَّلاَةَ، وَيُؤْتُوا الزَّكَاةَ...",
    translation: "Aku diperintahkan untuk memerangi manusia hingga mereka bersaksi bahwa tiada sesembahan yang berhak disembah selain Allah dan Muhammad utusan Allah, menegakkan shalat, dan menunaikan zakat...",
  },
  {
    number: 9,
    title: "Melaksanakan Perintah Semampu Diri",
    theme: "Kemudahan Syariat",
    narrator: "HR. Bukhari & Muslim",
    arabic: "مَا نَهَيْتُكُمْ عَنْهُ فَاجْتَنِبُوهُ، وَمَا أَمَرْتُكُمْ بِهِ فَأْتُوا مِنْهُ مَا اسْتَطَعْتُمْ...",
    translation: "Apa yang aku larang atas kalian maka jauhilah, dan apa yang aku perintahkan kepada kalian maka kerjakanlah semampu kalian...",
  },
  {
    number: 10,
    title: "Makan dari yang Halal & Baik",
    theme: "Doa & Rezeki Halal",
    narrator: "HR. Muslim",
    arabic: "إِنَّ اللَّهَ طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا، وَإِنَّ اللَّهَ أَمَرَ الْمُؤْمِنِينَ بِمَا أَمَرَ بِهِ الْمُرْسَلِينَ...",
    translation: "Sesungguhnya Allah itu Maha Baik dan tidak menerima kecuali yang baik. Dan Allah memerintahkan orang-orang beriman dengan apa yang Dia perintahkan kepada para Rasul...",
  },
];
