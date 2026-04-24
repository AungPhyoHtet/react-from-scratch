import { Heart } from 'lucide-react';
import * as React from 'react';
import type { Puppy } from '../types/index.js';
import type { Dispatch, SetStateAction } from 'react';

export function LikeToggle({
  id,
  liked,
  setLiked,
}: {
  id: Puppy['id'];
  liked: Puppy['id'][];
  setLiked: Dispatch<SetStateAction<Puppy['id'][]>>;
}) {
  return (
    <button className="group" onClick={() =>
      setLiked((liked) => liked.includes(id)
        ? liked.filter((likedId) => likedId !== id)
        : [...liked, id])
    }>
      <Heart
        className={
          liked.includes(id)
            ? 'lucide lucide-heart fill-pink-500 stroke-none'
            : 'lucide lucide-heart stroke-slate-200 group-hover:stroke-slate-300'
        }
      />
    </button>
  );
}
