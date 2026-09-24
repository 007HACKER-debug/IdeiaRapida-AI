// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const palette = getPalette(variant, isDisabled);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.bg, borderColor: palette.border },
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <View style={styles.content}>
          {icon ? <MaterialCommunityIcons name={icon} size={20} color={palette.text} /> : null}
          <Text style={[styles.text, { color: palette.text }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

function getPalette(variant: Variant, disabled: boolean) {
  if (disabled) {
    return { bg: colors.surfaceAlt, border: colors.border, text: colors.textMuted };
  }
  if (variant === 'primary') {
    return { bg: colors.primary, border: colors.primary, text: colors.onPrimary };
  }
  if (variant === 'secondary') {
    return { bg: colors.goldSoft, border: colors.gold, text: colors.primaryDark };
  }
  return { bg: 'transparent', border: colors.border, text: colors.primary };
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold as '600',
  },
});
