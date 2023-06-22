import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import PropTypes from 'prop-types'

// routes config
import routes from '../routes'
import routesAdmin from '../admin/routes'

const AppContent = ({ isSuperAdmin }) => {
  const rs = isSuperAdmin ? routes : routesAdmin;
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {rs.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}
AppContent.propTypes = {
  isSuperAdmin: PropTypes.bool
}

export default React.memo(AppContent)
