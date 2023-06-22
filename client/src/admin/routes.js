import React from 'react'

const Restaurant = React.lazy(() => import('../views/admin/restaurants'))
const Product = React.lazy(() => import('../views/admin/products'))

const routesAdmin = [
  { path: '/restaurant', name: 'Dashboard1', element: Restaurant, exact: true },
  { path: '/', name: 'Dashboard2', element: Restaurant, exact: true },
  { path: '/product', name: 'Product', element: Product, exact: true },
]

export default routesAdmin
