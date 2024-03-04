import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='4794244194-m0813a5hn12bggn8tfnonnmb9c72fr23.apps.googleusercontent.com'>
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
