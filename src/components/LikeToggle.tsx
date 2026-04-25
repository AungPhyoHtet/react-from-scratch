import { Heart, Loader, LoaderCircle } from 'lucide-react';
import type { Puppy } from '../types/index.js';
import { useLiked } from '../context/liked-context.js';
import { use, useState } from 'react';

export function LikeToggle({ id }: { id: Puppy['id'] }) {
  const { liked, setLiked } = useLiked();
  const [pending, setPending] = useState(false);

  return (
    <button
      className="group"
      onClick={() => {
        setPending(true);
        setTimeout(() => {
          setLiked((liked) =>
            liked.includes(id)
              ? liked.filter((likedId) => likedId !== id)
              : [...liked, id]
          );
          setPending(false);
        }, 1500);
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            liked.includes(id)
              ? 'lucide lucide-heart fill-pink-500 stroke-none'
              : 'lucide lucide-heart stroke-slate-200 group-hover:stroke-slate-300'
          }
        />
      )}
    </button>
  );
}
