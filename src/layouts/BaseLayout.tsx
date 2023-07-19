import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useAuthContext } from '@/hooks/context'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  const { 
    state:{currentUser},
    getCurrentUser 
  } = useAuthContext()

  useEffect(() => {
    if(currentUser?.username==null){
      getCurrentUser()
    }
  }, [])

  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default BaseLayout
