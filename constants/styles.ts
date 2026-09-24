// Powered by OnSpace.AI
import { StyleSheet } from 'react-native';
import { colors, radius, spacing, fontSize, fontWeight, shadow } from './theme';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadow.card,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
  },
  bodyText: {
    fontSize: fontSize.md,
    lineHeight: fontSize.md * 1.6,
    color: colors.textSubtle,
    fontWeight: fontWeight.regular as '400',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
