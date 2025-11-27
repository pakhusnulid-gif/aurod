export interface AurodListItem {
  number?: number;
  latin?: string;
  arabic?: string;
  meaning?: string;
}

export interface AurodSection {
  id: number;
  title: string;
  body?: string[];
  notes?: string | string[];
  arabic?: string;
  latin?: string;
  meaning?: string;
  list?: (string | AurodListItem)[];
}

export const aurodData: AurodSection[] = [
  {
    id: 1,
    title: "PEMBUKAAN",
    body: [
      "Bismillaahirrohmaanirrohiim",
      "Alhamdulillaahi Robbil 'aalamiin",
      "Kitab Aurod ini selesai disusun berkat pertolongan Allah. Semoga Kitab ini bisa membantu kita untuk bisa lebih mensyukuri ni'mat Allah dan mendekatkan diri pada-Nya.",
      "Kitab Aurod kecil ini memuat tiga amalan yang ringan tapi jika diamalkan dengan Ikhlas dan Istiqomah insya Allah menjadi sebab kita bahagia dunia akhirat.",
      "Semoga kitab aurod ini bisa melebur dosa-dosa kami, Orang tua kami, Guru-guru kami dan arwah muslimin dan muslimat."
    ],
    notes: "Bagi pengamal Aurod diwajibkan secara pribadi melakukan sholat witir minimal satu Roka'at sebagai pembuka sholat malam seperti yang dilakukan Nabi Muhammad di dalam kitab Shohih Bukhori."
  },
  {
    id: 2,
    title: "AUROD I ( ANJURAN )",
    notes: [
      "Fadhilah: Untuk kesehatan jasmani dan Rohani, terhindar dari bahaya, panjang umur, dan mendapat syafa'at Nabi.",
      "Instruksi: Dibaca setelah subuh dan Maghrib (7x). Hitungan 1-3 tangan kanan di dada, hitungan 4-7 dilepas."
    ],
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. لَقَدْ جَاءَكُمْ رَسُوْلٌ مِّنْ اَنْفُسِكُمْ عَزِيْزٌ عَلَيْهِ مَا عَنِتُّمْ حَرِيْصٌ عَلَيْكُمْ بِالْمُؤْمِنِيْنَ رَءُوْفٌ رَّحِيْمٌ. فَاِنْ تَوَلَّوْا فَقُلْ حَسْبِيَ اللّٰهُ لَا اِلٰهَ اِلَّا هُوَ ۗ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ",
    latin: "Bismillaahirohmaanirrohiim. Laqod jaa-akum rosuulum min anfusikum 'aziizun 'alaihi maa 'anittum hariishun 'alaikum bil mu'miniina ro-uufur rohiim. Fa in tawallau faqul hasbiyallohu laa ilaaha illaa huwa 'alaihi tawakkaltu wa huwa robbul 'arsyil 'azhiim"
  },
  {
    id: 3,
    title: "AUROD II ( ANJURAN )",
    notes: [
      "Fadhilah: Untuk kelancaran rizqi.",
      "Instruksi: Dibaca sehari semalam 7x, lebih afdhol dibaca 7x setelah Sholat fardhu."
    ],
    arabic: "فَقُلْ حَسْبِيَ اللّٰهُ لَا اِلٰهَ اِلَّا هُوَ ۗ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ",
    latin: "Faqul hasbiyallohu laa ilaaha illaa huwa 'alaihi tawakkaltu wa huwa robbul 'arsyil 'adziim.",
    meaning: "Artinya : Maka katakanlah Allah dzat yang mencukupiku, tiada Tuhan selain Dia hanya kepadanya aku berserah diri. Dia (Allah) yang memiliki 'Arsy' yang agung."
  },
  {
    id: 4,
    title: "AUROD III ( LAZIMAH / WAJIB )",
    notes: "Aurod ini dibaca pagi dan sore.",
    list: [
      {
        number: 1,
        latin: "Astaghfirullah. (100x)",
        arabic: "اَسْتَغْفِرُ اللهَ"
      },
      {
        number: 2,
        latin: "Sholawat Fatih (100x) atau Sholawat Fatih (10x) kemudian Sholawat biasa (90x)."
      }
    ]
  },
  {
    id: 5,
    title: "SHOLAWAT FATIH",
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ",
    latin: "Allahumma sholla 'ala sayyidina Muhammadinil faatihi lima Ughliqo Wal Khotimi lima sabaqo naashiril haqqi wal haadi ila shirootikal mustaqiim wa 'ala alihi haqqo qodrihi wamiqdarihil 'adziim.",
    meaning: "Artinya : Semoga Allah melimpahkan rahmat ta'dzimnya atas Nabi Muhammad (Beliau) adalah orang yang membuka sesuatu yang tertutup... Dan semoga rahmat juga tercurahkan atas keluarga beliau dengan haq kedudukan dan derajad Beliau yang agung"
  },
  {
    id: 6,
    title: "LANJUTAN AUROD III",
    list: [
      {
        number: 3,
        latin: "Laa ilaaha illallah (100x)",
        arabic: "لَا اِلَهَ اِلَّا اللهُ"
      }
    ],
    notes: [
      "Fadhilah:",
      "- Untuk kebahagiaan khususnya akhirat.",
      "- Dijamin aman dari alam barzah sampai akhirat.",
      "- Masuk surga tanpa hisab (Insya Allah).",
      "- Meninggal dalam keadaan husnul khotimah.",
      "- Diampuni dosa-dosa terdahulu dan terakhir."
    ]
  },
  {
    id: 7,
    title: "TIAP HARI WAJIB & HAILALAH JUM'AT",
    notes: [
      "Fadhilah: Kuburnya diberi pintu Tembus pada kubur Nabi Muhammad SAW.",
      "Instruksi: Dianjurkan setiap hari Jum'at ba'da Ashar berkumpul dan membaca:"
    ],
    list: [
      { number: 1, latin: "Al-Fatihah" },
      { number: 2, latin: "Istighfar (30x)", arabic: "اَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِي لَا اِلَهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ", meaning: "Aku memohon ampun kepada Allah yang maha agung..." },
      { number: 3, latin: "Sholawat Fatih (50x)" },
      { number: 4, latin: "Laa ilaaha illallah (500x atau 1000x)", arabic: "لَا اِلَهَ اِلَّا اللهُ" },
      { number: 5, latin: "Doa Penutup (Lengkap)", arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تَكُوْنُ لَكَ رِضَاءً وَلِحَقِّهِ أَدَاءً" }
    ]
  },
  {
    id: 8,
    title: "DO'A",
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ الْحَبِيْبِ الْعَالِي الْقَدْرِ الْعَظِيْمِ الْجَاهِ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
    latin: "Allahumma sholli 'ala sayyidinaa Muhammadin annabiyyil ummiyyil habiibil 'alil qodaril 'adhiimil jaahi wa 'alaa aalihi washohbihi wasallim",
    meaning: "Artinya : Yaa Allah berikanlah Rahmat keagungan atas baginda kami Nabi Muhammad SAW..."
  },
  {
    id: 9,
    title: "SILSILAH SANAD",
    notes: "SILSILAH SANAD AUROD WIRID LAZIMAH THORIQOH PONPES AN-NIDZOMIYYAH TUBAN",
    list: [
      "1. KH. Ahmad Musyaffa' bin Ma'sum dari",
      "2. Syaikh Abdurrozaq bin Imam",
      "3. Syaikh Ahmad bin Ali",
      "4. Syaikh Ibrohim bin Abdullah Al-Kawakhi",
      "5. Syaikh Abil Abbas Ahmad As-Sukarii Al-Anshori",
      "6. Syaikh Ahmad Al-Maghribi Al-khojroji Al-Maghribi",
      "7. Syaikh Ahmad Al-Abdalawi",
      "8. Syaikh Ali At-Tamasin",
      "9. Nabi Muhammad SAW (Yaqdhoh)"
    ],
    body: ["Tertanda: KH. AHMAD MUSYAFFA' FAZ (MUNJIZ)"]
  }
];
