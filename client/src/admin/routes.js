import React from 'react'

const Restaurant = React.lazy(() => import('../views/admin/restaurants'))
const Product = React.lazy(() => import('../views/admin/products'))
const Order = React.lazy(() => import('../views/admin/orders'))

const routesAdmin = [
  { path: '/restaurant', name: 'Dashboard1', element: Restaurant, exact: true },
  { path: '/', name: 'Dashboard2', element: Restaurant, exact: true },
  { path: '/product', name: 'Product', element: Product, exact: true },
  { path: '/order', name: 'Order', element: Order, exact: true },
]

export default routesAdmin
