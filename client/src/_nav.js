import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAlbum, cilKeyboard, cilRestaurant, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Quản lý nhà hàng',
    to: '/',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý User',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Quản lý danh mục',
  //   to: '/categories',
  //   icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Quản lý từ khóa',
    to: '/keywords',
    icon: <CIcon icon={cilKeyboard} customClassName="nav-icon" />,
  }
]

export default _nav
