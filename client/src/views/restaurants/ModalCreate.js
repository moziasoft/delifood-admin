import { CModal, CForm, CFormInput, CModalBody, CModalTitle, CModalHeader, CFormLabel, CCol, CButton } from "@coreui/react"
import React, { useState } from "react"
import PropTypes from 'prop-types'

const ModalCreate = (props) => {
    const { isShow, setShow } = props;
    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        console.log('aaaa')
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
        }
        setValidated(true)
    }
    return (
        <CModal visible={isShow} onClose={() => { setShow(false) }}>
            <CModalHeader>
                <CModalTitle>Tạo cửa hàng</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm
                    className="row needs-validation"
                    noValidate
                    onSubmit={handleSubmit}
                    validated={validated}>
                    <CCol className="col-md-12 mb-3">
                        <CFormLabel>Tên cửa hàng</CFormLabel>
                        <CFormInput
                            type="text"
                            defaultValue=""
                            aria-describedby="inputGroupNameFeedback"
                            feedbackInvalid="Cần nhập tên cửa hàng"
                            label="Tên cửa hàng"
                            id="validationCustomName"
                            required
                        />
                        <div className="invalid-feedback" id="validationCustomName">Cần nhập tên cửa hàng</div>
                    </CCol>
                    <CCol className="col-md-12 mb-3">
                        <CFormLabel>Tài khoản</CFormLabel>
                        <CFormInput
                            type="text"
                            defaultValue=""
                            feedbackInvalid="Cần nhập tài khoản cửa hàng"
                            label="Tài khoản"
                            required
                            id="validationCustomUserName"
                        />
                        <div className="invalid-feedback" id="validationCustomUserName">Cần nhập tài khoản cửa hàng</div>
                    </CCol>
                    <CCol className="col-md-12 mb-3">
                        <CFormLabel>Mật khẩu</CFormLabel>
                        <CFormInput
                            type="password"
                            defaultValue=""
                            feedbackInvalid="Cần nhập mật khẩu"
                            label="Mật khẩu"
                            required
                            id="validationCustomPassword"
                        />
                        <div className="invalid-feedback" id="validationCustomPassword">Cần nhập mật khẩu</div>
                    </CCol>
                    <CCol className="col-md-12 d-flex justify-content-center">
                        <CButton color="secondary" className="me-1" onClick={() => setShow(false)}>Tắt</CButton>
                        <CButton className="ms-1" type="submit">Lưu mới</CButton>
                    </CCol>
                </CForm>
            </CModalBody>
        </CModal>
    )
}
ModalCreate.propTypes = {
    isShow: PropTypes.bool,
    setShow: PropTypes.func
}

export default ModalCreate;