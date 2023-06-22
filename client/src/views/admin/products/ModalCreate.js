import { CModal, CForm, CFormInput, CModalBody, CModalTitle, CModalHeader, CFormLabel, CCol, CButton, CRow } from "@coreui/react"
import React, { useState } from "react"
import PropTypes from 'prop-types'
import { API_URL, S3_URL } from "src/utils/constants";
import { callApi, callApiWithFile } from "src/utils/requestHelper";
import { toast } from "react-toastify";

const ModalCreate = (props) => {
  const { isShow, setShow, setLoading, getData, data } = props;
  const [validated, setValidated] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [name, setName] = useState(data?.name || "")
  const [price, setPrice] = useState(data?.price || "")
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget

    if (form.checkValidity() === false) {

    } else {
      const body = { name, price, image: imageFile ? "" : data?.image || "" }
      if (data) {
        updateProduct(body)
      } else {
        createProduct(body);
      }
    }

    setValidated(true)
  }
  const createProduct = async (body) => {
    try {
      setLoading(true)
      const result = await callApiWithFile(`${API_URL}/product`, "POST", body, imageFile ? { image: [imageFile] } : null)
      if (result.status === 200) {
      }
      await getData();
      setShow(false)
    } catch (e) {
      setLoading(false)
      setShow(false)
    }
  }

  const updateProduct = async (body) => {
    try {
      setLoading(true)
      const result = await callApiWithFile(`${API_URL}/product/${data._id}`, "PUT", body, imageFile ? { image: [imageFile] } : null)
      await getData();
      if (result.status === 200) {

      }
      setShow(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setShow(false)
    }
  }

  const changeImage = async (event) => {
    const fileList = event.target.files;
    const file = fileList[0]
    if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
      return toast.error('Chỉ được đăng hình ảnh');
    }
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = await (e => {
      let filePath = e.target.result;
      console.log(filePath)
      setImageSrc(filePath);
    });
    setImageFile(file);
  }
  return (
    <CModal visible={isShow} onClose={() => { setShow(false) }}>
      <CModalHeader>
        <CModalTitle>Tạo cửa hàng</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
          validated={validated}>
          <CRow>
            <CCol md={12} className="mb-3">
              <div>
                {imageSrc || data?.image ?
                  <img className="w-100" src={imageSrc || `${S3_URL}/${data?.image}`}></img> : null}
              </div>

              <CFormInput type="file" onChange={changeImage} />
            </CCol>
            <CCol className="col-md-12 mb-3">
              <CFormLabel>Tên món ăn</CFormLabel>
              <CFormInput
                type="text"
                defaultValue=""
                name="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập tên cửa hàng</div>
            </CCol>
            <CCol className="col-md-12 mb-3">
              <CFormLabel>Giá tiền</CFormLabel>
              <CFormInput
                type="number"
                defaultValue=""
                name="price"
                required
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập giá tiền</div>
            </CCol>

            <CCol className="col-md-12 d-flex justify-content-center">
              <CButton color="outline-secondary" className="me-1" onClick={() => setShow(false)}>Tắt</CButton>
              <CButton className="ms-1" type="submit">Lưu mới</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
ModalCreate.propTypes = {
  isShow: PropTypes.bool,
  setShow: PropTypes.func,
  setLoading: PropTypes.func,
  getData: PropTypes.func,
  data: PropTypes.object,
}

export default ModalCreate;