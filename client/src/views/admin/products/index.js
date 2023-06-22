import { CButton, CCol, CRow } from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { API_URL, S3_URL } from "src/utils/constants";
import { callApi } from "src/utils/requestHelper";
import LoadingSpinner from "src/views/base/spinners/LoadingSpinner";
import ModalCreate from "./ModalCreate";
import ConfirmModal from "src/components/modals/ConfirmModal";
const Product = () => {
  const [data, setData] = useState([])
  const [dataSelected, setDataSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [modalCreate, setModalCreate] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [actionType, setActionType] = useState(0)
  useEffect(() => {
    getData(1)
  }, [])
  const getData = async (currentPage) => {
    try {
      setLoading(true)
      if (currentPage)
        setPage(currentPage)
      const result = await callApi(`${API_URL}/product?${new URLSearchParams({ page: currentPage || page, limit: 20 })}`)
      if (result.status === 200) {
        console.log(result)
        setData(result?.body?.result || []);
        setTotal(result?.body?.total)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const deleteData = async (id) => {
    try {
      setLoading(true)
      await callApi(`${API_URL}/product/${id}`, "DELETE")
      await getData();
      setConfirmModal(false)
    } catch (e) {
      setConfirmModal(false)
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <LoadingSpinner></LoadingSpinner>}
      {modalCreate && <ModalCreate data={dataSelected} isShow={modalCreate} setShow={setModalCreate} setLoading={setLoading}
        getData={getData}></ModalCreate>}
      {ConfirmModal && <ConfirmModal setOpen={setConfirmModal} isOpen={confirmModal} {...actionType}></ConfirmModal>}
      <h4 className="mb-4">Quản lý món ăn</h4>
      <CRow>
        <CCol className="col-md-12 mb-4">
          <CButton onClick={() => {
            setDataSelected(null)
            setModalCreate(true)
          }}>Tạo món ăn</CButton>
        </CCol>
        <CCol className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên món ăn</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                return (
                  <tr key={d._id}>
                    <td>
                      <img className="image-50" src={`${S3_URL}/${d.image}`} onError={(e) => {
                        setTimeout(() => {
                          e.target.src = `${S3_URL}/${d.image}?t=${new Date().getTime()}`
                        }, 3000)
                      }}></img>
                    </td>
                    <td>
                      {d.name}
                    </td>
                    <td>
                      {`${d.price.toLocaleString('vi')} VNĐ`}
                    </td>
                    <td>{moment(d.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      <div>
                        <CButton color="outline-success me-1" onClick={() => {
                          setDataSelected(d)
                          setModalCreate(true)
                        }}>Chỉnh sửa</CButton>
                        <CButton color="outline-danger me-1"
                          onClick={() => {
                            setActionType({
                              handleAction: deleteData, title: "Bạn có chắc chắn muốn xóa nhà hàng này?",
                              acceptTitle: "Đồng ý", color: "danger", id: d._id
                            })
                            setConfirmModal(true)
                          }}
                        >Xóa</CButton>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {!!total &&
            <div className="text-center mt-4">
              <Pagination
                activePage={page}
                itemsCountPerPage={20}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={(pageNumber) => {
                  getData(pageNumber)
                }}
              />
            </div>
          }
        </CCol>
      </CRow>
    </div>
  )
}
export default Product;