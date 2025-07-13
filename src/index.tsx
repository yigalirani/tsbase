import * as React from 'react'
import ReactDOM from 'react-dom/client'
function App(){
          const [count, setCount] = React.useState(0);

  return <div>
      <h1 onMouseDown={() => setCount(count + 1)}>Count: {count}</h1>
    </div>

}
const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)