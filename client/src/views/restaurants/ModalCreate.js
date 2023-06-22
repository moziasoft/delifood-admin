import { CModal, CForm, CFormInput, CModalBody, CModalTitle, CModalHeader, CFormLabel, CCol, CButton } from "@coreui/react"
import React, { useState } from "react"
import PropTypes from 'prop-types'
import { API_URL } from "src/utils/constants";
import { callApi } from "src/utils/requestHelper";

const ModalCreate = (props) => {
    const { isShow, setShow, setLoading, getData } = props;
    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity() === false) {

        } else {
            console.log(form.elements)
            let body = { name: "", username: "", password: "" }
            for (const ele of form.elements) {
                if (typeof (body[ele.name]) != "undefined") {
                    body[ele.name] = ele.value;
                }
            }
            console.log(body)
            createRestaurant(body);
        }

        setValidated(true)
    }
    const createRestaurant = async (body) => {
        try {
            setLoading(true)
            await callApi(`${API_URL}/restaurant`, "POST", body)
            await getData();
            setShow(false)
        } catch (e) {
            setLoading(false)
            setShow(false)
        }
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
                            name="name"
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
                            name="username"
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
                            name="password"
                            id="validationCustomPassword"
                        />
                        <div className="invalid-feedback" id="validationCustomPassword">Cần nhập mật khẩu</div>
                    </CCol>
                    <CCol className="col-md-12 d-flex justify-content-center">
                        <CButton color="outline-secondary" className="me-1" onClick={() => setShow(false)}>Tắt</CButton>
                        <CButton className="ms-1" type="submit">Lưu mới</CButton>
                    </CCol>
                </CForm>
            </CModalBody>
        </CModal>
    )
}
ModalCreate.propTypes = {
    isShow: PropTypes.bool,
    setShow: PropTypes.func,
    setLoading: PropTypes.func,
    getData: PropTypes.func
}

export default ModalCreate;