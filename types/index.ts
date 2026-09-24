// Powered by OnSpace.AI

export type ProfitLevel = 'Alto' | 'Medio' | 'Baixo';

export interface Interest {
  id: string;
  label: string;
  icon: string; // MaterialCommunityIcons name
  color: string;
}

export interface BusinessIdea {
  id: string;
  templateId: string;
  categoryId: string;
  categoryLabel: string;
  categoryIcon: string;
  title: string;
  brandName: string;
  brandAlternatives: string[];
  tagline: string;
  targetAudience: string;
  profitLevel: ProfitLevel;
  monthlyRevenue: string;
  startupCost: string;
  difficulty: string;
  monetization: string[];
  actionPlan: string[];
  savedAt?: number;
}
