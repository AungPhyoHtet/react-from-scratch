import { PageWrapper } from './components/PageWrapper.js';
import { Container } from './components/Container.js';
import { Header } from './components/Header.js';
import { Search } from './components/Search.js';
import { Shortlist } from './components/Shortlist.js';
import { PuppiesList } from './components/PuppiesList.js';
import { NewPuppyForm } from './components/NewPuppyForm.js';

import { Suspense, use, useState } from 'react';
import type { Puppy } from './types/index.js';
import { LikedContext } from './context/liked-context.js';
import { LoaderCircle } from 'lucide-react';
import { getPuppies } from './queries/index.js';
import { ErrorBoundary } from 'react-error-boundary';

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header />
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className="mt-12 bg-red-100 p-6 shadow ring ring-black/5">
              <p className="text-red-500">
                {error instanceof Error ? error.message : String(error)}
              </p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
                <LoaderCircle className="animate-spin stroke-slate-300" />
              </div>
            }
          >
            <Main />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </PageWrapper>
  );
}

const puppyPromise = getPuppies();

function Main() {
  const apiPuppies = use(puppyPromise);

  const [liked, setLiked] = useState<number[]>(
    apiPuppies.filter((puppy) => puppy.likedBy.includes(1)).map((puppy) => puppy.id)
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [puppies, setPuppies] = useState<Puppy[]>(apiPuppies);

  return (
    <main>
      <LikedContext value={{ liked, setLiked }}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist puppies={puppies} setPuppies={setPuppies} />
        </div>

        <PuppiesList searchQuery={searchQuery} puppies={puppies} setPuppies={setPuppies} />
      </LikedContext>
      <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
    </main>
  );
}

// function ApiPuppies() {
//   const [apiPuppies, setApiPuppies] = useState<[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     async function fetchPuppies() {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           'https://jsonplaceholder.typicode.com/users'
//         );
//         if (!response.ok) {
//           const errorData = await response.json();
//           setError(`${errorData.message} : ${errorData.details}`);
//           throw errorData;
//         }
//         const data = await response.json();
//         setApiPuppies(data);
//       } catch (error) {
//         console.error('Error fetching puppies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchPuppies();
//   }, []);

//   return (
//     <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
//       {isLoading && <LoaderCircle className="animate-spin stroke-slate-300" />}
//       {apiPuppies.length > 0 && (
//         <pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// }
