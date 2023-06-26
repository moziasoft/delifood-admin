import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAlbum, cilBookmark, cilFastfood, cilKeyboard, cilRestaurant, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Quản lý nhà hàng',
    to: '/',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý món ăn',
    to: '/product',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý đặt hàng',
    to: '/order',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý User',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  }
]

export default _navAdmin
