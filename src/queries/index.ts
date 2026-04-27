import type { Puppy, PuppyApiResponse } from '../types/index.ts';

export async function getPuppies(): Promise<Puppy[]> {
  const response = await fetch('http://dev-pups.test/api/puppies', {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
}

export async function createPuppy(
  formData: FormData
): Promise<PuppyApiResponse> {
  const response = await fetch('http://dev-pups.test/api/puppies', {
    method: 'POST',
    headers: { accept: 'application/json' },
    body: formData,
  });
  return response.json();
}

export async function toggleLikeStatus(puppyId: Puppy['id']): Promise<Puppy> {
  const response = await fetch(
    `http://dev-pups.test/api/puppies/${puppyId}/toggle-like`,
    {
      method: 'PATCH',
      headers: { accept: 'application/json' },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  const { data } = await response.json();
  return data;
}
