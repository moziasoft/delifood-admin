import React from 'react'
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
  const { isOpen, setOpen, handleConfirm, title } = props;

  return (
    <>
      <CModal alignment="center" visible={isOpen} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title || 'Confirm'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to switch?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpen(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleConfirm}>OK</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  handleConfirm: PropTypes.func,
  title: PropTypes.string,
}

export default ConfirmModal
