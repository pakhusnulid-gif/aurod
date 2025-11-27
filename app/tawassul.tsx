import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navbar } from '@/components/Navbar';
import { FontSizeSlider } from '@/components/FontSizeSlider';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing } from '@/constants/theme';
import { tawassulData } from '@/constants/tawassulData';

export default function TawassulScreen() {
  const { theme, fontSize } = useTheme();
  const themeColors = colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Tawassul" showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.arabicText, { color: themeColors.text, fontSize }]}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>

        {tawassulData.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={[styles.arabicText, { color: themeColors.text, fontSize }]}>
              {item.text}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize }]}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize }]}>
          اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ. الرَّحْمٰنِ الرَّحِيْمِ. مَالِكِ يَوْمِ الدِّيْنِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ. اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ. صِرَاطَ الَّذِيْنَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّآلِّيْنَ
        </Text>

        <Text style={[styles.arabicText, { color: themeColors.text, fontSize }]}>
          اٰمِيْن يَا رَبَّ الْعَالَمِيْنَ
        </Text>

        <Footer />
      </ScrollView>

      <FontSizeSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    lineHeight: 48,
    marginBottom: spacing.lg,
    userSelect: 'none',
  },
  sectionTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginVertical: spacing.lg,
    userSelect: 'none',
  },
  itemContainer: {
    marginBottom: spacing.lg,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Amiri-Regular',
    textAlign: 'left',
    marginBottom: spacing.sm,
    userSelect: 'none',
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    marginVertical: spacing.xl,
  },
});
