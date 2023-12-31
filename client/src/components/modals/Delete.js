import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import PropTypes from 'prop-types'

const DeleteModal = (props) => {
  const { isOpen, setOpen, handleDelete, title } = props;

  return (
    <>
      <CModal alignment="center" visible={isOpen} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title || 'Delete'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {title}
        </CModalBody>
        <CModalFooter>
          <CButton color="outline-secondary" onClick={() => setOpen(false)}>
            Tắt
          </CButton>
          <CButton color="danger" onClick={handleDelete}>Xóa</CButton>
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
