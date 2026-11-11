import React from 'react';
import Svg, {
  Path,
  Rect,
  Circle,
  Ellipse,
  Polygon,
  Line,
  G,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';

interface IconProps {
  size?: number;
}

/**
 * 1. Yasin Fadhilah Alfushohbi Icon
 * Desain: Mushaf Al-Qur'an terbuka di atas rehal kayu dengan pita merah dan garis ayat emas
 * Terinspirasi dari ikon Al-Qur'an NU Online
 */
export const YasinMenuIcon: React.FC<IconProps> = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        {/* Gradien Sampul Mushaf Hijau Zamrud */}
        <SvgLinearGradient id="yasinCoverGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#10B981" />
          <Stop offset="100%" stopColor="#047857" />
        </SvgLinearGradient>
        {/* Gradien Lembaran Kertas Mushaf */}
        <SvgLinearGradient id="yasinPageGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFFBEB" />
          <Stop offset="100%" stopColor="#FEF3C7" />
        </SvgLinearGradient>
        {/* Gradien Rehal Kayu Jati Emas */}
        <SvgLinearGradient id="rehalGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#D97706" />
          <Stop offset="100%" stopColor="#78350F" />
        </SvgLinearGradient>
        {/* Gradien Emas Kaligrafi / Aksen */}
        <SvgLinearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FDE047" />
          <Stop offset="100%" stopColor="#D97706" />
        </SvgLinearGradient>
      </Defs>

      {/* Rehal Kayu Silang Bawah */}
      <Path
        d="M12 52 L32 38 L52 52 M16 54 L32 42 L48 54"
        stroke="url(#rehalGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="32" cy="40" r="2.5" fill="#FDE047" />

      {/* Sampul Belakang Hijau Zamrud */}
      <Path
        d="M8 36 C16 33 28 34 32 38 C36 34 48 33 56 36 L54 18 C46 15 35 16 32 20 C29 16 18 15 10 18 Z"
        fill="url(#yasinCoverGrad)"
      />

      {/* Lembaran Halaman Buku Mushaf (Kiri & Kanan) */}
      <Path
        d="M10 34 C18 31 29 32 32 36 C35 32 46 31 54 34 L53 16 C45 13 35 14 32 18 C29 14 19 13 11 16 Z"
        fill="url(#yasinPageGrad)"
        stroke="#E2E8F0"
        strokeWidth="0.75"
      />

      {/* Lipatan Halaman Kiri Atas */}
      <Path
        d="M13 18 C20 15.5 28 16 31.5 19 L31.5 35 C28 32.5 20 32 12.5 34 Z"
        fill="#FFFFFF"
      />

      {/* Lipatan Halaman Kanan Atas */}
      <Path
        d="M51 18 C44 15.5 36 16 32.5 19 L32.5 35 C36 32.5 44 32 51.5 34 Z"
        fill="#FEF9C3"
      />

      {/* Garis-garis Ayat Al-Qur'an Emas Kiri */}
      <Path d="M16 21 C21 19.5 26 20 29 22" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M15 25 C20 23.5 25 24 29 26" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M16 29 C21 27.5 25 28 28 30" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

      {/* Garis-garis Ayat Al-Qur'an Emas Kanan */}
      <Path d="M35 22 C38 20 43 19.5 48 21" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M35 26 C39 24 44 23.5 49 25" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
      <Path d="M36 30 C39 28 43 27.5 48 29" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

      {/* Pita Pembatas Merah Marun di Tengah */}
      <Path
        d="M32 18 L32 39 C32 41 30 42 30 44 L32 43 L34 44 C34 42 32 41 32 39 Z"
        fill="#DC2626"
      />

      {/* Ornamen Emas Bintang di Atas Rehal */}
      <Circle cx="12" cy="51" r="2" fill="#F59E0B" />
      <Circle cx="52" cy="51" r="2" fill="#F59E0B" />
    </Svg>
  );
};

/**
 * 2. Aurod Annidhomiyyah Icon
 * Desain: Kitab Aurod Toska/Emerald berhias kaligrafi emas dengan lingkaran tasbih mutiara bercahaya
 * Terinspirasi dari nuansa wirid dan maulid NU Online
 */
export const AurodMenuIcon: React.FC<IconProps> = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        {/* Gradien Kitab Aurod */}
        <SvgLinearGradient id="aurodBookGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#0D9488" />
          <Stop offset="100%" stopColor="#115E59" />
        </SvgLinearGradient>
        {/* Gradien Butiran Tasbih Zamrud */}
        <SvgLinearGradient id="beadGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#6EE7B7" />
          <Stop offset="100%" stopColor="#059669" />
        </SvgLinearGradient>
        {/* Gradien Emas Rumbai */}
        <SvgLinearGradient id="tasselGold" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FDE047" />
          <Stop offset="100%" stopColor="#D97706" />
        </SvgLinearGradient>
      </Defs>

      {/* Kitab Aurod di Belakang */}
      <Rect
        x="18"
        y="12"
        width="28"
        height="38"
        rx="4"
        fill="url(#aurodBookGrad)"
        stroke="#FDE047"
        strokeWidth="1.2"
      />

      {/* Garis Punggung Kitab */}
      <Rect x="18" y="12" width="5" height="38" rx="2" fill="#042F2E" />

      {/* Halaman Kertas Mengintip di Bawah & Kanan */}
      <Rect x="23" y="14" width="22" height="34" rx="2" fill="#FEF3C7" opacity={0.3} />
      <Rect x="24" y="15" width="20" height="32" rx="2" fill="#0F766E" />

      {/* Bingkai Ornamen Emas di Sampul */}
      <Rect
        x="26"
        y="18"
        width="16"
        height="26"
        rx="2"
        fill="none"
        stroke="#FDE047"
        strokeWidth="0.8"
      />

      {/* Kaligrafi Bulan Sabit & Bintang Emas di Tengah Kitab */}
      <Path
        d="M35 25 C33.5 25 32 26 32 28 C32 30.5 34 32 36.5 32 C35 32.5 33 32 32.5 30.5 C31.5 28.5 32.5 26.5 35 25 Z"
        fill="#FDE047"
      />
      <Circle cx="37" cy="27" r="1.2" fill="#FDE047" />

      {/* Untaian Tasbih Melingkari Kitab */}
      {/* Butir-butir tasbih */}
      <Circle cx="12" cy="26" r="3" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="13" cy="34" r="3" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="16" cy="42" r="3.2" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="22" cy="48" r="3.2" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="30" cy="51" r="3.4" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="38" cy="51" r="3.4" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="46" cy="48" r="3.2" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="51" cy="42" r="3" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="53" cy="34" r="3" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />
      <Circle cx="51" cy="26" r="3" fill="url(#beadGrad)" stroke="#A7F3D0" strokeWidth="0.5" />

      {/* Butir Puncak Imam Tasbih & Rumbai (Tassel) Emas */}
      <Circle cx="34" cy="54" r="3.8" fill="#FDE047" stroke="#D97706" strokeWidth="0.6" />
      <Path
        d="M34 56 L31 63 L37 63 Z"
        fill="url(#tasselGold)"
      />
      <Circle cx="34" cy="58" r="1.2" fill="#78350F" />
    </Svg>
  );
};

/**
 * 3. Tawassul Icon
 * Desain: Sepasang telapak tangan menengadah memohon doa bernuansa emas hangat dengan cahaya berkah
 * Terinspirasi langsung dari menu "Wirid & Doa" NU Online
 */
export const TawassulMenuIcon: React.FC<IconProps> = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        {/* Warna Kulit Telapak Tangan Hangat Gading-Emas */}
        <SvgLinearGradient id="handLeftGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FEF3C7" />
          <Stop offset="70%" stopColor="#FCD34D" />
          <Stop offset="100%" stopColor="#F59E0B" />
        </SvgLinearGradient>
        <SvgLinearGradient id="handRightGrad" x1="1" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FEF3C7" />
          <Stop offset="70%" stopColor="#FCD34D" />
          <Stop offset="100%" stopColor="#F59E0B" />
        </SvgLinearGradient>
        {/* Lengan Baju Hijau Zamrud NU */}
        <SvgLinearGradient id="sleeveGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#059669" />
          <Stop offset="100%" stopColor="#064E3B" />
        </SvgLinearGradient>
        {/* Bintang Berkah Kuning Kemilau */}
        <SvgLinearGradient id="sparkleGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFBEB" />
          <Stop offset="50%" stopColor="#FDE047" />
          <Stop offset="100%" stopColor="#F59E0B" />
        </SvgLinearGradient>
      </Defs>

      {/* Cahaya Pendaran Berkah di Atas Tangan */}
      {/* Bintang Tengah (Besar) */}
      <Path
        d="M32 10 L33.5 15.5 L39 17 L33.5 18.5 L32 24 L30.5 18.5 L25 17 L30.5 15.5 Z"
        fill="url(#sparkleGrad)"
      />
      {/* Bintang Kiri */}
      <Path
        d="M19 15 L20 18.5 L23.5 19.5 L20 20.5 L19 24 L18 20.5 L14.5 19.5 L18 18.5 Z"
        fill="url(#sparkleGrad)"
      />
      {/* Bintang Kanan */}
      <Path
        d="M45 15 L46 18.5 L49.5 19.5 L46 20.5 L45 24 L44 20.5 L40.5 19.5 L44 18.5 Z"
        fill="url(#sparkleGrad)"
      />

      {/* Lengan Baju Kiri */}
      <Path
        d="M17 50 L27 50 L26 60 L18 60 Z"
        fill="url(#sleeveGrad)"
      />
      <Rect x="17" y="48" width="10" height="3" rx="1.5" fill="#F8FAFC" />

      {/* Lengan Baju Kanan */}
      <Path
        d="M37 50 L47 50 L46 60 L38 60 Z"
        fill="url(#sleeveGrad)"
      />
      <Rect x="37" y="48" width="10" height="3" rx="1.5" fill="#F8FAFC" />

      {/* Telapak Tangan Kiri Menengadah */}
      <G>
        {/* Jari Kelingking Kiri */}
        <Path d="M19 36 C18 30 19.5 28 21 28 C22.5 28 23 30 22.5 35" fill="url(#handLeftGrad)" />
        {/* Jari Manis Kiri */}
        <Path d="M22 34 C21.5 26 23.5 24 25 24 C26.5 24 27 26 26.5 34" fill="url(#handLeftGrad)" />
        {/* Jari Tengah Kiri */}
        <Path d="M25.5 33 C25.5 23 27.5 21 29 21 C30.5 21 31 23 30.5 33" fill="url(#handLeftGrad)" />
        {/* Jari Telunjuk Kiri */}
        <Path d="M29.5 33 C30 25 31.5 24 32.5 24 C33.5 24 34 26 33.5 34" fill="url(#handLeftGrad)" />
        {/* Ibu Jari Kiri */}
        <Path d="M29 40 C28 36 26 35 25 36 C24 37 25 39 27 42" fill="url(#handLeftGrad)" />
        {/* Badan Telapak Kiri */}
        <Path
          d="M19 36 C18 42 20 48 27 49 C28 47 31 43 31 39 C31 35 29 33 28 33 Z"
          fill="url(#handLeftGrad)"
        />
      </G>

      {/* Telapak Tangan Kanan Menengadah */}
      <G>
        {/* Jari Kelingking Kanan */}
        <Path d="M45 36 C46 30 44.5 28 43 28 C41.5 28 41 30 41.5 35" fill="url(#handRightGrad)" />
        {/* Jari Manis Kanan */}
        <Path d="M42 34 C42.5 26 40.5 24 39 24 C37.5 24 37 26 37.5 34" fill="url(#handRightGrad)" />
        {/* Jari Tengah Kanan */}
        <Path d="M38.5 33 C38.5 23 36.5 21 35 21 C33.5 21 33 23 33.5 33" fill="url(#handRightGrad)" />
        {/* Jari Telunjuk Kanan */}
        <Path d="M34.5 33 C34 25 32.5 24 31.5 24 C30.5 24 30 26 30.5 34" fill="url(#handRightGrad)" />
        {/* Ibu Jari Kanan */}
        <Path d="M35 40 C36 36 38 35 39 36 C40 37 39 39 37 42" fill="url(#handRightGrad)" />
        {/* Badan Telapak Kanan */}
        <Path
          d="M45 36 C46 42 44 48 37 49 C36 47 33 43 33 39 C33 35 35 33 36 33 Z"
          fill="url(#handRightGrad)"
        />
      </G>
    </Svg>
  );
};

/**
 * 4. Tahlil Icon
 * Desain: Santri berpeci hitam & bersarung hijau khusyuk duduk membaca tahlil dengan kubah zikir emas
 * Terinspirasi langsung dari menu "Tahlil & Yasin" NU Online
 */
export const TahlilMenuIcon: React.FC<IconProps> = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        {/* Latar Kubah Zikir Bersinar */}
        <SvgLinearGradient id="domeGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
          <Stop offset="100%" stopColor="#047857" stopOpacity={0.05} />
        </SvgLinearGradient>
        {/* Sarung Hijau Tradisi NU */}
        <SvgLinearGradient id="sarungGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#047857" />
          <Stop offset="100%" stopColor="#064E3B" />
        </SvgLinearGradient>
        {/* Baju Koko Putih */}
        <SvgLinearGradient id="kokoGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#E2E8F0" />
        </SvgLinearGradient>
        {/* Sajadah Biru/Toska */}
        <SvgLinearGradient id="sajadahGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#0D9488" />
          <Stop offset="100%" stopColor="#047857" />
        </SvgLinearGradient>
      </Defs>

      {/* Siluet Kubah Masjid di Latar Belakang */}
      <Path
        d="M18 36 C18 20 28 14 32 10 C36 14 46 20 46 36 Z"
        fill="url(#domeGrad)"
        stroke="#34D399"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      <Circle cx="32" cy="10" r="1.5" fill="#FDE047" />

      {/* Sajadah Tempat Bersimpuh */}
      <Path
        d="M10 54 L54 54 L51 58 L13 58 Z"
        fill="url(#sajadahGrad)"
      />
      <Path d="M10 56 L54 56" stroke="#FDE047" strokeWidth="0.6" strokeDasharray="2 1" />

      {/* Santri Khusyuk Mengaji/Tahlil */}
      {/* Peci Hitam NU dengan Aksen Garis Emas */}
      <Path
        d="M27 21 C27 18 37 18 37 21 L38 25 C38 26 26 26 26 25 Z"
        fill="#1E293B"
      />
      <Path d="M26.5 24 L37.5 24" stroke="#D97706" strokeWidth="0.8" />

      {/* Kepala / Wajah Santri Menunduk */}
      <Circle cx="32" cy="27" r="4.5" fill="#FDE68A" />

      {/* Baju Koko Putih */}
      <Path
        d="M26 31 C23 35 22 41 21 46 L30 46 L32 35 L34 46 L43 46 C42 41 41 35 38 31 Z"
        fill="url(#kokoGrad)"
        stroke="#CBD5E1"
        strokeWidth="0.5"
      />

      {/* Lengan Tangan Memegang Kitab / Bertasbih */}
      <Path
        d="M22 39 C24 43 27 45 32 45 C37 45 40 43 42 39"
        stroke="#E2E8F0"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <Circle cx="32" cy="45" r="2.2" fill="#FDE68A" />

      {/* Sarung Santri Duduk Bersimpuh */}
      <Path
        d="M18 46 C16 50 18 55 24 55 L40 55 C46 55 48 50 46 46 Z"
        fill="url(#sarungGrad)"
      />
      {/* Motif Garis Sarung Tradisional */}
      <Path d="M22 51 L42 51" stroke="#34D399" strokeWidth="0.8" opacity={0.6} />
      <Path d="M20 53 L44 53" stroke="#FDE047" strokeWidth="0.6" opacity={0.6} />

      {/* Rehal Kecil & Kitab di Hadapan Santri */}
      <Path d="M28 53 L32 49 L36 53" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M27 48 L32 50 L37 48" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
};

/**
 * 5. Sholawat Fatih Icon
 * Desain: Pigura kitab klasik bermahkota segitiga dengan kaligrafi emas di atas lembaran gading
 */
export const SholawatFatihMenuIcon: React.FC<IconProps> = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <SvgLinearGradient id="fatihFrameGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#10B981" />
          <Stop offset="100%" stopColor="#064E3B" />
        </SvgLinearGradient>
        <SvgLinearGradient id="fatihPaperGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFFDF5" />
          <Stop offset="100%" stopColor="#FEF3C7" />
        </SvgLinearGradient>
        <SvgLinearGradient id="fatihGoldGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FDE047" />
          <Stop offset="100%" stopColor="#D97706" />
        </SvgLinearGradient>
      </Defs>

      {/* Mahkota Segitiga (Taj) */}
      <Polygon
        points="32,7 19,21 45,21"
        fill="url(#fatihGoldGrad)"
        stroke="#78350F"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <Line x1="25.5" y1="14" x2="38.5" y2="14" stroke="#78350F" strokeWidth="1" />
      <Circle cx="32" cy="11" r="1.2" fill="#FFFBEB" />

      {/* Bingkai Utama Lauh */}
      <Rect
        x="13"
        y="21"
        width="38"
        height="32"
        rx="2"
        fill="url(#fatihFrameGrad)"
        stroke="url(#fatihGoldGrad)"
        strokeWidth="1.8"
      />
      <Rect
        x="16.5"
        y="24.5"
        width="31"
        height="25"
        rx="1"
        fill="url(#fatihPaperGrad)"
        stroke="#D97706"
        strokeWidth="0.9"
      />

      {/* Garis Kaligrafi Sholawat Fatih */}
      <Path d="M22 30 H42" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
      <Path d="M20 35.5 H44" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" />
      <Path d="M21 40.5 H43" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" />
      <Path d="M24 45.5 H40" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" />

      {/* Ornamen Bawah */}
      <Path d="M20 57 L32 55 L44 57 L32 59 Z" fill="url(#fatihGoldGrad)" />
    </Svg>
  );
};

/**
 * 6. Web Kasan Icon
 * Desain: Bola dunia bernuansa zamrud & emas dengan bintang portal resmi kasantuban.org
 */
export const WebKasanMenuIcon: React.FC<IconProps> = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <SvgLinearGradient id="webGlobeGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#38BDF8" />
          <Stop offset="55%" stopColor="#0284C7" />
          <Stop offset="100%" stopColor="#0369A1" />
        </SvgLinearGradient>
        <SvgLinearGradient id="webRingGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FDE047" />
          <Stop offset="100%" stopColor="#D97706" />
        </SvgLinearGradient>
      </Defs>

      {/* Lingkaran Bola Dunia */}
      <Circle
        cx="32"
        cy="33"
        r="20"
        fill="url(#webGlobeGrad)"
        stroke="#E0F2FE"
        strokeWidth="1.5"
      />

      {/* Garis Meridian & Lintang */}
      <Ellipse
        cx="32"
        cy="33"
        rx="9.5"
        ry="20"
        fill="none"
        stroke="#BAE6FD"
        strokeWidth="1.4"
      />
      <Path d="M12.5 33 H51.5" stroke="#BAE6FD" strokeWidth="1.4" />
      <Path d="M15.5 23.5 C24 26 40 26 48.5 23.5" stroke="#BAE6FD" strokeWidth="1.2" fill="none" />
      <Path d="M15.5 42.5 C24 40 40 40 48.5 42.5" stroke="#BAE6FD" strokeWidth="1.2" fill="none" />

      {/* Sabuk Orbit & Aksen Emas */}
      <Path
        d="M11 40 C22 22 44 17 55 21"
        stroke="url(#webRingGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bintang Portal Kanan Atas */}
      <Path
        d="M49 11 L50.6 15.4 L55 17 L50.6 18.6 L49 23 L47.4 18.6 L43 17 L47.4 15.4 Z"
        fill="#FDE047"
      />
    </Svg>
  );
};
