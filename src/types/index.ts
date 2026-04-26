export type Puppy = {
    id: number,
    name: string,
    trait: string,
    imageUrl: string,
    likedBy: User['id'][]
}

type User = {
    id: number,
}