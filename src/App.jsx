
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      {/* page-offset compensates for the fixed navbar so content never hides underneath it */}
      <main className="page-offset flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
