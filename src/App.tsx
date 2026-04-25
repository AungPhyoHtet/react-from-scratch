import { PageWrapper } from './components/PageWrapper.js';
import { Container } from './components/Container.js';
import { Header } from './components/Header.js';
import { Search } from './components/Search.js';
import { Shortlist } from './components/Shortlist.js';
import { PuppiesList } from './components/PuppiesList.js';
import { NewPuppyForm } from './components/NewPuppyForm.js';

import { puppies as puppiesData } from './data/puppies.js';
import { useState } from 'react';
import type { Puppy } from './types/index.js';
import { LikedContext } from './context/liked-context.js';

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header />
        <Main />
      </Container>
    </PageWrapper>
  );
}

function Main() {
  const [liked, setLiked] = useState<Puppy['id'][]>(
    puppiesData.filter((puppy) => puppy.liked).map((puppy) => puppy.id)
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [puppies, setPuppies] = useState<Puppy[]>(puppiesData);

  return (
    <main>
      <LikedContext value={{ liked, setLiked }}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist puppies={puppies} />
        </div>

        <PuppiesList searchQuery={searchQuery} puppies={puppies} />
      </LikedContext>
      <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
    </main>
  );
}
