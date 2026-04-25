import { createContext, use, type Dispatch, type SetStateAction } from 'react';
import type { Puppy } from '../types/index.js';

export const LikedContext = createContext<{
  liked: Puppy['id'][];
  setLiked: Dispatch<SetStateAction<Puppy['id'][]>>;
} | null>(null);

export function useLiked() {
    const context = use(LikedContext);
    
    if (!context) {
        throw new Error('useLiked must be used within a LikedContext.Provider');
    }

    return context;
}