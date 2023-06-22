import React from 'react'

const Restaurant = React.lazy(() => import('./views/restaurants'))
const User = React.lazy(() => import('./views/users'))

const routes = [
  { path: '/restaurant', name: 'Dashboard1', element: Restaurant, exact: true },
  { path: '/', name: 'Dashboard2', element: Restaurant, exact: true },
  { path: '/user', name: 'User', element: User, exact: true },
]

export default routes
