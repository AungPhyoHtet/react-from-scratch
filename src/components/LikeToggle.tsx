import { Heart, LoaderCircle } from 'lucide-react';
import type { Puppy } from '../types/index.js';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { toggleLikeStatus } from '../queries/index.js';

export function LikeToggle({
  puppy,
  setPuppies,
}: {
  puppy: Puppy;
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}) {
  const [pending, setPending] = useState(false);

  return (
    <button
      className="group"
      onClick={async () => {
        setPending(true);
        const updatedPuppy = await toggleLikeStatus(puppy.id);
        setPuppies(updatedPuppy);
        setPending(false);
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            puppy.likedBy.includes(1)
              ? 'lucide lucide-heart fill-pink-500 stroke-none'
              : 'lucide lucide-heart stroke-slate-200 group-hover:stroke-slate-300'
          }
        />
      )}
    </button>
  );
}
