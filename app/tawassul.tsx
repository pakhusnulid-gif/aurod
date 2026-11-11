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
  const arabicLineHeight = Math.round(fontSize * 1.85);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Tawassul" showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>

          {tawassulData.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
                {item.text}
              </Text>
            </View>
          ))}

          <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

          <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>

          <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
            اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ. الرَّحْمٰنِ الرَّحِيْمِ. مَالِكِ يَوْمِ الدِّيْنِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ. اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ. صِرَاطَ الَّذِيْنَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّآلِّيْنَ
          </Text>

          <Text style={[styles.arabicText, { color: themeColors.text, fontSize, lineHeight: arabicLineHeight }]}>
            اٰمِيْن يَا رَبَّ الْعَالَمِيْنَ
          </Text>

          <Footer />
        </View>
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
  innerContent: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    marginBottom: spacing.lg,
  },
  itemContainer: {
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xl,
  },
});
