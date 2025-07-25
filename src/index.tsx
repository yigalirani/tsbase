import {useState,useEffect} from  'react'
import ReactDOM from 'react-dom/client'

function AppCount(){
          const [count, setCount] = useState(0);

  return <div>
      <h1 onMouseDown={() => setCount(count + 1)}>Count: {count}</h1>
    </div>

}

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function Timer({ startMs }: { startMs: number }) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(Date.now() - startMs);
    }, 10); // update every 10ms

    return () => clearInterval(interval);
  }, [startMs]);

  return (
    <div>
      <h1>Elapsed Time</h1>
      <p>{diff} ms</p>
    </div>
  );
}
const urls=[
  'https://api.github.com/repos/TanStack/query',
  'https://api.github.com/repos/yigalirani/homelayer'

]
interface SelectUrlProps {
  set_url: (url: string) => void;
}

function SelectUrl({ set_url }: SelectUrlProps) {
  return (
    <select onChange={(e) => set_url(e.target.value)}>
      {urls.map((url, index) => (
        <option key={index} value={url}>
          {url}
        </option>
      ))}
    </select>
  );
}
function Example() {
  const [url,set_url]=useState(urls[0])
  const select=SelectUrl({set_url})
  const ret = useQuery({
    queryKey: ['repoData',url],
    queryFn: async () => {
      const response = await fetch(url)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return await response.json()
    },
  })
  console.log({ret})
  const{ isPending, error, data, isFetching }=ret
  if (isPending) return <div>{select}'Loading...'</div>

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <button onClick={()=>queryClient.invalidateQueries()}>invlidate</button>
      {select}
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <pre>{JSON.stringify(ret,null,2)}</pre>      
    </div>
  )
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Example />
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)
