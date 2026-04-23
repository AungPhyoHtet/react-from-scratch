import { PageWrapper } from './components/PageWrapper.js';
import { Container } from './components/Container.js';
import { Header } from './components/Header.js';
import { Search } from './components/Search.js';
import { Shortlist } from './components/Shortlist.js';
import { PuppiesList } from './components/PuppiesList.js';
import { NewPuppyForm } from './components/NewPuppyForm.js';

import { puppies } from './data/puppies.js'

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
  return (
    <main>
      <div className="mt-24 grid gap-8 sm:grid-cols-2">
        <Search />
        <Shortlist />
      </div>

      <PuppiesList puppies={puppies} />
      <NewPuppyForm />
    </main>
  );
}
