import { useState, type Dispatch, type SetStateAction } from 'react';
import type { Puppy } from '../types/index.js';
import { useFormStatus } from 'react-dom';
import { createPuppy } from '../queries/index.js';

export function NewPuppyForm({
  puppies,
  setPuppies,
}: {
  puppies: Puppy[];
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}) {
  const [name, setName] = useState<string>('');
  const [trait, setTrait] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  return (
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
      <form
        action={async (formData: FormData) => {
          const response = await createPuppy(formData);
          if (response.errors) {
            setErrors(response.errors);
            return;
          }
          if (response.data) {
            setPuppies([...puppies, response.data]);
            setErrors({});
          }
          setName('');
          setTrait('');
        }}
        className="mt-4 flex w-full flex-col items-start gap-4"
      >
        <div className="grid w-full gap-6 md:grid-cols-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name[0]}</p>
            )}
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="trait">Personality trait</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="trait"
              type="text"
              name="trait"
              value={trait}
              onChange={(e) => setTrait(e.target.value)}
            />
            {errors.trait && (
              <p className="text-sm text-red-500">{errors.trait[0]}</p>
            )}
          </fieldset>
          <fieldset className="col-span-2 flex w-full flex-col gap-1">
            <label htmlFor="avatar_url">Profile pic</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="avatar_url"
              type="file"
              name="avatar_url"
            />
            {errors.avatar_url && (
              <p className="text-sm text-red-500">{errors.avatar_url[0]}</p>
            )}
          </fieldset>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const status = useFormStatus();

  return (
    <button
      className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      type="submit"
      disabled={status.pending}
    >
      {status.pending
        ? `Adding ${status.data?.get('name') || 'puppy'} ...`
        : 'Add puppy'}
    </button>
  );
}
