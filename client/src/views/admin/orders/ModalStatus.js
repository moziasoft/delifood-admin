import { CModal, CForm, CFormInput, CModalBody, CModalTitle, CModalHeader, CFormLabel, CCol, CButton, CRow, CFormSelect } from "@coreui/react"
import React, { useState } from "react"
import PropTypes from 'prop-types'
import { API_URL, S3_URL, STATUS_ORDER_DATA } from "src/utils/constants";
import { callApi, callApiWithFile } from "src/utils/requestHelper";
import { toast } from "react-toastify";

const ModalStatus = (props) => {
    const { isShow, setShow, setLoading, getData, order } = props;
    const [validated, setValidated] = useState(false)
    const [status, setStatus] = useState(order.statusOrder)
    console.log(status)
    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget

        if (form.checkValidity() === false) {

        } else {
            updateStatus({ statusOrder: status === "Đang chờ xác nhận" ? 0 : status });
        }
        setValidated(true)
    }

    const updateStatus = async (body) => {
        try {
            setLoading(true)
            const result = await callApi(`${API_URL}/order/status/${order.id}`, "PATCH", body)
            await getData();
            setShow(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setShow(false)
        }
    }


    return (
        <CModal visible={isShow} onClose={() => { setShow(false) }}>
            <CModalHeader>
                <CModalTitle>Chỉnh sửa trạng thái</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm
                    className="needs-validation"
                    noValidate
                    onSubmit={handleSubmit}
                    validated={validated}>
                    <CRow>
                        <CCol className="col-md-12 mb-3">
                            <CFormLabel>Trạng thái</CFormLabel>
                            <CFormSelect
                                options={STATUS_ORDER_DATA}
                                name="statusOrder"
                                required
                                value={status}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setStatus(e.target.value)
                                }}
                            />
                        </CCol>
                        <CCol className="col-md-12 d-flex justify-content-center">
                            <CButton color="outline-secondary" className="me-1" onClick={() => setShow(false)}>Tắt</CButton>
                            <CButton className="ms-1" type="submit">Chỉnh sửa</CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}
ModalStatus.propTypes = {
    isShow: PropTypes.bool,
    setShow: PropTypes.func,
    setLoading: PropTypes.func,
    getData: PropTypes.func,
    order: PropTypes.object,
}

export default ModalStatus;