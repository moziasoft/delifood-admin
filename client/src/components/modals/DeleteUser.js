import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter, CFormInput, CFormLabel,
} from '@coreui/react'
import PropTypes from 'prop-types'

const DeleteModal = (props) => {
  const { isOpen, setOpen, handleDelete, title } = props;
  const [password, setPassword] = useState('');

  return (
    <>
      <CModal alignment="center" visible={isOpen} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title || 'Delete'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel htmlFor="basic-url">To confirm deletion, type password in the text input field.</CFormLabel>
          <CFormInput
            aria-describedby="button-addon2"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpen(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(password)}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  handleDelete: PropTypes.func,
  title: PropTypes.string,
}

export default DeleteModal
