// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

interface LockedSectionProps {
  isPremium: boolean;
  title: string;
  children: ReactNode;
  onUnlock: () => void;
}

export function LockedSection({ isPremium, title, children, onUnlock }: LockedSectionProps) {
  if (isPremium) {
    return <View>{children}</View>;
  }

  return (
    <Pressable style={styles.locked} onPress={onUnlock} accessibilityLabel={`Desbloquear ${title}`}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="lock" size={22} color={colors.gold} />
      </View>
      <Text style={styles.title}>{title} bloqueado</Text>
      <Text style={styles.subtitle}>Disponivel no plano Premium</Text>
      <View style={styles.cta}>
        <MaterialCommunityIcons name="crown" size={16} color={colors.primaryDark} />
        <Text style={styles.ctaText}>Desbloquear agora</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  locked: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gold,
    borderStyle: 'dashed',
    padding: spacing.lg,
    alignItems: 'center',
    gap: 6,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold as '700',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  ctaText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold as '700',
    color: colors.primaryDark,
  },
});
