// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IdeaCard } from '@/components';
import { colors, fontSize, fontWeight, spacing } from '@/constants/theme';
import { useIdeas } from '@/hooks/useIdeas';

export default function ResultsScreen() {
  const router = useRouter();
  const { currentIdeas, isGenerating, toggleSave, isSaved } = useIdeas();

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Ideias geradas',
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
        }}
      />

      {isGenerating ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingTitle}>Gerando modelos de negocio...</Text>
          <Text style={styles.loadingText}>
            A IA esta combinando seus interesses com oportunidades reais.
          </Text>
        </View>
      ) : currentIdeas.length === 0 ? (
        <View style={styles.loading}>
          <MaterialCommunityIcons name="lightbulb-off-outline" size={48} color={colors.textMuted} />
          <Text style={styles.loadingTitle}>Nenhuma ideia ainda</Text>
          <Text style={styles.loadingText}>Volte e selecione seus interesses para gerar.</Text>
        </View>
      ) : (
        <FlatList
          data={currentIdeas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.count}>{currentIdeas.length} modelos para voce</Text>
              <Text style={styles.hint}>Toque em um card para ver o plano completo</Text>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <IdeaCard
              idea={item}
              saved={isSaved(item.id)}
              onToggleSave={() => toggleSave(item)}
              onPress={() => router.push(`/idea/${item.id}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  loadingTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: fontSize.sm * 1.6,
  },
  list: {
    padding: spacing.md,
  },
  listHeader: {
    marginBottom: spacing.md,
    gap: 2,
  },
  count: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
  },
});
