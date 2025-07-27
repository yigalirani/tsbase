import React,{useState,useEffect} from  'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtoolsPanel,ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
function Devtools() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <button
        onClick={() => setIsOpen(!isOpen)}
      >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  )
}
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
function reorder(a:object){
  const {data}=a
  return [{...a,data:''},data]
}
export async function fetch_json(url:string){
  const res=await fetch(url)
  const text=await res.text()
  const ans=JSON.parse(text)
  return ans as object
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
    staleTime:4000
  })
  console.log({ret})
  const{ isPending, error, data, isFetching,isStale }=ret
  if (isPending) return <div>{select}'Loading...'<Devtools/></div>

  if (error) return 'An error has occurred: ' + error.message
  function invalidate_it(){
    queryClient.invalidateQueries()
  }
  return (
    <div>
      <button onClick={invalidate_it}>invlidate</button>
      {select}
      <Devtools/>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
            <div>isStale:{isStale+''}</div>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <pre>{JSON.stringify(reorder(ret),null,2)}</pre>      
    </div>
  )
}




import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';


const schemaUrls = [
  { label: 'addr', url: 'http://localhost:82/addr.json' }
];


function SchemaForm() {
  const [selectedUrl, setSelectedUrl] = useState(schemaUrls[0].url);
const [formData, setFormData] = React.useState(null);
  const { data: schema, isLoading, isError, error } = useQuery({
    queryKey: ['schema', selectedUrl],
    queryFn: ()=>fetch_json(selectedUrl)
  });

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUrl(e.target.value);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Dynamic JSON Schema Form</h1>
      <pre>
        {JSON.stringify(formData,null,2)}
      </pre>
      <label>
        Choose Schema:
        <select value={selectedUrl} onChange={handleSelectChange}>
          {schemaUrls.map(({ label, url }) => (
            <option key={url} value={url}>{label}</option>
          ))}
        </select>
      </label>

      {isLoading && <p>Loading schema...</p>}
      {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}
      {!isLoading && !isError && schema && (
        <Form  liveValidate={true} formData={formData} schema={schema} validator={validator}  onChange={(e) => setFormData(e.formData)} onSubmit={({ formData }) => console.log('Submitted:', formData)} />
      )}
    </div>
  );
}


///////////



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='splitter'>
        <div>
          <ReactQueryDevtools />
          <Example />
        </div>
        <SchemaForm/>
      </div>
    
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)
