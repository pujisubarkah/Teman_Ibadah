export interface PrayerNiat {
  id: string;
  name: string;
  category: "fardhu" | "sunnah";
  rakaat: number;
  arabic: string;
  latin: string;
  translation: string;
  description: string;
}

export interface PrayerStep {
  step: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  notes: string;
}

export interface PrayerDzikirItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  count?: number;
}

export const PRAYER_NIAT_LIST: PrayerNiat[] = [
  {
    id: "subuh",
    name: "Shalat Subuh",
    category: "fardhu",
    rakaat: 2,
    arabic: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhash-shubhi rak'ataini mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 2 rakaat pada waktu fajar terbit hingga sebelum terbit matahari.",
  },
  {
    id: "dzuhur",
    name: "Shalat Dzuhur",
    category: "fardhu",
    rakaat: 4,
    arabic: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhazh-zhuhri arba'a raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Dzuhur empat rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 4 rakaat setelah matahari tergelincir dari tengah langit.",
  },
  {
    id: "ashar",
    name: "Shalat Ashar",
    category: "fardhu",
    rakaat: 4,
    arabic: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal 'ashri arba'a raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 4 rakaat ketika bayangan benda sama panjang dengan aslinya hingga menjelang terbenam matahari.",
  },
  {
    id: "maghrib",
    name: "Shalat Maghrib",
    category: "fardhu",
    rakaat: 3,
    arabic: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal maghribi tsalaatsa raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 3 rakaat setelah terbenam matahari sampai mega merah hilang.",
  },
  {
    id: "isya",
    name: "Shalat Isya",
    category: "fardhu",
    rakaat: 4,
    arabic: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal 'isyaa-i arba'a raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 4 rakaat setelah mega merah lenyap hingga sepertiga malam/menjelang fajar.",
  },
  {
    id: "dhuha",
    name: "Shalat Dhuha",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatadh-dhuhaa rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Dhuha dua rakaat karena Allah Ta'ala.",
    description: "Dikerjakan 2 hingga 8 rakaat pada waktu matahari mulai naik sepenggalah hingga menjelang waktu dzuhur.",
  },
  {
    id: "tahajjud",
    name: "Shalat Tahajjud",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatat-tahajjudi rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Tahajjud dua rakaat karena Allah Ta'ala.",
    description: "Dikerjakan di malam hari setelah bangun tidur (terutama sepertiga malam terakhir).",
  },
  {
    id: "witir",
    name: "Shalat Witir",
    category: "sunnah",
    rakaat: 3,
    arabic: "أُصَلِّي سُنَّةَ الْوِتْرِ ثَلَاثَ رَكَعَاتٍ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatal witri tsalaatsa raka'aatin lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Witir tiga rakaat karena Allah Ta'ala.",
    description: "Shalat penutup malam dengan jumlah rakaat ganjil (1 atau 3 rakaat).",
  },
  {
    id: "taubat",
    name: "Shalat Taubat",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ التَّوْبَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatat-taubati rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Taubat dua rakaat karena Allah Ta'ala.",
    description: "Shalat sunnah 2 rakaat yang dikerjakan saat memohon ampunan dosa kepada Allah SWT.",
  },
  {
    id: "istikharah",
    name: "Shalat Istikharah",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ الْإِسْتِخَارَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatal istikhaarati rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Istikharah dua rakaat karena Allah Ta'ala.",
    description: "Shalat memohon petunjuk pilihan terbaik dari Allah SWT atas suatu urusan.",
  },
  {
    id: "hajat",
    name: "Shalat Hajat",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ الْحَاجَةِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatal haajati rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Hajat dua rakaat karena Allah Ta'ala.",
    description: "Shalat yang ditunaikan ketika memiliki hajat/keinginan khusus agar dimudahkan Allah SWT.",
  },
];

export const PRAYER_STEPS: PrayerStep[] = [
  {
    step: 1,
    title: "1. Niat & Takbiratul Ihram",
    arabic: "اللَّهُ أَكْبَرُ",
    latin: "Allahu Akbar",
    translation: "Allah Maha Besar.",
    notes: "Mengangkat kedua tangan sejajar telinga/bahu sambil berniat di dalam hati dan mengucapkan takbir.",
  },
  {
    step: 2,
    title: "2. Membaca Doa Iftitah (Sunnah)",
    arabic: "اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً. إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلاَتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ.",
    latin: "Allaahu akbaru kabiiraa walhamdu lillaahi katsiiraa, wa subhaanallaahi bukrataw wa-ashiilaa. Innii wajjahtu wajhiya lilladzii fatharas-samaawaati wal ardha haniifam muslimaw wamaa ana minal musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil 'aalamiin. Laa syariika lahu wa bidzaalika umirtu wa ana minal muslimiin.",
    translation: "Allah Maha Besar lagi sempurna kebesaran-Nya, segala puji bagi Allah dengan pujian yang banyak. Maha Suci Allah sepanjang pagi dan petang. Sesungguhnya aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan lurus dan berserah diri, dan aku bukanlah termasuk orang musyrik. Sesungguhnya shalatku, ibadahku, hidupku dan matiku hanyalah untuk Allah Tuhan semesta alam, tidak ada sekutu bagi-Nya dan dengan itulah aku diperintahkan dan aku termasuk orang muslim.",
    notes: "Dibaca setelah takbiratul ihram pada rakaat pertama secara pelan (sirr).",
  },
  {
    step: 3,
    title: "3. Membaca Surat Al-Fatihah & Ayat Al-Quran",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ. آمِينَ",
    latin: "Bismillaahir-rahmaanir-rahiim. Alhamdu lillaahi rabbil 'aalamiin. Ar-rahmaanir-rahiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinash-shiraathal mustaqiim. Shiraathal ladziina an'amta 'alaihim ghairil maghdhuubi 'alaihim waladh-dhaalliin. Aamiin.",
    translation: "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Tunjukilah kami jalan yang lurus. Yaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat. Kabulkanlah doa kami.",
    notes: "Membaca Al-Fatihah adalah rukun wajib dalam setiap rakaat shalat, diikuti membaca surat pendek pada 2 rakaat pertama.",
  },
  {
    step: 4,
    title: "4. Ruku' & Bacaannya",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
    latin: "Subhaana rabbiyal 'azhiimi wa bihamdih (3x)",
    translation: "Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya (3 kali).",
    notes: "Membungkukkan badan dengan punggung dan kepala lurus mendatar, kedua telapak tangan memegang lutut disertai thuma'ninah.",
  },
  {
    step: 5,
    title: "5. I'tidal & Doa Bangkit dari Ruku'",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
    latin: "Sami'allaahu liman hamidah. Rabbanaa lakal hamdu mil'us-samaawaati wa mil'ul ardhi wa mil'u maa syi'ta min syai-in ba'du.",
    translation: "Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji sepenuh langit dan sepenuh bumi, dan sepenuh apa yang Engkau kehendaki sesudah itu.",
    notes: "Berdiri tegak kembali setelah ruku' dengan tenang (thuma'ninah).",
  },
  {
    step: 6,
    title: "6. Sujud & Bacaannya",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
    latin: "Subhaana rabbiyal a'laa wa bihamdih (3x)",
    translation: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya (3 kali).",
    notes: "Menempelkan dahi, hidung, kedua telapak tangan, kedua lutut, dan ujung jari-jemari kedua kaki ke lantai.",
  },
  {
    step: 7,
    title: "7. Duduk di Antara Dua Sujud (Iftirasy)",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    latin: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
    translation: "Ya Tuhanku ampunilah aku, rahmatilah aku, cukupkanlah kekuranganku, angkatlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah aku.",
    notes: "Duduk tegak bertumpu pada kaki kiri, sedangkan telapak kaki kanan ditegakkan.",
  },
  {
    step: 8,
    title: "8. Tasyahhud Awal & Tasyahhud Akhir (Tahiyyat)",
    arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ، وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    latin: "Attahiyyaatul mubaarakaatush-shalawaatuth-thayyibaatu lillaah. Assalaamu 'alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahish-shaalihiin. Asyhadu allaa ilaaha illallaah, wa asyhadu anna Muhammadar Rasuulullaah. Allaahumma shalli 'alaa Sayyidinaa Muhammad, wa 'alaa aali Sayyidinaa Muhammad, kamaa shallaita 'alaa Sayyidinaa Ibraahiim, wa 'alaa aali Sayyidinaa Ibraahiim. Wa baarik 'alaa Sayyidinaa Muhammad, wa 'alaa aali Sayyidinaa Muhammad, kamaa baarakta 'alaa Sayyidinaa Ibraahiim, wa 'alaa aali Sayyidinaa Ibraahiim, fil 'aalamiina innaka hamiidum majiid.",
    translation: "Segala penghormatan, keberkahan, shalawat dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat Allah dan berkah-Nya tercurah kepadamu wahai Nabi. Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang shaleh. Aku bersaksi tidak ada Tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah berilah shalawat kepada junjungan kami Nabi Muhammad dan kepada keluarganya, sebagaimana Engkau telah memberi shalawat kepada junjungan kami Nabi Ibrahim dan kepada keluarganya. Dan berkahilah junjungan kami Nabi Muhammad dan kepada keluarganya, sebagaimana Engkau telah memberkahi Nabi Ibrahim dan kepada keluarganya. Di seluruh alam semesta, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
    notes: "Pada tasyahhud akhir dibaca lengkap sampai shalawat Ibrahimiyyah dengan posisi duduk tawarruk (kaki kiri diselipkan di bawah kaki kanan).",
  },
  {
    step: 9,
    title: "9. Mengucap Salam",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    latin: "Assalaamu 'alaikum wa rahmatullaah.",
    translation: "Semoga keselamatan dan rahmat Allah tercurah kepada kalian.",
    notes: "Memalingkan muka ke kanan hingga pipi terlihat dari belakang, kemudian ke kiri.",
  },
];

export const DOA_QUNUT = {
  title: "Doa Qunut Subuh",
  arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، وَأَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ",
  latin: "Allaahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a'thait, wa qinii syarra maa qadhait, fa innaka taqdhii wa laa yuqdhaa 'alaik, wa innahu laa yadzillu man waalait, wa laa ya'izzu man 'aadait, tabaarakta rabbanaa wa ta'aalait, falakal hamdu 'alaa maa qadhait, wa astaghfiruka wa atuubu ilaik, wa shallallaahu 'alaa sayyidinaa Muhammadinin-nabiyyil ummiyyi wa 'alaa aalihi wa shahbihi wa sallam.",
  translation: "Ya Allah tunjukilah aku sebagaimana orang yang telah Engkau beri petunjuk, berilah aku keselamatan sebagaimana orang yang telah Engkau beri keselamatan, peliharalah aku sebagaimana orang yang telah Engkau pelihara, berkahilah apa yang telah Engkau berikan kepadaku, lindungilah aku dari keburukan yang telah Engkau tetapkan, sesungguhnya Engkaulah yang menetapkan dan tiada seorang pun yang menetapkan atas-Mu. Sesungguhnya tidak akan terhina orang yang Engkau cintai, dan tidak akan mulia orang yang Engkau musuhi. Maha Berkah Engkau wahai Tuhan kami dan Maha Tinggi Engkau. Maka bagi-Mu segala puji atas apa yang telah Engkau tetapkan. Aku memohon ampun dan bertaubat kepada-Mu, dan semoga shalawat serta salam tercurah atas junjungan kami Nabi Muhammad yang ummi, beserta keluarga dan sahabatnya.",
  description: "Dibaca pada i'tidal rakaat kedua Shalat Subuh setelah bangkit dari ruku'.",
};

export const DZIKIR_AFTER_PRAYER: PrayerDzikirItem[] = [
  {
    id: "istighfar",
    title: "Istighfar",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    latin: "Astaghfirullaahal 'azhiimal ladzii laa ilaaha illaa huwal hayyul qayyuumu wa atuubu ilaih.",
    translation: "Aku memohon ampunan kepada Allah Yang Maha Agung, tiada Tuhan selain Dia Yang Maha Hidup lagi terus menerus mengurus makhluk-Nya, dan aku bertaubat kepada-Nya.",
    count: 3,
  },
  {
    id: "tauhid",
    title: "Tahlil & Doa Keselamatan",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu yuhyii wa yumiitu wa huwa 'alaa kulli syai-in qadiir. Allaahumma antas-salaamu wa minkas-salaamu tabaarakta yaa dzal jalaali wal ikraam.",
    translation: "Tiada Tuhan selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan puji-pujian, Dia yang menghidupkan dan mematikan, dan Dia Maha Kuasa atas segala sesuatu. Ya Allah, Engkaulah Maha Damai dan dari-Mu lah segala kedamaian, Maha Berkah Engkau wahai Pemilik Keagungan dan Kemuliaan.",
    count: 1,
  },
  {
    id: "tasbih",
    title: "Tasbih",
    arabic: "سُبْحَانَ اللَّهِ",
    latin: "Subhaanallaah",
    translation: "Maha Suci Allah.",
    count: 33,
  },
  {
    id: "tahmid",
    title: "Tahmid",
    arabic: "الْحَمْدُ لِلَّهِ",
    latin: "Alhamdulillaah",
    translation: "Segala puji bagi Allah.",
    count: 33,
  },
  {
    id: "takbir",
    title: "Takbir",
    arabic: "اللَّهُ أَكْبَرُ",
    latin: "Allahu Akbar",
    translation: "Allah Maha Besar.",
    count: 33,
  },
  {
    id: "ayat-kursi",
    title: "Ayat Kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    latin: "Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhu sinatuw-wa laa nawm, lahu maa fis-samaawaati wa maa fil ardh, man dzalladzii yasyfa'u 'indahuu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi syai-im min 'ilmihii illaa bimaa syaa-a, wasi'a kursiyyuhus-samaawaati wal ardha wa laa ya-uuduhuu hifzhuhumaa wa huwal 'aliyyul 'azhiim.",
    translation: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar.",
    count: 1,
  },
];
