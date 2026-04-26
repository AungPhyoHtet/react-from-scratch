import type { Puppy } from '../types/index.js';

export const puppies: Puppy[] = [
  {
    id: 1,
    name: 'Frisket',
    trait: 'Mother of all pups',
    likedBy: [],
    imageUrl: '/images/1.jpg',
  },
  {
    id: 2,
    name: 'Chase',
    trait: 'Very good boi',
    likedBy: [1],
    imageUrl: '/images/2.jpg',
  },
  {
    id: 3,
    name: 'Leia',
    trait: 'Enjoys naps',
    likedBy: [1],
    imageUrl: '/images/3.jpg',
  },
  {
    id: 4,
    name: 'Pupi',
    trait: 'Loves cheese',
    likedBy: [],
    imageUrl: '/images/4.jpg',
  },
  {
    id: 5,
    name: 'Russ',
    trait: 'Ready to save the world',
    likedBy: [],
    imageUrl: '/images/5.jpg',
  },
  {
    id: 6,
    name: 'Yoko',
    trait: 'Ready for anything',
    likedBy: [],
    imageUrl: '/images/6.jpg',
  },
];
