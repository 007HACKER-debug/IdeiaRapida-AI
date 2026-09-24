// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LockedSection, ProfitBadge } from '@/components';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { useIdeas } from '@/hooks/useIdeas';

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getIdeaById, isPremium, isSaved, toggleSave } = useIdeas();

  const idea = id ? getIdeaById(id) : undefined;

  if (!idea) {
    return (
      <SafeAreaView style={styles.screen}>
        <Stack.Screen options={{ headerShown: true, title: 'Ideia' }} />
        <View style={styles.notFound}>
          <MaterialCommunityIcons name="alert-circle-outline" size={44} color={colors.textMuted} />
          <Text style={styles.notFoundText}>Ideia nao encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const saved = isSaved(idea.id);
  const goPremium = () => router.push('/premium');

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: idea.categoryLabel,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerRight: () => (
            <Pressable onPress={() => toggleSave(idea)} hitSlop={10} accessibilityLabel="Salvar">
              <MaterialCommunityIcons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={saved ? colors.gold : colors.primary}
              />
            </Pressable>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{idea.title}</Text>
        <Text style={styles.tagline}>{idea.tagline}</Text>
        <View style={styles.badges}>
          <ProfitBadge level={idea.profitLevel} />
        </View>

        {/* Snapshot metrics */}
        <View style={styles.metrics}>
          <Metric icon="cash-multiple" label="Receita/mes" value={idea.monthlyRevenue} />
          <Metric icon="rocket-launch" label="Investimento" value={idea.startupCost} />
          <Metric icon="gauge" label="Dificuldade" value={idea.difficulty} />
          <Metric icon="account-group" label="Publico" value={idea.targetAudience} multiline />
        </View>

        {/* Brand name - premium */}
        <Section title="Nome de marca" icon="tag-heart">
          <LockedSection isPremium={isPremium} title="Nome de marca" onUnlock={goPremium}>
            <View style={styles.brandBox}>
              <Text style={styles.brandPrimary}>{idea.brandName}</Text>
              {idea.brandAlternatives.length > 0 ? (
                <Text style={styles.brandAlt}>
                  Alternativas: {idea.brandAlternatives.join(' | ')}
                </Text>
              ) : null}
            </View>
          </LockedSection>
        </Section>

        {/* Action plan - premium */}
        <Section title="Plano de acao" icon="clipboard-check">
          <LockedSection isPremium={isPremium} title="Plano de acao" onUnlock={goPremium}>
            <View style={{ gap: spacing.sm }}>
              {idea.actionPlan.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </LockedSection>
        </Section>

        {/* Monetization - premium */}
        <Section title="Como ganhar dinheiro" icon="cash-multiple">
          <LockedSection isPremium={isPremium} title="Monetizacao" onUnlock={goPremium}>
            <View style={{ gap: spacing.sm }}>
              {idea.monetization.map((item, index) => (
                <View key={index} style={styles.moneyRow}>
                  <MaterialCommunityIcons name="check-circle" size={18} color={colors.primary} />
                  <Text style={styles.moneyText}>{item}</Text>
                </View>
              ))}
            </View>
          </LockedSection>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({
  icon,
  label,
  value,
  multiline = false,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <View style={[styles.metric, multiline && styles.metricWide]}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.primary} />
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue} numberOfLines={multiline ? 3 : 1}>
        {value}
      </Text>
    </View>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
    lineHeight: fontSize.xxl * 1.2,
  },
  tagline: {
    fontSize: fontSize.md,
    color: colors.textSubtle,
    lineHeight: fontSize.md * 1.5,
  },
  badges: {
    flexDirection: 'row',
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metric: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
    ...shadow.soft,
  },
  metricWide: {
    width: '100%',
  },
  metricLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: fontWeight.semibold as '600',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.semibold as '600',
  },
  section: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
  },
  brandBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  brandPrimary: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold as '700',
    color: colors.primary,
  },
  brandAlt: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: colors.onPrimary,
    fontWeight: fontWeight.bold as '700',
    fontSize: fontSize.sm,
  },
  stepText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: fontSize.md * 1.5,
  },
  moneyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  moneyText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: fontSize.md * 1.5,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  notFoundText: {
    fontSize: fontSize.md,
    color: colors.textSubtle,
  },
});
