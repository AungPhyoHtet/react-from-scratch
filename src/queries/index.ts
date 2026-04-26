import type { Puppy } from '../types/index.ts';

export async function getPuppies(): Promise<Puppy[]> {
  const response = await fetch('http://dev-pups.test/api/puppies', {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function toggleLikeStatus(puppyId: Puppy['id']): Promise<Puppy[]> {
  const response = await fetch(`http://dev-pups.test/api/puppies/${puppyId}/toggle-like`, {
    method: 'PATCH',
    headers: { accept: 'application/json' },
  });
  const { data } = await response.json();
  
  // Ensure this returns an array, not an object
  return data; 
}