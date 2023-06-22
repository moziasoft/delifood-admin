import { CBadge, CButton, CCol, CRow } from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { API_URL, S3_URL, STATUS } from "src/utils/constants";
import { callApi } from "src/utils/requestHelper";
import LoadingSpinner from "src/views/base/spinners/LoadingSpinner";
import ModalEdit from "./ModalEdit";
const RestaurantAdmin = () => {
  const [data, setData] = useState({})
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState({})
  const [modalEdit, setModalEdit] = useState(false)
  useEffect(() => {
    getDetailRestaurant()
  }, [])
  const getDetailRestaurant = async () => {
    try {
      setLoading(true)
      const result = await callApi(`${API_URL}/restaurant/detail`)
      setData(result.body)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const getAddress = () => {
    const address = data?.address || ""
    const city = data?.city || ""
    const province = data?.province || ""
    const ward = data?.ward || ""
    return `${address ? `${address}, ` : ""}${ward ? `${ward}, ` : ""}${city ? `${city}, ` : ""}${province ? `${province}, ` : ""}`
  }

  const getPreviewToken = async (id) => {
    try {
      setLoading(true)
      const res = await callApi(`${API_URL}/restaurant/preview/${id}`)
      if (res.status === 200) {
        window.open(
          `http://localhost:3000/preview/${res.body}`,
          '_blank'
        );
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }

  }

  return (
    <div>
      {modalEdit && <ModalEdit isShow={modalEdit} setShow={setModalEdit} setLoading={setLoading}
        getData={getDetailRestaurant} data={data} setImage={setImage}></ModalEdit>}
      {loading && <LoadingSpinner></LoadingSpinner>}
      <h4 className="mb-4">Quản lý nhà hàng</h4>
      <div>
        <CButton color="info" onClick={() => { setModalEdit(true) }}>Chỉnh sửa</CButton>
        <CButton color="outline-info ms-1" onClick={() => { getPreviewToken(data._id) }}>Preview</CButton>
      </div>
      <CRow>
        <CCol md={3} className="mb-4">
        </CCol>
        <CCol md={6} className="mb-4">
          <div>
            {data.image ? <img className="w-100" src={image ? image : `${S3_URL}/${data.image}`}></img> : ""}
          </div>
        </CCol>
        <CCol md={3} className="mb-4"></CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Tên nhà hàng</div>
          <div>{data?.name || ""}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Trạng Thái</div>
          <div>{typeof (data?.status) !== "undefined" ? <div>
            {data?.status === 2 ? <CBadge color="danger">{STATUS[data.status]}</CBadge> :
              <CBadge color="success">{STATUS[data.status]}</CBadge>}
          </div> : null}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Số điện thoại</div>
          <div>{data?.phoneNumber || ""}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Địa chỉ</div>
          <div>{getAddress() || ""}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Thời gian tạo</div>
          <div>{data?.createdAt ? moment(data.createdAt).format("DD/MM/YYYY HH:mm") : ""}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Giá trung bình</div>
          <div>{data?.mediumPrice ? `${data?.mediumPrice.toLocaleString('vi')} VNĐ` : ""}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Thời gian mở cửa</div>
          <div>{`${data?.startTime || ""} - ${data?.endTime || ""}`}</div>
        </CCol>
        <CCol md={4} className="mb-4">
          <div className="mb-2 font-weight-bold">Thời gian giao hàng</div>
          <div>{`${data?.startTimeDelivery / 60 || ""} phút - ${data?.endTimeDelivery / 60 || ""} phút`}</div>
        </CCol>
      </CRow>
    </div>
  )
}
export default RestaurantAdmin;