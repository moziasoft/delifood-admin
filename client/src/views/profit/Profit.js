import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCardHeader,
  CCardBody,
  CCard, CInputGroup, CFormInput, CButton, CFormCheck, CButtonGroup,
} from '@coreui/react'
import moment from 'moment'

import { API_ADMIN_URL, DATE_FORMAT } from "../../utils/constants";
import { callApi } from "../../utils/requestHelper";

const UserDetail = () => {
  const [totalProfit, setTotalProfit] = useState(0);
  const [startDate, setStartDate] = useState(moment().format(DATE_FORMAT))
  const [endDate, setEndDate] = useState(moment().format(DATE_FORMAT))

  const fetchData = async () => {
    const result = await callApi(`${API_ADMIN_URL}/profit?startDate=${startDate}&endDate=${endDate}`, 'GET')
    setTotalProfit(result ? result.total : 0);
  }

  useEffect(() => {
    fetchData().catch(console.log)
  }, [startDate])

  return (
    <>
      <CRow>
        <CCol>
          <CFormCheck inline type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Daily" onClick={() => setStartDate(moment().format(DATE_FORMAT))} defaultChecked/>
          <CFormCheck inline type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Weekly" onClick={() => setStartDate(moment().subtract(1, 'week').format(DATE_FORMAT))} />
          <CFormCheck inline type="radio" name="flexRadioDefault" id="flexRadioDefault3" label="Monthly" onClick={() => setStartDate(moment().subtract(1, 'month').format(DATE_FORMAT))} />
          <CFormCheck inline type="radio" name="flexRadioDefault" id="flexRadioDefault4" label="Yearly" onClick={() => setStartDate(moment().subtract(1, 'year').format(DATE_FORMAT))} />
        </CCol>
      </CRow>
      <CRow>
        <CInputGroup className="mb-3">
          <CCol md='2'>
            <CFormInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </CCol>
          <CCol md='2' style={{ marginLeft: 5 }}>
            <CFormInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CCol>
          <CCol style={{ marginLeft: 5 }}>
            <CButton type="button" color="primary" onClick={fetchData}>
              Submit
            </CButton>
          </CCol>
        </CInputGroup>
      </CRow>
      <CRow className="justify-content-between">
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Profit</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-1">Total</CTableHeaderCell>
                    <CTableDataCell>{totalProfit ? totalProfit.toFixed(2) : 0} USD</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserDetail
