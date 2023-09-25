import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { store } from './store/store'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AppHeader } from './cmp/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<AboutPage />} path="/about" />
              <Route element={<DashboardPage />} path="/dashboard" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<LoginPage />} path="/login" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}