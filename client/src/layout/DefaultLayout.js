import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { API_URL, ROLE } from 'src/utils/constants'
import { callApi } from 'src/utils/requestHelper'

const DefaultLayout = () => {
  const [isSuperAdmin, setSuperAdmin] = useState(null)
  useEffect(() => {
    callApi(`${API_URL}/user/${localStorage.getItem('jwt')}`).then(result => {
      if (result?.body?.role === ROLE.superAdmin) {
        setSuperAdmin(true)
      } else {
        setSuperAdmin(false)
      }
    }).catch(e => {
      window.location.href = '/login';
    })
  })
  if (!localStorage.getItem('jwt')) {
    window.location.href = '/login';
    return;
  }

  return (
    <div>
      <AppSidebar isSuperAdmin={isSuperAdmin} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {isSuperAdmin !== null ?
            < AppContent isSuperAdmin={isSuperAdmin} /> : null
          }
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
