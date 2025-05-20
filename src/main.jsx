import './assets/styles/index.scss';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { StrictMode } from 'react'
import App from './App.jsx'
import store from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
