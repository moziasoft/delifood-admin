import React from 'react'

const Restaurant = React.lazy(() => import('./views/restaurants'))

const routes = [
  { path: '/dashboard', name: 'Dashboard1', element: Restaurant, exact: true },
  { path: '/', name: 'Dashboard2', element: Restaurant, exact: true },
]

export default routes
