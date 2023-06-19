import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCardHeader,
  CCardBody,
  CCard,
  CCardFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { useParams } from "react-router-dom";
import moment from 'moment'

import { API_ADMIN_URL, DATE_FORMAT, USER_TYPE_MAPPING } from "../../utils/constants";
import { callApi } from "../../utils/requestHelper";
import { getUserType, getUserExpireAt } from '../../utils/functionHelper';
import DeleteUserModal from "../../components/modals/DeleteUser";
import PropTypes from "prop-types";

const UpgradeFamilyMemberModal = (props) => {
  const { isOpen, setOpen, handleUpgrade, title } = props;
  const [expireDate, setExpireDate] = useState('')
  const [password, setPassword] = useState('');
  const minExpireDate = moment().format('YYYY-MM-DD')

  const onUpgrade = () => {
    handleUpgrade(password, expireDate)
  }

  return (
    <>
      <CModal alignment="center" visible={isOpen} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title || 'Upgrade'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <CFormLabel>Simcode Family Expire Time</CFormLabel>
            <CFormInput
              onChange={e => setExpireDate(e.target.value)}
              type="date"
              min={minExpireDate}
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Admin Password</CFormLabel>
            <CFormInput
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpen(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={onUpgrade}>Upgrade</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [isOpenModalDelete, setOpenModalDelete] = useState(false)
  const [isOpenModalUpgrade, setOpenModalUpgrade] = useState(false)

  const fetchData = async () => {
    const [user] = await Promise.all([
      callApi(`${API_ADMIN_URL}/users-detail/${id}`, 'GET'),
    ])
    setUserDetail(user)
  }

  const handlerDeleteUser = async (password) => {
    await callApi(`${API_ADMIN_URL}/users`, 'DELETE', {
      password,
      user_id: userDetail.id,
    });
    setOpenModalDelete(false)
    window.location.href = '/users'
  }

  const handlerUpgradeFamilyMember = async (password, expireDate) => {
    await callApi(`${API_ADMIN_URL}/users-upgrade-family`, 'POST', {
      password,
      user_id: userDetail.id,
      expire_date: expireDate,
    });
    setOpenModalUpgrade(false)
    await fetchData()
  }

  useEffect(() => {
    fetchData().catch(console.log)
  }, [])

  return (
    <>
      <DeleteUserModal
        isOpen={isOpenModalDelete}
        setOpen={setOpenModalDelete}
        handleDelete={handlerDeleteUser}
        title="Delete User"
      />
      <UpgradeFamilyMemberModal
        isOpen={isOpenModalUpgrade}
        setOpen={setOpenModalUpgrade}
        handleUpgrade={handlerUpgradeFamilyMember}
        title="Upgrade Simcode Family"
      />
      <CRow className="justify-content-between">
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>User Detail</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-3">ID</CTableHeaderCell>
                    <CTableDataCell>{userDetail.id}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-3">Email</CTableHeaderCell>
                    <CTableDataCell>{userDetail.email}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-3">Name</CTableHeaderCell>
                    <CTableDataCell>{userDetail.name}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-3">Created At</CTableHeaderCell>
                    <CTableDataCell>{moment(userDetail.created_at).format(DATE_FORMAT)}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-3">Type</CTableHeaderCell>
                    <CTableDataCell>{USER_TYPE_MAPPING[getUserType(userDetail)]}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row" className="col-3">{USER_TYPE_MAPPING[getUserType(userDetail)]} Expire At</CTableHeaderCell>
                    <CTableDataCell>{moment(getUserExpireAt(userDetail)).format(DATE_FORMAT)}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <div>
                <CButton color="danger" onClick={() => setOpenModalDelete(true)}>Delete</CButton>
                <CButton color="primary" style={{ marginLeft: 5 }} onClick={() => setOpenModalUpgrade(true)}>Upgrade Simcode Family</CButton>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

UpgradeFamilyMemberModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  handleUpgrade: PropTypes.func,
  title: PropTypes.string,
}

export default UserDetail
