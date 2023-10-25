import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'

function Layout({children}) {


    const [loggedIn,setLoggedIn] = React.useState(true)

    if(!loggedIn) {
        return <Login />
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