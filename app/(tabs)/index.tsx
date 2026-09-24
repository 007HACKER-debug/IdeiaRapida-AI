// Powered by OnSpace.AI
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, InterestChip } from '@/components';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';
import { interests } from '@/data/interests';
import { useIdeas } from '@/hooks/useIdeas';
import { useAlert } from '@/template';

export default function GenerateScreen() {
  const router = useRouter();
  const { generate } = useIdeas();
  const { showAlert } = useAlert();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (selected.length === 0) {
      showAlert('Escolha um interesse', 'Selecione pelo menos uma area para a IA gerar ideias.');
      return;
    }
    generate(selected);
    router.push('/results');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image
            source={require('@/assets/hero-idea.png')}
            style={styles.heroImage}
            contentFit="cover"
            transition={250}
          />
          <View style={styles.heroText}>
            <Text style={styles.brand}>IdeiaRapida</Text>
            <Text style={styles.headline}>Sua proxima fonte de renda comeca aqui</Text>
            <Text style={styles.sub}>
              Escolha seus interesses e deixe a IA montar modelos de negocio sob medida.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>O que voce curte?</Text>
          <Text style={styles.counter}>
            {selected.length > 0 ? `${selected.length} selecionado(s)` : 'Toque para escolher'}
          </Text>
        </View>

        <View style={styles.chips}>
          {interests.map((item) => (
            <InterestChip
              key={item.id}
              label={item.label}
              icon={item.icon as never}
              color={item.color}
              selected={selected.includes(item.id)}
              onPress={() => toggle(item.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Gerar modelos de negocio"
          icon="auto-fix"
          onPress={handleGenerate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  hero: {
    margin: spacing.md,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.primaryDark,
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  heroText: {
    padding: spacing.lg,
    gap: 6,
  },
  brand: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold as '700',
    color: colors.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold as '700',
    color: colors.onPrimary,
    lineHeight: fontSize.xl * 1.25,
  },
  sub: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: fontSize.sm * 1.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
  },
  counter: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold as '600',
    color: colors.primary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
