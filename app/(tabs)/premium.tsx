// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { useIdeas } from '@/hooks/useIdeas';
import { useAlert } from '@/template';

const FEATURES = [
  { icon: 'clipboard-check', label: 'Plano de acao completo passo a passo' },
  { icon: 'tag-heart', label: 'Sugestoes de nome de marca exclusivas' },
  { icon: 'cash-multiple', label: 'Modelos de monetizacao detalhados' },
  { icon: 'infinity', label: 'Geracoes ilimitadas de ideias' },
];

export default function PremiumScreen() {
  const { isPremium, unlockPremium } = useIdeas();
  const { showAlert } = useAlert();

  const handleSubscribe = () => {
    showAlert(
      'Ativar Premium (demonstracao)',
      'Este e um fluxo simulado. Nenhuma cobranca real sera feita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Ativar agora',
          onPress: () => {
            unlockPremium();
            showAlert('Premium ativado', 'Todo o conteudo foi desbloqueado.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.crownWrap}>
          <MaterialCommunityIcons name="crown" size={40} color={colors.gold} />
        </View>
        <Text style={styles.title}>IdeiaRapida Premium</Text>
        <Text style={styles.subtitle}>
          Destrave o plano de acao, os nomes de marca e a monetizacao de cada ideia.
        </Text>

        <View style={styles.card}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <MaterialCommunityIcons name={f.icon as never} size={18} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>{f.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Plano mensal</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>R$ 19</Text>
            <Text style={styles.pricePeriod}>,90/mes</Text>
          </View>
          <Text style={styles.priceNote}>Cancele quando quiser</Text>
        </View>

        {isPremium ? (
          <View style={styles.activeBadge}>
            <MaterialCommunityIcons name="check-decagram" size={20} color={colors.primary} />
            <Text style={styles.activeText}>Premium ativo</Text>
          </View>
        ) : (
          <Button title="Ativar Premium" icon="crown" variant="secondary" onPress={handleSubscribe} />
        )}

        <Text style={styles.disclaimer}>
          Fluxo de pagamento simulado para demonstracao.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  crownWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: fontSize.md * 1.6,
    paddingHorizontal: spacing.sm,
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    ...shadow.soft,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.medium as '500',
  },
  priceCard: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadow.card,
  },
  priceLabel: {
    fontSize: fontSize.sm,
    color: colors.goldSoft,
    fontWeight: fontWeight.semibold as '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  price: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold as '700',
    color: colors.onPrimary,
  },
  pricePeriod: {
    fontSize: fontSize.md,
    color: colors.onPrimary,
    marginBottom: 6,
  },
  priceNote: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  activeText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold as '700',
    color: colors.primary,
  },
  disclaimer: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
