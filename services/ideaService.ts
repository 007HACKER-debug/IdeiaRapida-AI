// Powered by OnSpace.AI
// Pure data operations. Simulates an AI generating business models from interests.

import { ideaTemplates, IdeaTemplate } from '@/data/ideaTemplates';
import { interests } from '@/data/interests';
import { BusinessIdea } from '@/types';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickBrand(names: string[]): { primary: string; alternatives: string[] } {
  const shuffled = shuffle(names);
  return { primary: shuffled[0], alternatives: shuffled.slice(1) };
}

function templateToIdea(template: IdeaTemplate): BusinessIdea {
  const category = interests.find((i) => i.id === template.categoryId);
  const brand = pickBrand(template.brandNames);
  const uniqueId = `${template.templateId}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    id: uniqueId,
    templateId: template.templateId,
    categoryId: template.categoryId,
    categoryLabel: category?.label ?? 'Negocio',
    categoryIcon: category?.icon ?? 'lightbulb-on',
    title: template.title,
    brandName: brand.primary,
    brandAlternatives: brand.alternatives,
    tagline: template.tagline,
    targetAudience: template.targetAudience,
    profitLevel: template.profitLevel,
    monthlyRevenue: template.monthlyRevenue,
    startupCost: template.startupCost,
    difficulty: template.difficulty,
    monetization: template.monetization,
    actionPlan: template.actionPlan,
  };
}

/**
 * Simulated AI generation: matches templates to selected interests,
 * fills with variety, and returns 3-5 business ideas.
 */
export async function generateIdeas(selectedInterestIds: string[]): Promise<BusinessIdea[]> {
  // Simulate model latency
  await new Promise((resolve) => setTimeout(resolve, 1600));

  const matched = ideaTemplates.filter((t) => selectedInterestIds.includes(t.categoryId));
  let pool = matched.length > 0 ? matched : ideaTemplates;

  pool = shuffle(pool);

  // Ensure at least 4 ideas by topping up from the full library if needed.
  if (pool.length < 4) {
    const extras = shuffle(ideaTemplates.filter((t) => !pool.includes(t)));
    pool = [...pool, ...extras];
  }

  const count = Math.min(5, Math.max(3, pool.length));
  return pool.slice(0, count).map(templateToIdea);
}

export function profitLabel(level: BusinessIdea['profitLevel']): string {
  if (level === 'Alto') return 'Alto potencial';
  if (level === 'Medio') return 'Potencial medio';
  return 'Potencial inicial';
}
