// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

interface InterestChipProps {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  selected: boolean;
  onPress: () => void;
}

export function InterestChip({ label, icon, color, selected, onPress }: InterestChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipDefault,
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={selected ? colors.onPrimary : color}
      />
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelDefault]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold as '600',
  },
  labelDefault: {
    color: colors.text,
  },
  labelSelected: {
    color: colors.onPrimary,
  },
});
