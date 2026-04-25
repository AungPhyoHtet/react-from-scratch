import { Heart } from 'lucide-react';
import type { Puppy } from '../types/index.js';
import { useLiked } from '../context/liked-context.js';
import { use } from 'react';

export function LikeToggle({ id }: { id: Puppy['id'] }) {
  const { liked, setLiked } = useLiked();

  return (
    <button
      className="group"
      onClick={() =>
        setLiked((liked) =>
          liked.includes(id)
            ? liked.filter((likedId) => likedId !== id)
            : [...liked, id]
        )
      }
    >
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
