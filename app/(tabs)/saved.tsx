// Powered by OnSpace.AI
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IdeaCard } from '@/components';
import { colors, fontSize, fontWeight, spacing } from '@/constants/theme';
import { useIdeas } from '@/hooks/useIdeas';

export default function SavedScreen() {
  const router = useRouter();
  const { savedIdeas, toggleSave, isSaved } = useIdeas();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Ideias salvas</Text>
        <Text style={styles.subtitle}>
          {savedIdeas.length > 0
            ? `${savedIdeas.length} modelo(s) guardado(s)`
            : 'Guarde as ideias que mais combinam com voce'}
        </Text>
      </View>

      {savedIdeas.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="bookmark-outline" size={40} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Nada salvo ainda</Text>
          <Text style={styles.emptyText}>
            Gere ideias na aba Gerar e toque no marcador para salvar suas favoritas.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedIdeas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: 4,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
  },
  list: {
    padding: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold as '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: fontSize.sm * 1.6,
  },
});
