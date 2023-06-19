import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CInputGroupText,
  CCardFooter, CButton,
} from '@coreui/react'
import { CSmartPagination } from '@coreui/react-pro'
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilArrowBottom, cilArrowTop } from '@coreui/icons'

import { API_ADMIN_URL, DATE_FORMAT, USER_TYPE_MAPPING, USER_TYPE_OPTIONS } from "../../utils/constants";
import { callApi } from "../../utils/requestHelper";
import { getUserType } from '../../utils/functionHelper';
import DeleteUserModal from "../../components/modals/DeleteUser";

const UserList = () => {
  const [usersData, setUsersData] = useState({
    data: [],
    total: 0,
  })
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    search: '',
    type: '',
    sort: true,
  })

  const [userIdDelete, setUserIdDelete] = useState('');
  const [isOpenModalDelete, setOpenModalDelete] = useState(false)

  const fetchData = async (param) => {
    const newParams = {
      ...params,
      ...param,
    }
    setParams(newParams)
    const [users] = await Promise.all([
      callApi(`${API_ADMIN_URL}/users?${new URLSearchParams({ ...newParams, sort: newParams.sort ? 'desc' : 'asc' })}`, 'GET'),
    ])
    setUsersData(users)
  }

  const handleKeyPress = (target) => {
    if(target.charCode === 13){
      fetchData().catch()
    }
  }

  const handlePagination = (i) => {
    if (i === 0) return;
    fetchData({ page: i }).catch()
  }

  const handlerDeleteUser = async (password) => {
    await callApi(`${API_ADMIN_URL}/users`, 'DELETE', {
      password,
      user_id: userIdDelete,
    });
    setOpenModalDelete(false)
    await fetchData();
  }

  const moveTo = link => {
    return window.location.href = link;
  }

  useEffect(() => {
    fetchData().catch()
  }, [])

  return (
    <>
      <DeleteUserModal
        isOpen={isOpenModalDelete}
        setOpen={setOpenModalDelete}
        handleDelete={handlerDeleteUser}
        title="Delete User"
      />
      <CRow className="justify-content-between">
        <CCol md={6}>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1"><CIcon icon={cilSearch} /></CInputGroupText>
            <CFormInput
              placeholder="ID or Email"
              aria-describedby="button-addon2"
              type="text"
              onChange={e => {
                setParams({ ...params, search: e.target.value })
                if (e.target.value === '') {
                  fetchData({ ...params, search: e.target.value })
                }
              }}
              onKeyPress={handleKeyPress}
            />
          </CInputGroup>
        </CCol>
        <CCol md={2}>
          <CFormSelect
            aria-label="Default select example"
            options={USER_TYPE_OPTIONS}
            onChange={e => fetchData({ type: e.target.value })}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Users ({usersData ? usersData.total : 0})</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" className="col-1">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="col-3">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="col-3">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="col-2">Type</CTableHeaderCell>

                    <CTableHeaderCell
                      className="col-2 pointer-event"
                      scope="col"
                      style={{ cursor: 'pointer' }}
                      onClick={() => fetchData({ sort : !params.sort })}
                    >
                      Created At
                      <CIcon icon={params.sort ? cilArrowBottom : cilArrowTop }/>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="col-1">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData && usersData.data.map(userItem => (
                    <CTableRow key={userItem.id}>
                      <CTableHeaderCell scope="row">{userItem.id}</CTableHeaderCell>
                      <CTableDataCell>{userItem.email}</CTableDataCell>
                      <CTableDataCell>{userItem.name}</CTableDataCell>
                      <CTableDataCell>{USER_TYPE_MAPPING[getUserType(userItem)]}</CTableDataCell>
                      <CTableDataCell>{moment(userItem.created_at).format(DATE_FORMAT)}</CTableDataCell>
                      <CTableDataCell>
                        <CButton type="button" color="info" size="sm" onClick={() => moveTo(`/users/${userItem.id}`)}>Detail</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <CSmartPagination
                align="center"
                activePage={params.page}
                pages={Math.ceil(usersData ? usersData.total/params.limit : 1)}
                onActivePageChange={handlePagination}
              />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserList
