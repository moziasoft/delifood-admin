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

const ConfirmModal = (props) => {
  const { isOpen, setOpen, handleAction, title, acceptTitle, color, id, body } = props;

  return (
    <>
      <CModal alignment="center" visible={isOpen} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title || 'Delete'}</CModalTitle>
        </CModalHeader>
        {/* <CModalBody>
          {title}
        </CModalBody> */}
        <CModalFooter>
          <CButton color="outline-secondary" onClick={() => setOpen(false)}>
            Tắt
          </CButton>
          <CButton color={color} onClick={() => handleAction(id, body)}>{acceptTitle}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  handleAction: PropTypes.func,
  title: PropTypes.string,
  acceptTitle: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  body: PropTypes.object,
}

export default ConfirmModal
