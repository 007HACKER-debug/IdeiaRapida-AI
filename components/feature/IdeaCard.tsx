// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { BusinessIdea } from '@/types';
import { ProfitBadge } from '@/components/ui/ProfitBadge';

interface IdeaCardProps {
  idea: BusinessIdea;
  onPress: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
}

export function IdeaCard({ idea, onPress, saved = false, onToggleSave }: IdeaCardProps) {
  const category = idea.categoryIcon as keyof typeof MaterialCommunityIcons.glyphMap;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={idea.title}
    >
      <View style={styles.topRow}>
        <View style={styles.categoryTag}>
          <MaterialCommunityIcons name={category} size={14} color={colors.primary} />
          <Text style={styles.categoryText}>{idea.categoryLabel}</Text>
        </View>
        {onToggleSave ? (
          <Pressable onPress={onToggleSave} hitSlop={10} accessibilityLabel="Salvar ideia">
            <MaterialCommunityIcons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={saved ? colors.gold : colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.title}>{idea.title}</Text>
      <Text style={styles.tagline} numberOfLines={2}>
        {idea.tagline}
      </Text>

      <View style={styles.footer}>
        <ProfitBadge level={idea.profitLevel} compact />
        <View style={styles.revenue}>
          <MaterialCommunityIcons name="cash-multiple" size={14} color={colors.textSubtle} />
          <Text style={styles.revenueText} numberOfLines={1}>
            {idea.monthlyRevenue}/mes
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold as '600',
    color: colors.primary,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
    lineHeight: fontSize.lg * 1.3,
  },
  tagline: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
    lineHeight: fontSize.sm * 1.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  revenue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  revenueText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold as '600',
    color: colors.textSubtle,
  },
});
