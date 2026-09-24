// Powered by OnSpace.AI
import { useContext } from 'react';
import { IdeasContext } from '@/contexts/IdeasContext';

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error('useIdeas must be used within IdeasProvider');
  }
  return context;
}
