import React from 'react'
import { Outlet } from 'react-router-dom'
import EventsNavigation from '../components/EventsNavigation'

const EventsRootPage = () => {
  return (
    <div>
      <EventsNavigation />
      <Outlet />
    </div>
  )
}

export default EventsRootPage