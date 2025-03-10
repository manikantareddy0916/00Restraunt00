import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from './store/configureStore.js'

const store= configureStore()
//console.log('getState',store.getState())


store.subscribe(()=>{
  console.log('subscribe',store.getState())
})
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
