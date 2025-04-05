import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/404'

function App() {
  const navigate = useNavigate()

  const { user, authCheck, isCheckingAuth } = useAuthStore();

  console.log(isCheckingAuth, user)

  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      navigate("/login")
    }
  }, [isCheckingAuth, user])

  if (isCheckingAuth) {
    return <div className='flex justify-center items-center bg-black h-screen'>
      <Loader className='animate-spin text-red-500 size-10' />
    </div>
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!isCheckingAuth && user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={!isCheckingAuth && user ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<SearchHistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  )
}

export default App
