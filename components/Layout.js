import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'

function Layout({children}) {


  const [loggedIn,setLoggedIn] = React.useState(false)
  const [loading,setLoading] = React.useState(false)


  React.useEffect(() => {
    let token = localStorage.getItem('profile')
    if(token) {
      setLoggedIn(true)
    }  
  },[])


    if(loggedIn == false) {
        return <Login setLoggedIn={setLoggedIn} />
    }

  return (
    <>
        <Header/>
        {children}
        {/* <Footer /> */}
    </>
  )
}

export default Layout