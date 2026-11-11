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

  const proseSize = Math.max(15, fontSize - 2);
  const proseLineHeight = Math.round(proseSize * 1.55);
  const meaningSize = Math.max(14, fontSize - 4);
  const meaningLineHeight = Math.round(meaningSize * 1.55);
  const arabicSectionSize = fontSize + 4;
  const arabicSectionLineHeight = Math.round(arabicSectionSize * 1.85);
  const listArabicSize = fontSize + 2;
  const listArabicLineHeight = Math.round(listArabicSize * 1.85);

  const renderNotes = (notes: string | string[] | undefined) => {
    if (!notes) return null;

    const notesArray = Array.isArray(notes) ? notes : [notes];

    return (
      <View
        style={[
          styles.notesContainer,
          {
            backgroundColor: themeColors.calloutBg,
            borderColor: themeColors.calloutBorder,
          },
        ]}
      >
        {notesArray.map((note, index) => (
          <Text
            key={index}
            style={[
              styles.notesText,
              {
                color: themeColors.calloutText,
                fontSize: proseSize,
                lineHeight: proseLineHeight,
              },
            ]}
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
            style={[
              styles.bodyText,
              {
                color: themeColors.text,
                fontSize: proseSize,
                lineHeight: proseLineHeight,
              },
            ]}
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
        <Text
          style={[
            styles.arabicText,
            {
              color: themeColors.text,
              fontSize: arabicSectionSize,
              lineHeight: arabicSectionLineHeight,
            },
          ]}
        >
          {section.arabic}
        </Text>
        {section.latin && (
          <Text
            style={[
              styles.latinText,
              {
                color: themeColors.textSecondary,
                fontSize: proseSize,
                lineHeight: proseLineHeight,
              },
            ]}
          >
            {section.latin}
          </Text>
        )}
        {section.meaning && (
          <Text
            style={[
              styles.meaningText,
              {
                color: themeColors.textSecondary,
                fontSize: meaningSize,
                lineHeight: meaningLineHeight,
              },
            ]}
          >
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
                style={[
                  styles.listItemText,
                  {
                    color: themeColors.text,
                    fontSize: proseSize,
                    lineHeight: proseLineHeight,
                  },
                ]}
              >
                {item}
              </Text>
            );
          }

          return (
            <View key={index} style={styles.listItem}>
              {item.number !== undefined && (
                <Text
                  style={[
                    styles.listNumber,
                    {
                      color: themeColors.primary,
                      fontSize: proseSize,
                      lineHeight: proseLineHeight,
                      minWidth: Math.max(24, proseSize + 6),
                    },
                  ]}
                >
                  {item.number}.
                </Text>
              )}
              <View style={styles.listContent}>
                {item.arabic && (
                  <Text
                    style={[
                      styles.arabicText,
                      {
                        color: themeColors.text,
                        fontSize: listArabicSize,
                        lineHeight: listArabicLineHeight,
                      },
                    ]}
                  >
                    {item.arabic}
                  </Text>
                )}
                {item.latin && (
                  <Text
                    style={[
                      styles.latinText,
                      {
                        color: themeColors.textSecondary,
                        fontSize: proseSize,
                        lineHeight: proseLineHeight,
                      },
                    ]}
                  >
                    {item.latin}
                  </Text>
                )}
                {item.meaning && (
                  <Text
                    style={[
                      styles.meaningText,
                      {
                        color: themeColors.textSecondary,
                        fontSize: meaningSize,
                        lineHeight: meaningLineHeight,
                      },
                    ]}
                  >
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
        <View style={styles.innerContent}>
          <Text
            style={[
              styles.mainTitle,
              {
                color: themeColors.primary,
                fontSize: fontSize + 8,
                lineHeight: Math.round((fontSize + 8) * 1.5),
              },
            ]}
          >
            أَوْرَادُ النِّظَامِيَّةِ
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary, fontSize: proseSize }]}>
            Aurod An-Nidhomiyyah
          </Text>

          {aurodData.map((section, idx) => (
            <View key={section.id} style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: themeColors.primary,
                    fontSize: fontSize + 2,
                    lineHeight: Math.round((fontSize + 2) * 1.4),
                  },
                ]}
              >
                {section.title}
              </Text>

              {renderNotes(section.notes)}
              {renderBody(section.body)}
              {renderArabicSection(section)}
              {renderList(section.list)}

              {idx < aurodData.length - 1 && (
                <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
              )}
            </View>
          ))}

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
  mainTitle: {
    fontFamily: 'Amiri-Bold',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  notesContainer: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  notesText: {
    marginBottom: spacing.xs,
  },
  bodyContainer: {
    marginBottom: spacing.md,
  },
  bodyText: {
    marginBottom: spacing.sm,
    textAlign: 'left',
  },
  arabicSection: {
    marginBottom: spacing.md,
  },
  arabicText: {
    fontFamily: 'Amiri-Regular',
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  latinText: {
    textAlign: 'left',
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  meaningText: {
    textAlign: 'left',
    fontStyle: 'italic',
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
  },
  listContent: {
    flex: 1,
  },
  listItemText: {
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
});
