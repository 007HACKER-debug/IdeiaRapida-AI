// Powered by OnSpace.AI
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { BusinessIdea } from '@/types';
import { generateIdeas } from '@/services/ideaService';

const SAVED_KEY = '@ideiarapida/saved';
const PREMIUM_KEY = '@ideiarapida/premium';

interface IdeasContextType {
  currentIdeas: BusinessIdea[];
  savedIdeas: BusinessIdea[];
  isGenerating: boolean;
  isPremium: boolean;
  lastInterests: string[];
  generate: (interestIds: string[]) => Promise<void>;
  getIdeaById: (id: string) => BusinessIdea | undefined;
  toggleSave: (idea: BusinessIdea) => void;
  isSaved: (id: string) => boolean;
  unlockPremium: () => void;
}

export const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export function IdeasProvider({ children }: { children: ReactNode }) {
  const [currentIdeas, setCurrentIdeas] = useState<BusinessIdea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [lastInterests, setLastInterests] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [savedRaw, premiumRaw] = await Promise.all([
          AsyncStorage.getItem(SAVED_KEY),
          AsyncStorage.getItem(PREMIUM_KEY),
        ]);
        if (savedRaw) setSavedIdeas(JSON.parse(savedRaw));
        if (premiumRaw === 'true') setIsPremium(true);
      } catch (e) {
        // ignore storage errors
      }
    })();
  }, []);

  const persistSaved = useCallback(async (ideas: BusinessIdea[]) => {
    try {
      await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(ideas));
    } catch (e) {
      // ignore
    }
  }, []);

  const generate = useCallback(async (interestIds: string[]) => {
    setIsGenerating(true);
    setLastInterests(interestIds);
    try {
      const ideas = await generateIdeas(interestIds);
      setCurrentIdeas(ideas);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const getIdeaById = useCallback(
    (id: string) => [...currentIdeas, ...savedIdeas].find((i) => i.id === id),
    [currentIdeas, savedIdeas]
  );

  const isSaved = useCallback((id: string) => savedIdeas.some((i) => i.id === id), [savedIdeas]);

  const toggleSave = useCallback(
    (idea: BusinessIdea) => {
      setSavedIdeas((prev) => {
        const exists = prev.some((i) => i.id === idea.id);
        const next = exists
          ? prev.filter((i) => i.id !== idea.id)
          : [{ ...idea, savedAt: Date.now() }, ...prev];
        persistSaved(next);
        return next;
      });
    },
    [persistSaved]
  );

  const unlockPremium = useCallback(() => {
    setIsPremium(true);
    AsyncStorage.setItem(PREMIUM_KEY, 'true').catch(() => {});
  }, []);

  return (
    <IdeasContext.Provider
      value={{
        currentIdeas,
        savedIdeas,
        isGenerating,
        isPremium,
        lastInterests,
        generate,
        getIdeaById,
        toggleSave,
        isSaved,
        unlockPremium,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
}
