// import React from 'react'
// import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
// import PropTypes from 'prop-types'
//
// const WidgetsDropdown = (props = {}) => {
//   const {
//     summaryUser,
//     summaryFreeUser,
//     summaryPaidUser,
//     summaryDeletedUser,
//     summaryUpgradeUser,
//     summaryDowngradeUser,
//     summaryConversionPlanUser,
//     summaryAcceptedCookieUser,
//   } = props
//
//   return (
//     <CRow>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 12 }}
//           className="mb-4"
//           color="primary"
//           value={
//             <>
//               {`${summaryUser.allUser}/${summaryUser.newUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryUser.newUser / summaryUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Total/New User"
//         />
//       </CCol>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="warning"
//           value={
//             <>
//               {`${summaryFreeUser.allUser}/${summaryFreeUser.newUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryFreeUser.newUser / summaryFreeUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Total/New Free User"
//         />
//       </CCol>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="info"
//           value={
//             <>
//               {`${summaryPaidUser.allUser}/${summaryPaidUser.newUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryPaidUser.newUser / summaryPaidUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Total/New Paid User"
//         />
//       </CCol>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="danger"
//           value={
//             <>
//               {`${summaryDeletedUser.allUser}/${summaryDeletedUser.newUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryDeletedUser.newUser / summaryDeletedUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Total/New Deleted User"
//         />
//       </CCol>
//
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="info"
//           value={
//             <>
//               {`${summaryUpgradeUser.allUser}/${summaryUpgradeUser.newUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryUpgradeUser.newUser / summaryUpgradeUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Total/New Upgrade"
//         />
//       </CCol>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="dark"
//           value={
//             <>
//               {`${summaryDowngradeUser.allUser}/${summaryDowngradeUser.newUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryDowngradeUser.newUser / summaryDowngradeUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Total/New Downgrade User"
//         />
//       </CCol>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="success"
//           value={
//             <>
//               {`${summaryConversionPlanUser.conversionPlanUser}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryConversionPlanUser.conversionPlanUser / summaryConversionPlanUser.allUser) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Conversion Free to Paid"
//         />
//       </CCol>
//       <CCol sm={6} lg={3}>
//         <CWidgetStatsA
//           style={{ paddingBottom: 10 }}
//           className="mb-4"
//           color="secondary"
//           value={
//             <>
//               {`${summaryAcceptedCookieUser.accept}/${summaryAcceptedCookieUser.decline}`}{' '}
//               {/*<span className="fs-6 fw-normal">*/}
//               {/*  ({((summaryAcceptedCookieUser.accept / (summaryAcceptedCookieUser.accept + summaryAcceptedCookieUser.decline)) * 100).toFixed(1)}%)*/}
//               {/*</span>*/}
//             </>
//           }
//           title="Cookie Accept/Decline"
//         />
//       </CCol>
//     </CRow>
//   )
// }
//
// WidgetsDropdown.propTypes = {
//   summaryUser: PropTypes.object,
//   summaryFreeUser: PropTypes.object,
//   summaryPaidUser: PropTypes.object,
//   summaryDeletedUser: PropTypes.object,
//   summaryUpgradeUser: PropTypes.object,
//   summaryDowngradeUser: PropTypes.object,
//   summaryConversionPlanUser: PropTypes.object,
//   summaryAcceptedCookieUser: PropTypes.object,
// }
//
// export default WidgetsDropdown
