// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';
import { ProfitLevel } from '@/types';

interface ProfitBadgeProps {
  level: ProfitLevel;
  compact?: boolean;
}

export function ProfitBadge({ level, compact = false }: ProfitBadgeProps) {
  const config = getConfig(level);
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <MaterialCommunityIcons name={config.icon} size={compact ? 13 : 15} color={config.text} />
      <Text style={[styles.text, { color: config.text, fontSize: compact ? fontSize.xs : fontSize.sm }]}>
        {config.label}
      </Text>
    </View>
  );
}

function getConfig(level: ProfitLevel) {
  if (level === 'Alto') {
    return { label: 'Alto lucro', bg: colors.primarySoft, text: colors.primary, icon: 'trending-up' as const };
  }
  if (level === 'Medio') {
    return { label: 'Lucro medio', bg: colors.goldSoft, text: colors.warning, icon: 'trending-neutral' as const };
  }
  return { label: 'Lucro inicial', bg: colors.surfaceAlt, text: colors.textSubtle, icon: 'seed' as const };
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: fontWeight.semibold as '600',
  },
});
