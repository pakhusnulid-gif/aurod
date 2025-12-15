export interface YasinAyat {
  id: number | string;
  type: "ayat";
  nomor_ayat: number;
  arabic: string;
  instruction?: string;
  wirid_instruction?: string;
  wirid_arabic?: string;
}

export interface YasinSisipan {
  id: string;
  type: "sisipan";
  position: string;
  title: string;
  repeat: string;
  arabic: string;
  translation: string;
  doa_translation?: string;
  sholawat_translation?: string;
}

export interface YasinAyatParsial {
  id: string | number;
  type: "ayat_parsial";
  nomor_ayat: number;
  bagian: "awal" | "akhir";
  arabic: string;
  translation?: string;
}

export type YasinContent = YasinAyat | YasinSisipan | YasinAyatParsial;

export const yasinFadhilahData: YasinContent[] = [
  { id: 1, type: "ayat", nomor_ayat: 1, arabic: "يس", instruction: "Dibaca 7x atau 33x" },

  // Expanded quran_block range 2-9
  { id: 2, type: "ayat", nomor_ayat: 2, arabic: "وَٱلْقُرْءَانِ ٱلْحَكِيمِ" },
  { id: 3, type: "ayat", nomor_ayat: 3, arabic: "إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ" },
  { id: 4, type: "ayat", nomor_ayat: 4, arabic: "عَلَىٰ صِرَٰطٍ مُّسْتَقِيمٍ" },
  { id: 5, type: "ayat", nomor_ayat: 5, arabic: "تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ" },
  { id: 6, type: "ayat", nomor_ayat: 6, arabic: "لِتُنذِرَ قَوْمًا مَّآ أُنذِرَ ءَابَآؤُهُمْ فَهُمْ غَٰفِلُونَ" },
  { id: 7, type: "ayat", nomor_ayat: 7, arabic: "لَقَدْ حَقَّ ٱلْقَوْلُ عَلَىٰٓ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ" },
  { id: 8, type: "ayat", nomor_ayat: 8, arabic: "إِنَّا جَعَلْنَا فِىٓ أَعْنَٰقِهِمْ أَغْلَٰلًا فَهِىَ إِلَى ٱلْأَذْقَانِ فَهُم مُّقْمَحُونَ" },
  { id: 9, type: "ayat", nomor_ayat: 9, arabic: "وَجَعَلْنَا مِنۢ بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَٰهُمْ فَهُمْ لَا يُبْصِرُونَ" },

  {
    id: "sisipan_1", type: "sisipan", position: "Setelah Ayat 9", title: "Doa Nurul Sirri & Sholawat Fatih", repeat: "Diulang 7x",
    arabic: "(اَللَّهُمَّ يَا مَنْ نُوْرُهُ فِي سِرِّهِ وَسِرُّهُ فِي خَلْقِهِ، اِحْفَظِيْ مِنْ أَعْيُنِ النَّاظِرِينَ الْحَاسِدِينَ وَالْبَاغِينَ، كَمَا حَفَظْتَ الرُّوْحَ فِي الْجَسَدِ، إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ) ×٣\n\n(اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ ۨالْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ، نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ، وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ) ×٣",
    translation: "Wahai Dzat yang cahayanya di dalam rahasianya dan rahasianya di dalam makhluknya, lindungilah aku dari mata orang-orang yang melihat, yang hasad dan yang zalim, sebagaimana Engkau melindungi ruh di dalam jasad, sesungguhnya Engkau Maha Kuasa atas segala sesuatu.",
    doa_translation: "Wahai Dzat yang cahayanya di dalam rahasianya dan rahasianya di dalam makhluknya, lindungilah aku dari mata orang-orang yang melihat, yang hasad dan yang zalim, sebagaimana Engkau melindungi ruh di dalam jasad, sesungguhnya Engkau Maha Kuasa atas segala sesuatu.",
    sholawat_translation: "Semoga Allah melimpahkan rahmat ta'dzimnya atas Nabi Muhammad (Beliau) adalah orang yang membuka sesuatu yang tertutup dan penutup bagi apa yang telah lalu, pembela kebenaran dengan kebenaran, dan pemberi petunjuk ke jalan-Mu yang lurus. Dan semoga rahmat juga tercurahkan atas keluarga beliau dengan haq kedudukan dan derajad Beliau yang agung"
  },

  // Expanded quran_block range 10-27
  { id: 10, type: "ayat", nomor_ayat: 10, arabic: "وَسَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ" },
  { id: 11, type: "ayat", nomor_ayat: 11, arabic: "إِنَّمَا تُنذِرُ مَنِ ٱتَّبَعَ ٱلذِّكْرَ وَخَشِىَ ٱلرَّحْمَٰنَ بِٱلْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍ وَأَجْرٍ كَرِيمٍ" },
  { id: 12, type: "ayat", nomor_ayat: 12, arabic: "إِنَّا نَحْنُ نُحْىِ ٱلْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا۟ وَءَاثَٰرَهُمْ ۚ وَكُلَّ شَىْءٍ أَحْصَيْنَٰهُ فِىٓ إِمَامٍ مُّبِينٍ" },
  { id: 13, type: "ayat", nomor_ayat: 13, arabic: "وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ" },
  { id: 14, type: "ayat", nomor_ayat: 14, arabic: "إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ" },
  { id: 15, type: "ayat", nomor_ayat: 15, arabic: "قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ" },
  { id: 16, type: "ayat", nomor_ayat: 16, arabic: "قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ" },
  { id: 17, type: "ayat", nomor_ayat: 17, arabic: "وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَٰغُ ٱلْمُبِينُ" },
  { id: 18, type: "ayat", nomor_ayat: 18, arabic: "قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ" },
  { id: 19, type: "ayat", nomor_ayat: 19, arabic: "قَالُوا۟ طَٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ" },
  { id: 20, type: "ayat", nomor_ayat: 20, arabic: "وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ" },
  { id: 21, type: "ayat", nomor_ayat: 21, arabic: "ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ" },
  { id: 22, type: "ayat", nomor_ayat: 22, arabic: "وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ" },
  { id: 23, type: "ayat", nomor_ayat: 23, arabic: "ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّى شَفَٰعَتُهُمْ شَيْـًٔا وَلَا يُنقِذُونِ" },
  { id: 24, type: "ayat", nomor_ayat: 24, arabic: "إِنِّىٓ إِذًا لَّفِى ضَلَٰلٍ مُّبِينٍ" },
  { id: 25, type: "ayat", nomor_ayat: 25, arabic: "إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ" },
  { id: 26, type: "ayat", nomor_ayat: 26, arabic: "قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَٰلَيْتَ قَوْمِى يَعْلَمُونَ" },
  { id: 27, type: "ayat", nomor_ayat: 27, arabic: "بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ" },

  {
    id: "sisipan_2", type: "sisipan", position: "Setelah Ayat 27", title: "Doa Qodho Hajat", repeat: "Dibaca 1x",
    arabic: "( اَللَّهُمَّ أَكْرِمْنِي بِقَضَاءِ حَاجَتِي وَأَلْزِمْنِي بِطَاعَتِكَ )\n\nLalu sebutkan hajatnya",
    translation: "Yaa Allah mulyakanlah aku dengan mengijabahi do'aku dan tetapkanlah aku untuk selalu taat kepadamu."
  },

  // Expanded quran_block range 28-37
  { id: 28, type: "ayat", nomor_ayat: 28, arabic: "۞ وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ" },
  { id: 29, type: "ayat", nomor_ayat: 29, arabic: "إِن كَانَتْ إِلَّا صَيْحَةً وَٰحِدَةً فَإِذَا هُمْ خَٰمِدُونَ" },
  { id: 30, type: "ayat", nomor_ayat: 30, arabic: "يَٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ" },
  { id: 31, type: "ayat", nomor_ayat: 31, arabic: "أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ" },
  { id: 32, type: "ayat", nomor_ayat: 32, arabic: "وَإِن كُلٌّ لَّمَّا جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ" },
  { id: 33, type: "ayat", nomor_ayat: 33, arabic: "وَءَايَةٌ لَّهُمُ ٱلْأَرْضُ ٱلْمَيْتَةُ أَحْيَيْنَٰهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ" },
  { id: 34, type: "ayat", nomor_ayat: 34, arabic: "وَجَعَلْنَا فِيهَا جَنَّٰتٍ مِّن نَّخِيلٍ وَأَعْنَٰبٍ وَفَجَّرْنَا فِيهَا مِنَ ٱلْعُيُونِ" },
  { id: 35, type: "ayat", nomor_ayat: 35, arabic: "لِيَأْكُلُوا۟ مِن ثَمَرِهِۦ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ" },
  { id: 36, type: "ayat", nomor_ayat: 36, arabic: "سُبْحَٰنَ ٱلَّذِى خَلَقَ ٱلْأَزْوَٰجَ كُلَّهَا مِمَّا تُنۢبِتُ ٱلْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ" },
  { id: 37, type: "ayat", nomor_ayat: 37, arabic: "وَءَايَةٌ لَّهُمُ ٱلَّيْلُ نَسْلَخُ مِنْهُ ٱلنَّهَارَ فَإِذَا هُم مُّظْلِمُونَ" },

  {
    id: 38, type: "ayat", nomor_ayat: 38,
    arabic: "وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ",
    wirid_instruction: "Ulangi bagian 'Dzalika taqdirul...' sebanyak 41x",
    wirid_arabic: "ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ ×٤١"
  },

  {
    id: "sisipan_3", type: "sisipan", position: "Setelah Ayat 38", title: "Doa Mohon Kecukupan", repeat: "3x (Doa) & 1x (Sholawat)",
    arabic: "(اَللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ الْوَاسِعِ وَجُوْدِكَ السَّابِغِ مَا تُغْنِيْنِيْ بِهِ عَنْ جَمِيْعِ خَلْقِكَ) ×٣\n\nاللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا وَمَوْلَانَا مُحَمَّدٍ ۨالشَّافِعِ الْمُشَفَّعِ يَوْمَ الْقِيَامَةِ وَأَعْطِهِ الْوَسِيلَةَ الْفَضِيلَةَ الدَّرَجَةَ الرَّفِيعَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا لِعُظْمَى الشَّفَاعَةِ وَأَنْزِلْهُ الْمَنْزِلَ الْمُقَرَّبَ عِنْدَكَ يَوْمَ الْقِيَامَةِ وَعَلَى آلِهِ وَصَحْبِهِ حَقَّ دَرَجَاتِهِ الْعَظِيمَةِ",
    translation: "Yaa Allah aku meminta padamu dari karuniamu yang luas dan kemurahanmu yang melimpah, sesuatu yang dapat mencukupkan aku dari semua makhluk-Mu.",
    doa_translation: "Yaa Allah aku meminta padamu dari karuniamu yang luas dan kemurahanmu yang melimpah, sesuatu yang dapat mencukupkan aku dari semua makhluk-Mu.",
    sholawat_translation: "Yaa Allah, curahkanlah rahmat-Mu, serta salam dan barokah atas tuan kami Nabi Muhammad yang memberi syafa'at dan yang diterima permintaan syafa'atnya di hari kiamat. Berikan wasilah (perantara) dan keutamaan serta derajat yang tinggi pada beliau. Dan utuslah (bangkitkanlah) beliau pada kedudukan yang dipuji untuk memberikan syafa'at terbesar. Dan tempatkanlah beliau pada tempat yang dekat di sisi-Mu ketika hari kiamat. Juga semoga rahmat-Mu tercurah pada keluarga dan sahabat-sahabat beliau dengan derajat beliau yang tinggi."
  },

  // Expanded quran_block range 39-57
  { id: 39, type: "ayat", nomor_ayat: 39, arabic: "وَٱلْقَمَرَ قَدَّرْنَٰهُ مَنَازِلَ حَتَّىٰ عَادَ كَٱلْعُرْجُونِ ٱلْقَدِيمِ" },
  { id: 40, type: "ayat", nomor_ayat: 40, arabic: "لَا ٱلشَّمْسُ يَنۢبَغِى لَهَآ أَن تُدْرِكَ ٱلْقَمَرَ وَلَا ٱلَّيْلُ سَابِقُ ٱلنَّهَارِ ۚ وَكُلٌّ فِى فَلَكٍ يَسْبَحُونَ" },
  { id: 41, type: "ayat", nomor_ayat: 41, arabic: "وَءَايَةٌ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِى ٱلْفُلْكِ ٱلْمَشْحُونِ" },
  { id: 42, type: "ayat", nomor_ayat: 42, arabic: "وَخَلَقْنَا لَهُم مِّن مِّثْلِهِۦ مَا يَرْكَبُونَ" },
  { id: 43, type: "ayat", nomor_ayat: 43, arabic: "وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ" },
  { id: 44, type: "ayat", nomor_ayat: 44, arabic: "إِلَّا رَحْمَةً مِّنَّا وَمَتَٰعًا إِلَىٰ حِينٍ" },
  { id: 45, type: "ayat", nomor_ayat: 45, arabic: "وَإِذَا قِيلَ لَهُمُ ٱتَّقُوا۟ مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ" },
  { id: 46, type: "ayat", nomor_ayat: 46, arabic: "وَمَا تَأْتِيهِم مِّنْ ءَايَةٍ مِّنْ ءَايَٰتِ رَبِّهِمْ إِلَّا كَانُوا۟ عَنْهَا مُعْرِضِينَ" },
  { id: 47, type: "ayat", nomor_ayat: 47, arabic: "وَإِذَا قِيلَ لَهُمْ أَنفِقُوا۟ مِمَّا رَزَقَكُمُ ٱللَّهُ قَالَ ٱلَّذِينَ كَفَرُوا۟ لِلَّذِينَ ءَامَنُوٓا۟ أَنُطْعِمُ مَن لَّوْ يَشَآءُ ٱللَّهُ أَطْعَمَهُۥٓ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍ مُّبِينٍ" },
  { id: 48, type: "ayat", nomor_ayat: 48, arabic: "وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ" },
  { id: 49, type: "ayat", nomor_ayat: 49, arabic: "مَا يَنظُرُونَ إِلَّا صَيْحَةً وَٰحِدَةً تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ" },
  { id: 50, type: "ayat", nomor_ayat: 50, arabic: "فَلَا يَسْتَطِيعُونَ تَوْصِيَةً وَلَآ إِلَىٰٓ أَهْلِهِمْ يَرْجِعُونَ" },
  { id: 51, type: "ayat", nomor_ayat: 51, arabic: "وَنُفِخَ فِى ٱلصُّورِ فَإِذَا هُم مِّنَ ٱلْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ" },
  { id: 52, type: "ayat", nomor_ayat: 52, arabic: "قَالُوا۟ يَٰوَيْلَنَا مَنۢ بَعَثَنَا مِن مَّرْقَدِنَا ۜ ۗ هَٰذَا مَا وَعَدَ ٱلرَّحْمَٰنُ وَصَدَقَ ٱلْمُرْسَلُونَ" },
  { id: 53, type: "ayat", nomor_ayat: 53, arabic: "إِن كَانَتْ إِلَّا صَيْحَةً وَٰحِدَةً فَإِذَا هُمْ جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ" },
  { id: 54, type: "ayat", nomor_ayat: 54, arabic: "فَٱلْيَوْمَ لَا تُظْلَمُ نَفْسٌ شَيْـًٔا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ" },
  { id: 55, type: "ayat", nomor_ayat: 55, arabic: "إِنَّ أَصْحَٰبَ ٱلْجَنَّةِ ٱلْيَوْمَ فِى شُغُلٍ فَٰكِهُونَ" },
  { id: 56, type: "ayat", nomor_ayat: 56, arabic: "هُمْ وَأَزْوَٰجُهُمْ فِى ظِلَٰلٍ عَلَى ٱلْأَرَآئِكِ مُتَّكِـُٔونَ" },
  { id: 57, type: "ayat", nomor_ayat: 57, arabic: "لَهُمْ فِيهَا فَٰكِهَةٌ وَلَهُم مَّا يَدَّعُونَ" },

  {
    id: 58, type: "ayat", nomor_ayat: 58,
    arabic: "سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ",
    wirid_instruction: "Diulang 16x atau 313x",
    wirid_arabic: "١٦× / ٣١٣×"
  },

  {
    id: "sisipan_4", type: "sisipan", position: "Setelah Ayat 58", title: "Doa Keselamatan", repeat: "14x (Doa) & 1x (Sholawat)",
    arabic: "(اَللَّهُمَّ سَلِّمْنِيْ مِنْ آفَاتِ الدُّنْيَا وَالْآخِرَةِ وَفِتْنَتِهَا) ×١٤\n\nاَللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُسَهِّلُنِيْ وَتُكَثِّرُنِيْ وَتُبَارِكُنِيْ مِدْرَارَ أَمْوَالِي وَأَرْزَاقِي وَنَعْمَائِي، وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ تَسْلِيمًا مِدْرَارًا",
    translation: "Yaa Allah selamatkanlah aku dari perkara-perkara yang membahayakan dunia dan akhirat serta fitnah-fitnah yang ada.",
    doa_translation: "Yaa Allah selamatkanlah aku dari perkara-perkara yang membahayakan dunia dan akhirat serta fitnah-fitnah yang ada.",
    sholawat_translation: "Yaa Allah Curahkanlah rahmat salam dan barokah atas Nabi Muhammad SAW. Keluarga serta sahabat-sahabat beliau dengan sholawat yang menjadi sebab Engkau mudahkan aku, Engkau perbanyak (hartaku) padaku, dan Engkau berkahi aku atas derasnya harta, rizki dan ni'mat-ni'mat-Mu."
  },

  // Expanded quran_block range 59-80
  { id: 59, type: "ayat", nomor_ayat: 59, arabic: "وَٱمْتَٰزُوا۟ ٱلْيَوْمَ أَيُّهَا ٱلْمُجْرِمُونَ" },
  { id: 60, type: "ayat", nomor_ayat: 60, arabic: "۞ أَلَمْ أَعْهَدْ إِلَيْكُمْ يَٰبَنِىٓ ءَادَمَ أَن لَّا تَعْبُدُوا۟ ٱلشَّيْطَٰنَ ۖ إِنَّهُۥ لَكُمْ عَدُوٌّ مُّبِينٌ" },
  { id: 61, type: "ayat", nomor_ayat: 61, arabic: "وَأَنِ ٱعْبُدُونِى ۚ هَٰذَا صِرَٰطٌ مُّسْتَقِيمٌ" },
  { id: 62, type: "ayat", nomor_ayat: 62, arabic: "وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّا كَثِيرًا ۖ أَفَلَمْ تَكُونُوا۟ تَعْقِلُونَ" },
  { id: 63, type: "ayat", nomor_ayat: 63, arabic: "هَٰذِهِۦ جَهَنَّمُ ٱلَّتِى كُنتُمْ تُوعَدُونَ" },
  { id: 64, type: "ayat", nomor_ayat: 64, arabic: "ٱصْلَوْهَا ٱلْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ" },
  { id: 65, type: "ayat", nomor_ayat: 65, arabic: "ٱلْيَوْمَ نَخْتِمُ عَلَىٰٓ أَفْوَٰهِهِمْ وَتُكَلِّمُنَآ أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا۟ يَكْسِبُونَ" },
  { id: 66, type: "ayat", nomor_ayat: 66, arabic: "وَلَوْ نَشَآءُ لَطَمَسْنَا عَلَىٰٓ أَعْيُنِهِمْ فَٱسْتَبَقُوا۟ ٱلصِّرَٰطَ فَأَنَّىٰ يُبْصِرُونَ" },
  { id: 67, type: "ayat", nomor_ayat: 67, arabic: "وَلَوْ نَشَآءُ لَمَسَخْنَٰهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا ٱسْتَطَٰعُوا۟ مُضِيًّا وَلَا يَرْجِعُونَ" },
  { id: 68, type: "ayat", nomor_ayat: 68, arabic: "وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِى ٱلْخَلْقِ ۖ أَفَلَا يَعْقِلُونَ" },
  { id: 69, type: "ayat", nomor_ayat: 69, arabic: "وَمَا عَلَّمْنَٰهُ ٱلشِّعْرَ وَمَا يَنۢبَغِى لَهُۥٓ ۚ إِنْ هُوَ إِلَّا ذِكْرٌ وَقُرْءَانٌ مُّبِينٌ" },
  { id: 70, type: "ayat", nomor_ayat: 70, arabic: "لِّيُنذِرَ مَن كَانَ حَيًّا وَيَحِقَّ ٱلْقَوْلُ عَلَى ٱلْكَٰفِرِينَ" },
  { id: 71, type: "ayat", nomor_ayat: 71, arabic: "أَوَلَمْ يَرَوْا۟ أَنَّا خَلَقْنَا لَهُم مِّمَّا عَمِلَتْ أَيْدِينَآ أَنْعَٰمًا فَهُمْ لَهَا مَٰلِكُونَ" },
  { id: 72, type: "ayat", nomor_ayat: 72, arabic: "وَذَلَّلْنَٰهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ" },
  { id: 73, type: "ayat", nomor_ayat: 73, arabic: "وَلَهُمْ فِيهَا مَنَٰفِعُ وَمَشَارِبُ ۖ أَفَلَا يَشْكُرُونَ" },
  { id: 74, type: "ayat", nomor_ayat: 74, arabic: "وَٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ ءَالِهَةً لَّعَلَّهُمْ يُنصَرُونَ" },
  { id: 75, type: "ayat", nomor_ayat: 75, arabic: "لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌ مُّحْضَرُونَ" },
  { id: 76, type: "ayat", nomor_ayat: 76, arabic: "فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ" },
  { id: 77, type: "ayat", nomor_ayat: 77, arabic: "أَوَلَمْ يَرَ ٱلْإِنسَٰنُ أَنَّا خَلَقْنَٰهُ مِن نُّطْفَةٍ فَإِذَا هُوَ خَصِيمٌ مُّبِينٌ" },
  { id: 78, type: "ayat", nomor_ayat: 78, arabic: "وَضَرَبَ لَنَا مَثَلًا وَنَسِىَ خَلْقَهُۥ ۖ قَالَ مَن يُحْىِ ٱلْعِظَٰمَ وَهِىَ رَمِيمٌ" },
  { id: 79, type: "ayat", nomor_ayat: 79, arabic: "قُلْ يُحْيِيهَا ٱلَّذِىٓ أَنشَأَهَآ أَوَّلَ مَرَّةٍ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ" },
  { id: 80, type: "ayat", nomor_ayat: 80, arabic: "ٱلَّذِى جَعَلَ لَكُم مِّنَ ٱلشَّجَرِ ٱلْأَخْضَرِ نَارًا فَإِذَآ أَنتُم مِّنْهُ تُوقِدُونَ" },

  {
    id: 81, type: "ayat_parsial", nomor_ayat: 81, bagian: "awal",
    arabic: "أَوَلَيْسَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِقَادِرٍ عَلَىٰ أَنْ يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ",
    translation: "Dan tidakkah Tuhan yang menciptakan langit dan bumi itu berkuasa menciptakan yang serupa dengan itu? Benar."
  },

  {
    id: "sisipan_5", type: "sisipan", position: "Tengah Ayat 81", title: "Doa Keyakinan & Sholawat Al-Azhim", repeat: "3x (Doa) & 10x (Sholawat)",
    arabic: "( بَلَى وَاللهُ قَادِرٌ عَلَى أَنْ يَقْضِيَ لِي حَاجَتِي وَيَفْعَلَ بِيَ الْخَيْرَاتِ وَيُصَرِّفَنِيْ عَنِ الشِّرَارِ وَالْآفَاتِ ) ×٣\n\nصَلَّى اللهُ الْعَظِيمُ عَلَى سَيِّدِنَا مُحَمَّدٍ ×١٠",
    translation: "Ya benar Allah itu maha kuasa untuk mengijabahi hajatku dan berbuat kebaikan-kebaikan padaku, serta menjauhkan dariku kejelekan-kejelekan dan bahaya-bahaya.",
    doa_translation: "Ya benar Allah itu maha kuasa untuk mengijabahi hajatku dan berbuat kebaikan-kebaikan padaku, serta menjauhkan dariku kejelekan-kejelekan dan bahaya-bahaya.",
    sholawat_translation: "Semoga Allah yang agung selalu mencurahkan Rahmat dan Ta'dhimnya atas tuan kami Nabi Muhammad SAW."
  },

  {
    id: "81_end", type: "ayat_parsial", nomor_ayat: 81, bagian: "akhir",
    arabic: "وَهُوَ الْخَلَّاقُ الْعَلِيمُ"
  },

  // Expanded quran_block range 82-83
  { id: 82, type: "ayat", nomor_ayat: 82, arabic: "إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ" },
  { id: 83, type: "ayat", nomor_ayat: 83, arabic: "فَسُبْحَٰنَ ٱلَّذِى بِيَدِهِۦ مَلَكُوتُ كُلِّ شَىْءٍ وَإِلَيْهِ تُرْجَعُونَ" }
];
