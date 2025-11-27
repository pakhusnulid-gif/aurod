import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navbar } from '@/components/Navbar';
import { FontSizeSlider } from '@/components/FontSizeSlider';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { aurodData, AurodSection, AurodListItem } from '@/constants/aurodData';

export default function AurodScreen() {
  const { theme, fontSize } = useTheme();
  const themeColors = colors[theme];

  const renderNotes = (notes: string | string[] | undefined) => {
    if (!notes) return null;

    const notesArray = Array.isArray(notes) ? notes : [notes];

    return (
      <View style={[styles.notesContainer, { backgroundColor: '#d1fae5', borderColor: '#10b981' }]}>
        {notesArray.map((note, index) => (
          <Text
            key={index}
            style={[styles.notesText, { color: '#065f46', fontSize: fontSize - 2 }]}
          >
            {note}
          </Text>
        ))}
      </View>
    );
  };

  const renderBody = (body: string[] | undefined) => {
    if (!body) return null;

    return (
      <View style={styles.bodyContainer}>
        {body.map((paragraph, index) => (
          <Text
            key={index}
            style={[styles.bodyText, { color: themeColors.text, fontSize: fontSize - 2 }]}
          >
            {paragraph}
          </Text>
        ))}
      </View>
    );
  };

  const renderArabicSection = (section: AurodSection) => {
    if (!section.arabic) return null;

    return (
      <View style={styles.arabicSection}>
        <Text style={[styles.arabicText, { color: themeColors.text, fontSize: fontSize + 4 }]}>
          {section.arabic}
        </Text>
        {section.latin && (
          <Text style={[styles.latinText, { color: themeColors.textSecondary, fontSize: fontSize - 2 }]}>
            {section.latin}
          </Text>
        )}
        {section.meaning && (
          <Text style={[styles.meaningText, { color: themeColors.textSecondary, fontSize: fontSize - 4 }]}>
            {section.meaning}
          </Text>
        )}
      </View>
    );
  };

  const renderList = (list: (string | AurodListItem)[] | undefined) => {
    if (!list) return null;

    return (
      <View style={styles.listContainer}>
        {list.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <Text
                key={index}
                style={[styles.listItemText, { color: themeColors.text, fontSize: fontSize - 2 }]}
              >
                {item}
              </Text>
            );
          }

          return (
            <View key={index} style={styles.listItem}>
              {item.number && (
                <Text style={[styles.listNumber, { color: themeColors.primary, fontSize: fontSize - 2 }]}>
                  {item.number}.
                </Text>
              )}
              <View style={styles.listContent}>
                {item.arabic && (
                  <Text style={[styles.arabicText, { color: themeColors.text, fontSize: fontSize + 2 }]}>
                    {item.arabic}
                  </Text>
                )}
                {item.latin && (
                  <Text style={[styles.latinText, { color: themeColors.textSecondary, fontSize: fontSize - 2 }]}>
                    {item.latin}
                  </Text>
                )}
                {item.meaning && (
                  <Text style={[styles.meaningText, { color: themeColors.textSecondary, fontSize: fontSize - 4 }]}>
                    {item.meaning}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Navbar title="Aurod An-Nidhomiyyah" showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.mainTitle, { color: themeColors.primary, fontSize: fontSize + 8 }]}>
          أَوْرَادُ النِّظَامِيَّةِ
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary, fontSize: fontSize - 2 }]}>
          Aurod An-Nidhomiyyah
        </Text>

        {aurodData.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.primary, fontSize: fontSize + 2 }]}>
              {section.title}
            </Text>

            {renderNotes(section.notes)}
            {renderBody(section.body)}
            {renderArabicSection(section)}
            {renderList(section.list)}

            <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
          </View>
        ))}

        <Text style={[styles.footer, { color: themeColors.textSecondary, fontSize: fontSize - 4 }]}>
          Pondok Pesantren An-Nidhomiyyah Tuban
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
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginBottom: spacing.xs,
    userSelect: 'none',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    userSelect: 'none',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.md,
    userSelect: 'none',
  },
  notesContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  notesText: {
    lineHeight: 22,
    marginBottom: spacing.xs,
    userSelect: 'none',
  },
  bodyContainer: {
    marginBottom: spacing.md,
  },
  bodyText: {
    lineHeight: 24,
    marginBottom: spacing.sm,
    textAlign: 'justify',
    userSelect: 'none',
  },
  arabicSection: {
    marginBottom: spacing.md,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    lineHeight: 40,
    marginBottom: spacing.sm,
    userSelect: 'none',
  },
  latinText: {
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: spacing.sm,
    fontStyle: 'italic',
    userSelect: 'none',
  },
  meaningText: {
    textAlign: 'left',
    lineHeight: 20,
    fontStyle: 'italic',
    opacity: 0.8,
    userSelect: 'none',
  },
  listContainer: {
    marginBottom: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  listNumber: {
    fontWeight: '700',
    marginRight: spacing.sm,
    width: 24,
    userSelect: 'none',
  },
  listContent: {
    flex: 1,
  },
  listItemText: {
    lineHeight: 24,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
    userSelect: 'none',
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
  footer: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontStyle: 'italic',
    userSelect: 'none',
  },
});
