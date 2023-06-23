import { CModal, CForm, CFormInput, CModalBody, CModalTitle, CModalHeader, CFormLabel, CCol, CButton, CFormSelect, CFormTextarea, CRow } from "@coreui/react"
import React, { useState } from "react"
import PropTypes from 'prop-types'
import { API_URL, LIST_CITY, LIST_WARD, S3_URL, TIME_DELIVERY_OPTIONS, TIME_OPEN_CLOSE_OPTIONS } from "src/utils/constants";
import { callApi, callApiWithFile } from "src/utils/requestHelper";
import { toast } from "react-toastify";

const ModalEdit = (props) => {
  const { isShow, setShow, setLoading, getData, data, setImage } = props;
  const [validated, setValidated] = useState(false)
  const [city, setCity] = useState(data?.city || "")
  const [ward, setWard] = useState(data?.ward || "")
  const [name, setName] = useState(data?.name || "")
  const [address, setAddress] = useState(data?.address || "")
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "")
  const [description, setDescription] = useState(data?.description || "")
  const [startTime, setStartTime] = useState(data?.startTime || "")
  const [endTime, setEndTime] = useState(data?.endTime || "")
  const [startTimeDelivery, setStartTimeDelivery] = useState(data?.startTimeDelivery || "")
  const [endTimeDelivery, setEndTimeDelivery] = useState(data?.endTimeDelivery || "")
  const [imageFile, setImageFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() === false) {

    } else {
      const body = {
        city, ward, address, name, phoneNumber, startTime, endTime,
        startTimeDelivery, endTimeDelivery, description,
        image: imageFile ? "" : data?.image, province: "Quảng Bình"
      }
      console.log(body)
      updateRestaurant(body);
    }

    setValidated(true)
  }
  const updateRestaurant = async (body) => {
    try {
      setLoading(true)
      const result = await callApiWithFile(`${API_URL}/restaurant/${data._id}`, "PUT", body, imageFile ? { image: [imageFile] } : null)
      await getData();
      if (result.status === 200) {
        setImage(imageSrc)
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
    <CModal visible={isShow} size="lg">
      <CModalHeader>
        <CModalTitle>Chỉnh sửa cửa hàng</CModalTitle>
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
                <img className="w-100" src={imageSrc || `${S3_URL}/${data.image}`}></img>
              </div>

              <CFormInput type="file" onChange={changeImage} />
            </CCol>
            <CCol md={12} className="mb-3">
              <CFormLabel>Tên cửa hàng</CFormLabel>
              <CFormInput
                type="text"
                defaultValue=""
                id="validationCustomName"
                name="name"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
              <div className="invalid-feedback" id="validationCustomName">Cần nhập tên cửa hàng</div>
            </CCol>
            <CCol md={12} className="col-md-12 mb-3">
              <CFormLabel>Số điện thoại</CFormLabel>
              <CFormInput
                type="text"
                defaultValue=""
                required
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập số điện thoại cửa hàng</div>
            </CCol>
            <CCol md={12} className="col-md-12 mb-3">
              <CFormLabel>Địa chỉ</CFormLabel>
              <CFormInput
                type="text"
                defaultValue=""
                required
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập địa chỉ cửa hàng</div>
            </CCol>
            <CCol md={12} className="col-md-12 mb-3">
              <CFormLabel>Huyện/Thành Phố</CFormLabel>
              <CFormSelect
                type="text"
                defaultValue={city || ""}
                value={city || ""}
                required
                name="city"
                options={LIST_CITY}
                onChange={(e) => {
                  setCity(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập Huyện/Thành Phố</div>
            </CCol>
            <CCol md={12} className="col-md-12 mb-3">
              <CFormLabel>Phường/Xã</CFormLabel>
              <CFormSelect
                type="text"
                required
                name="ward"
                value={ward}
                options={LIST_WARD[city]}
                onChange={(e) => {
                  setWard(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập Phường/Xã</div>
            </CCol>
            <CCol md={12} className="col-md-12 mb-3">
              <CFormLabel>Thông tin giới thiệu</CFormLabel>
              <CFormTextarea
                type="textarea"
                defaultValue=""
                required
                name="description"
                maxLength={500}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập thông tin giới thiệu cửa hàng</div>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel>Thời gian mở cửa</CFormLabel>
              <CFormSelect
                type="select"
                defaultValue=""
                required
                name="startTime"
                options={TIME_OPEN_CLOSE_OPTIONS({ label: 'Chọn thời gian mở cửa', value: "" })}
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập thời gian mở cửa</div>
            </CCol>
            <CCol md={6} className="col-md-6 mb-3">
              <CFormLabel>Thời gian đóng cửa</CFormLabel>
              <CFormSelect
                type="select"
                defaultValue=""
                required
                name="endTime"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value)
                }}
                options={TIME_OPEN_CLOSE_OPTIONS({ label: 'Chọn thời gian đóng cửa', value: "" })}
              />
              <div className="invalid-feedback">Cần nhập thời gian đóng cửa</div>
            </CCol>
            <CCol md={6} className="col-md-6 mb-3">
              <CFormLabel>Thời gian giao hàng sớm nhất</CFormLabel>
              <CFormSelect
                type="select"
                defaultValue=""
                required
                name="startTimeDelivery"
                options={TIME_DELIVERY_OPTIONS({ label: 'Chọn thời gian giao hàng sớm nhất', value: "" })}
                value={startTimeDelivery}
                onChange={(e) => {
                  setStartTimeDelivery(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập thời gian giao hàng sớm nhất</div>
            </CCol>
            <CCol md={6} className="col-md-6 mb-3">
              <CFormLabel>Thời gian giao hàng muộn nhất</CFormLabel>
              <CFormSelect
                type="select"
                defaultValue=""
                required
                name="endTimeDelivery"
                options={TIME_DELIVERY_OPTIONS({ label: 'Chọn thời gian giao hàng muộn nhất', value: "" })}
                value={endTimeDelivery}
                onChange={(e) => {
                  setEndTimeDelivery(e.target.value)
                }}
              />
              <div className="invalid-feedback">Cần nhập thời gian giao hàng muộn nhất</div>
            </CCol>
            <CCol md={12} className="d-flex justify-content-center">
              <CButton color="outline-secondary" className="me-1" onClick={() => setShow(false)}>Tắt</CButton>
              <CButton color="info" className="ms-1" type="submit">Chỉnh sửa</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
ModalEdit.propTypes = {
  isShow: PropTypes.bool,
  setShow: PropTypes.func,
  setLoading: PropTypes.func,
  getData: PropTypes.func,
  data: PropTypes.object,
  setImage: PropTypes.func,
}

export default ModalEdit;