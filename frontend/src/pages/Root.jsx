import React from 'react'
// useNavigation lets us know about the state of smth (loading, done, error, etc)
import { Outlet, useNavigation } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

const Root = () => {
  // const navigation = useNavigation()

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default Root