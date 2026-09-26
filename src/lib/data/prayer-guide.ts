export interface PrayerNiat {
  id: string;
  name: string;
  category: "fardhu" | "sunnah";
  rakaat: number;
  arabic: string;
  latin: string;
  translation: string;
  description: string;
  source: string;
  grade: string;
  fadhilah: string;
}

export interface IftitahVersion {
  id: string;
  title: string;
  source: string;
  narrator: string;
  grade: string;
  arabic: string;
  latin: string;
  translation: string;
  description: string;
  fadhilah: string;
}

export interface PrayerStep {
  step: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  notes: string;
  source: string;
  grade: string;
  fadhilah: string;
  iftitahVersions?: IftitahVersion[];
}

export interface PrayerDzikirItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  count?: number;
  source: string;
  grade: string;
  fadhilah: string;
}

export const IFTITAH_VERSIONS: IftitahVersion[] = [
  {
    id: "allahumma-baid",
    title: "Versi 1: Allahumma Ba'id Baini",
    source: "Shahih Bukhari No. 744 & Shahih Muslim No. 598",
    narrator: "Abu Hurairah radhiyallahu 'anhu",
    grade: "Shahih (Muttafaq 'Alaih)",
    arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ",
    latin: "Allaahumma baa'id bainii wa baina khathaayaaya kamaa baa'adta bainal masyriqi wal maghrib. Allaahumma naqqinii min khathaayaaya kamaa yunaqqats-tsaubul abyadhu minad-danas. Allaahummaghsilnii min khathaayaaya bits-tsalji wal maa-i wal barad.",
    translation: "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahanku sebagaimana baju putih dibersihkan dari kotoran. Ya Allah, cucilah aku dari kesalahan-kesalahanku dengan salju, air, dan embun/es.",
    description: "Doa iftitah yang ditanyakan langsung oleh Abu Hurairah RA kepada Rasulullah ﷺ saat jeda diam antara takbir dan membaca Al-Fatihah.",
    fadhilah: "Memohon pengampunan dosa secara menyeluruh dan pembersihan hati sebelum bermunajat kepada Allah.",
  },
  {
    id: "wajjahtu",
    title: "Versi 2: Allahu Akbar Kabira & Wajjahtu Wajhiya",
    source: "Shahih Muslim No. 771 & Sunan Abu Dawud No. 760",
    narrator: "Ali bin Abi Thalib radhiyallahu 'anhu",
    grade: "Shahih",
    arabic: "اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً. وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلاَتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ",
    latin: "Allaahu akbaru kabiiraa walhamdu lillaahi katsiiraa, wa subhaanallaahi bukrataw wa-ashiilaa. Wajjahtu wajhiya lilladzii fatharas-samaawaati wal ardha haniifam muslimaw wamaa ana minal musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil 'aalamiin. Laa syariika lahu wa bidzaalika umirtu wa ana minal muslimiin.",
    translation: "Allah Maha Besar lagi sempurna kebesaran-Nya, segala puji bagi Allah dengan pujian yang banyak. Maha Suci Allah sepanjang pagi dan petang. Aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan lurus dan berserah diri, dan aku bukanlah termasuk orang musyrik. Sesungguhnya shalatku, ibadahku, hidupku dan matiku hanyalah untuk Allah Tuhan semesta alam, tidak ada sekutu bagi-Nya dan dengan itulah aku diperintahkan dan aku termasuk orang muslim.",
    description: "Kombinasi ucapan takbir/tahmid sahabat yang dipuji Nabi ﷺ dan doa pembuka shalat Nabi ﷺ saat berdiri shalat.",
    fadhilah: "Menegaskan komitmen tauhid murni (millah Ibrahim) dan penyerahan seluruh hidup dan mati hanya untuk Allah SWT.",
  },
  {
    id: "subhanakallahumma",
    title: "Versi 3: Subhanakallahumma Wa Bihamdika",
    source: "Sunan Abu Dawud No. 775, At-Tirmidzi No. 242, Ibnu Majah No. 804",
    narrator: "Aisyah radhiyallahu 'anha & Umar bin Al-Khaththab radhiyallahu 'anhu",
    grade: "Shahih",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلاَ إِلَهَ غَيْرُكَ",
    latin: "Subhaanakallaahumma wa bihamdika, wa tabaarakasmuka, wa ta'aalaa jadduka, wa laa ilaaha ghairuk.",
    translation: "Maha Suci Engkau ya Allah, dan dengan memuji-Mu. Maha Berkah nama-Mu, Maha Tinggi keagungan-Mu, dan tiada sesembahan yang berhak disembah selain Engkau.",
    description: "Doa iftitah yang ringkas dan padat, sering dibaca oleh Umar bin Khattab RA secara jahr (dikeraskan) di hadapan makmum untuk mengajari mereka.",
    fadhilah: "Pujian tertinggi pensucian asma dan keagungan Allah SWT sebelum membaca firman-Nya.",
  },
];

export const PRAYER_NIAT_LIST: PrayerNiat[] = [
  {
    id: "subuh",
    name: "Shalat Subuh",
    category: "fardhu",
    rakaat: 2,
    arabic: "أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhash-shubhi rak'ataini mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 2 rakaat pada waktu fajar shadiq hingga sebelum terbit matahari.",
    source: "QS. Al-Isra: 78 & Shahih Muslim No. 612",
    grade: "Fardhu 'Ain",
    fadhilah: "Disaksikan oleh para malaikat malam dan siang, serta dijanjikan perlindungan Allah sepanjang hari.",
  },
  {
    id: "dzuhur",
    name: "Shalat Dzuhur",
    category: "fardhu",
    rakaat: 4,
    arabic: "أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhazh-zhuhri arba'a raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Dzuhur empat rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 4 rakaat setelah matahari tergelincir ke barat hingga bayangan sama panjang.",
    source: "HR. Bukhari No. 541 & Muslim No. 614",
    grade: "Fardhu 'Ain",
    fadhilah: "Waktu dibukanya pintu-pintu langit dan saat yang baik untuk naiknya amal shaleh.",
  },
  {
    id: "ashar",
    name: "Shalat Ashar",
    category: "fardhu",
    rakaat: 4,
    arabic: "أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal 'ashri arba'a raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 4 rakaat ketika bayangan benda melebihi panjang aslinya hingga menjelang sunset.",
    source: "QS. Al-Baqarah: 238 (Shalat Wustha) & HR. Bukhari No. 553",
    grade: "Fardhu 'Ain",
    fadhilah: "Barangsiapa memelihara shalat Ashar dijamin terhindar dari siksa neraka dan meraih surga.",
  },
  {
    id: "maghrib",
    name: "Shalat Maghrib",
    category: "fardhu",
    rakaat: 3,
    arabic: "أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal maghribi tsalaatsa raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 3 rakaat setelah terbenam matahari hingga hilangnya mega merah (syafaq ahmar).",
    source: "HR. Muslim No. 612",
    grade: "Fardhu 'Ain",
    fadhilah: "Awal pergantian malam dalam penanggalan Islam yang penuh berkah.",
  },
  {
    id: "isya",
    name: "Shalat Isya",
    category: "fardhu",
    rakaat: 4,
    arabic: "أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى",
    latin: "Ushalli fardhal 'isyaa-i arba'a raka'aatin mustaqbilal qiblati adaa-an lillaahi ta'aala.",
    translation: "Aku berniat shalat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala.",
    description: "Dikerjakan 4 rakaat setelah hilangnya mega merah hingga sepertiga malam.",
    source: "HR. Muslim No. 656",
    grade: "Fardhu 'Ain",
    fadhilah: "Shalat Isya berjamaah pahalanya setara dengan shalat separuh malam suntuk.",
  },
  {
    id: "dhuha",
    name: "Shalat Dhuha",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ الضُّحَى رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatadh-dhuhaa rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Dhuha dua rakaat karena Allah Ta'ala.",
    description: "Dikerjakan 2 s.d. 8 rakaat saat matahari naik sepenggalah hingga menjelang dzuhur.",
    source: "HR. Muslim No. 720 (dari Abu Dzar RA)",
    grade: "Sunnah Muakkadah",
    fadhilah: "Mencukupi sedekah atas 360 persendian tubuh manusia setiap harinya dan mendatangkan kelapangan rezeki.",
  },
  {
    id: "tahajjud",
    name: "Shalat Tahajjud (Qiyamul Lail)",
    category: "sunnah",
    rakaat: 2,
    arabic: "أُصَلِّي سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى",
    latin: "Ushalli sunnatat-tahajjudi rak'ataini lillaahi ta'aala.",
    translation: "Aku niat shalat sunnah Tahajjud dua rakaat karena Allah Ta'ala.",
    description: "Dikerjakan di malam hari setelah tidur, terutama pada sepertiga malam terakhir.",
    source: "QS. Al-Isra: 79 & HR. Bukhari No. 1145",
    grade: "Sunnah Muakkadah",
    fadhilah: "Meraih maqam terpuji (Maqaman Mahmuda), doa paling diijabah saat Allah turun ke langit dunia.",
  },
];

export const PRAYER_STEPS: PrayerStep[] = [
  {
    step: 1,
    title: "1. Niat & Takbiratul Ihram",
    arabic: "اللَّهُ أَكْبَرُ",
    latin: "Allahu Akbar",
    translation: "Allah Maha Besar.",
    notes: "Mengangkat kedua tangan sejajar daun telinga/bahu sambil berniat di dalam hati dan melafalkan takbir.",
    source: "HR. Bukhari No. 735 & Muslim No. 390 (dari Malik bin Al-Huwairits RA)",
    grade: "Rukun Qauli & Rukun Fi'li",
    fadhilah: "Membuka shalat dan mengharamkan seluruh perkataan/gerakan di luar shalat.",
  },
  {
    step: 2,
    title: "2. Membaca Doa Iftitah (Sunnah)",
    arabic: IFTITAH_VERSIONS[0].arabic,
    latin: IFTITAH_VERSIONS[0].latin,
    translation: IFTITAH_VERSIONS[0].translation,
    notes: "Dibaca setelah takbiratul ihram pada rakaat pertama secara pelan (sirr). Terdapat beberapa riwayat shahih yang bisa dipilih.",
    source: "HR. Bukhari No. 744, HR. Muslim No. 771, HR. Abu Dawud No. 775",
    grade: "Sunnah Hai'ah",
    fadhilah: "Memuji keagungan Allah dan menyucikan hati dari noda dosa sebelum membaca Kalamullah.",
    iftitahVersions: IFTITAH_VERSIONS,
  },
  {
    step: 3,
    title: "3. Membaca Surat Al-Fatihah & Ayat Al-Quran",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ. آمِينَ",
    latin: "Bismillaahir-rahmaanir-rahiim. Alhamdu lillaahi rabbil 'aalamiin. Ar-rahmaanir-rahiim. Maaliki yawmid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinash-shiraathal mustaqiim. Shiraathal ladziina an'amta 'alaihim ghairil maghdhuubi 'alaihim waladh-dhaalliin. Aamiin.",
    translation: "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Tunjukilah kami jalan yang lurus. Yaitu jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat. Kabulkanlah doa kami.",
    notes: "Membaca Al-Fatihah adalah rukun wajib dalam setiap rakaat shalat (tidak sah shalat tanpa Al-Fatihah).",
    source: "HR. Bukhari No. 756 & Muslim No. 394 (dari Ubadah bin Shamit RA)",
    grade: "Rukun Qauli Wajib",
    fadhilah: "Dialog langsung antara hamba dengan Allah (Hadits Qudsi riwayat Muslim No. 395).",
  },
  {
    step: 4,
    title: "4. Ruku' & Bacaannya (Disertai Thuma'ninah)",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
    latin: "Subhaana rabbiyal 'azhiimi wa bihamdih (3x)",
    translation: "Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya (3 kali).",
    notes: "Membungkukkan punggung rata hingga sejajar dengan kepala, kedua tangan memegang lutut disertai ketenangan (thuma'ninah).",
    source: "HR. Abu Dawud No. 870, At-Tirmidzi No. 261, Ahmad",
    grade: "Rukun Fi'li Wajib",
    fadhilah: "Wujud ketundukan fisik yang mutlak kepada Sang Pencipta Yang Maha Agung.",
  },
  {
    step: 5,
    title: "5. I'tidal & Doa Bangkit dari Ruku'",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
    latin: "Sami'allaahu liman hamidah. Rabbanaa lakal hamdu mil'us-samaawaati wa mil'ul ardhi wa mil'u maa syi'ta min syai-in ba'du.",
    translation: "Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji sepenuh langit dan sepenuh bumi, dan sepenuh apa yang Engkau kehendaki sesudah itu.",
    notes: "Berdiri tegak lurus kembali setelah ruku' dengan tenang (thuma'ninah).",
    source: "HR. Bukhari No. 795 & Muslim No. 476",
    grade: "Rukun Fi'li Wajib",
    fadhilah: "Para malaikat berebut mencatat pahala orang yang memuji Allah saat bangkit dari ruku' (HR. Bukhari No. 799).",
  },
  {
    step: 6,
    title: "6. Sujud & Bacaannya (7 Anggota Badan)",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
    latin: "Subhaana rabbiyal a'laa wa bihamdih (3x)",
    translation: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya (3 kali).",
    notes: "Menempelkan 7 anggota sujud ke lantai: dahi+hidung, 2 telapak tangan, 2 lutut, dan jemari 2 kaki menghadap kiblat.",
    source: "HR. Muslim No. 482 & Abu Dawud No. 871",
    grade: "Rukun Fi'li Wajib",
    fadhilah: "Posisi di mana hamba berada paling dekat dengan Rabb-nya; saat yang mustajab untuk berdoa (HR. Muslim No. 482).",
  },
  {
    step: 7,
    title: "7. Duduk di Antara Dua Sujud (Iftirasy)",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    latin: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
    translation: "Ya Tuhanku ampunilah aku, rahmatilah aku, cukupkanlah kekuranganku, angkatlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah aku.",
    notes: "Duduk di atas telapak kaki kiri (iftirasy), telapak kaki kanan ditegakkan, punggung tegak dan tenang.",
    source: "HR. Abu Dawud No. 850, At-Tirmidzi No. 284, Ibnu Majah No. 898 (dari Ibnu Abbas RA)",
    grade: "Rukun Fi'li Wajib",
    fadhilah: "Merangkum 8 permohonan hidup paling esensial: ampunan, rahmat, kecukupan, derajat, rezeki, hidayah, kesehatan, dan maaf.",
  },
  {
    step: 8,
    title: "8. Tasyahhud & Shalawat Ibrahimiyyah",
    arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ، وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    latin: "Attahiyyaatul mubaarakaatush-shalawaatuth-thayyibaatu lillaah. Assalaamu 'alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahish-shaalihiin. Asyhadu allaa ilaaha illallaah, wa asyhadu anna Muhammadar Rasuulullaah. Allaahumma shalli 'alaa Sayyidinaa Muhammad, wa 'alaa aali Sayyidinaa Muhammad, kamaa shallaita 'alaa Sayyidinaa Ibraahiim, wa 'alaa aali Sayyidinaa Ibraahiim. Wa baarik 'alaa Sayyidinaa Muhammad, wa 'alaa aali Sayyidinaa Muhammad, kamaa baarakta 'alaa Sayyidinaa Ibraahiim, wa 'alaa aali Sayyidinaa Ibraahiim, fil 'aalamiina innaka hamiidum majiid.",
    translation: "Segala penghormatan, keberkahan, shalawat dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat Allah dan berkah-Nya tercurah kepadamu wahai Nabi. Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang shaleh. Aku bersaksi tidak ada Tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah berilah shalawat kepada Nabi Muhammad dan keluarganya...",
    notes: "Pada tasyahhud akhir dibaca lengkap sampai shalawat dengan posisi duduk tawarruk.",
    source: "Shahih Bukhari No. 6357 & Shahih Muslim No. 406 (dari Ka'ab bin 'Ujrah RA)",
    grade: "Rukun Qauli Wajib",
    fadhilah: "Ucapan salam penghormatan yang sampai kepada seluruh hamba Allah yang shaleh di langit dan di bumi.",
  },
  {
    step: 9,
    title: "9. Mengucap Salam (Penutup Shalat)",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    latin: "Assalaamu 'alaikum wa rahmatullaah.",
    translation: "Semoga keselamatan dan rahmat Allah tercurah kepada kalian.",
    notes: "Memalingkan kepala ke kanan hingga pipi terlihat dari belakang, kemudian menoleh ke kiri.",
    source: "HR. Muslim No. 582 & Abu Dawud No. 996 (dari Abdullah bin Mas'ud RA)",
    grade: "Rukun Qauli Wajib (Salam Pertama)",
    fadhilah: "Pelepas keharaman ibadah shalat dan doa keselamatan bagi seluruh makhluk di kanan dan kiri.",
  },
];

export const DOA_QUNUT = {
  title: "Doa Qunut Subuh",
  source: "Sunan Abu Dawud No. 1425, At-Tirmidzi No. 464, An-Nasa'i No. 1746",
  narrator: "Al-Hasan bin Ali bin Abi Thalib radhiyallahu 'anhuma",
  grade: "Hadits Hasan Shahih",
  arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، وَأَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ",
  latin: "Allaahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a'thait, wa qinii syarra maa qadhait, fa innaka taqdhii wa laa yuqdhaa 'alaik, wa innahu laa yadzillu man waalait, wa laa ya'izzu man 'aadait, tabaarakta rabbanaa wa ta'aalait, falakal hamdu 'alaa maa qadhait, wa astaghfiruka wa atuubu ilaik, wa shallallaahu 'alaa sayyidinaa Muhammadinin-nabiyyil ummiyyi wa 'alaa aalihi wa shahbihi wa sallam.",
  translation: "Ya Allah tunjukilah aku sebagaimana orang yang telah Engkau beri petunjuk, berilah aku keselamatan sebagaimana orang yang telah Engkau beri keselamatan, peliharalah aku sebagaimana orang yang telah Engkau pelihara, berkahilah apa yang telah Engkau berikan kepadaku, lindungilah aku dari keburukan yang telah Engkau tetapkan, sesungguhnya Engkaulah yang menetapkan dan tiada seorang pun yang menetapkan atas-Mu. Sesungguhnya tidak akan terhina orang yang Engkau cintai, dan tidak akan mulia orang yang Engkau musuhi. Maha Berkah Engkau wahai Tuhan kami dan Maha Tinggi Engkau. Maka bagi-Mu segala puji atas apa yang telah Engkau tetapkan. Aku memohon ampun dan bertaubat kepada-Mu, dan semoga shalawat serta salam tercurah atas junjungan kami Nabi Muhammad yang ummi, beserta keluarga dan sahabatnya.",
  description: "Diajarkan langsung oleh Rasulullah ﷺ kepada cucu beliau Al-Hasan RA. Dibaca pada i'tidal rakaat kedua Shalat Subuh (Sunnah Ab'adh dalam Madzhab Syafi'i).",
  fadhilah: "Doa memohon 5 penjagaan ilahi: Hidayah iman, kesehatan 'afiyah lahir-batin, perlindungan wali Allah, keberkahan rizki, dan penjagaan dari takdir buruk.",
};

export const DZIKIR_AFTER_PRAYER: PrayerDzikirItem[] = [
  {
    id: "istighfar",
    title: "1. Istighfar 3x",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    latin: "Astaghfirullaahal 'azhiimal ladzii laa ilaaha illaa huwal hayyul qayyuumu wa atuubu ilaih (3x).",
    translation: "Aku memohon ampunan kepada Allah Yang Maha Agung, tiada Tuhan selain Dia Yang Maha Hidup lagi terus menerus mengurus makhluk-Nya, dan aku bertaubat kepada-Nya.",
    count: 3,
    source: "Shahih Muslim No. 591 (dari Tsauban RA)",
    grade: "Shahih",
    fadhilah: "Menghapus kekurangan dan kekurangkhusyukan selama pelaksanaan shalat.",
  },
  {
    id: "tauhid",
    title: "2. Tahlil & Doa Keselamatan (Allahumma Antas Salam)",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu yuhyii wa yumiitu wa huwa 'alaa kulli syai-in qadiir. Allaahumma antas-salaamu wa minkas-salaamu tabaarakta yaa dzal jalaali wal ikraam.",
    translation: "Tiada Tuhan selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan puji-pujian, Dia yang menghidupkan dan mematikan, dan Dia Maha Kuasa atas segala sesuatu. Ya Allah, Engkaulah Maha Damai dan dari-Mu lah segala kedamaian, Maha Berkah Engkau wahai Pemilik Keagungan dan Kemuliaan.",
    count: 1,
    source: "Shahih Muslim No. 592 & Shahih Bukhari No. 844",
    grade: "Shahih",
    fadhilah: "Pujian tauhid dan memohon keberkahan keselamatan dari Pemilik Kedamaian.",
  },
  {
    id: "tasbih",
    title: "3. Tasbih 33x (Subhanallah)",
    arabic: "سُبْحَانَ اللَّهِ",
    latin: "Subhaanallaah (33x)",
    translation: "Maha Suci Allah.",
    count: 33,
    source: "Shahih Muslim No. 597 (dari Abu Hurairah RA)",
    grade: "Shahih",
    fadhilah: "Mensucikan Allah dari segala kekurangan makhluk.",
  },
  {
    id: "tahmid",
    title: "4. Tahmid 33x (Alhamdulillah)",
    arabic: "الْحَمْدُ لِلَّهِ",
    latin: "Alhamdulillaah (33x)",
    translation: "Segala puji bagi Allah.",
    count: 33,
    source: "Shahih Muslim No. 597 (dari Abu Hurairah RA)",
    grade: "Shahih",
    fadhilah: "Mengisi penuh timbangan kebaikan (Mizan) di hari kiamat.",
  },
  {
    id: "takbir",
    title: "5. Takbir 33x (Allahu Akbar)",
    arabic: "اللَّهُ أَكْبَرُ",
    latin: "Allahu Akbar (33x)",
    translation: "Allah Maha Besar.",
    count: 33,
    source: "Shahih Muslim No. 597 (dari Abu Hurairah RA)",
    grade: "Shahih",
    fadhilah: "Mengagungkan kebesaran Allah di atas segalanya.",
  },
  {
    id: "ayat-kursi",
    title: "6. Membaca Ayat Kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    latin: "Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhu sinatuw-wa laa nawm, lahu maa fis-samaawaati wa maa fil ardh, man dzalladzii yasyfa'u 'indahuu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi syai-im min 'ilmihii illaa bimaa syaa-a, wasi'a kursiyyuhus-samaawaati wal ardha wa laa ya-uuduhuu hifzhuhumaa wa huwal 'aliyyul 'azhiim.",
    translation: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus menerus mengurus makhluk-Nya...",
    count: 1,
    source: "Sunan An-Nasa'i (As-Sunan Al-Kubra No. 9848) & Thabrani",
    grade: "Shahih (Dishahihkan Ibnu Hibban & Al-Albani)",
    fadhilah: "Barangsiapa membaca Ayat Kursi setiap selesai shalat fardhu, tidak ada yang menghalanginya masuk surga selain kematian (HR. An-Nasa'i).",
  },
];
