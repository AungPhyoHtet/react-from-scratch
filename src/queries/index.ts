export async function fetchDummyAPI() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
