import { CButton, CCol, CRow } from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { API_URL, S3_URL, STATUS_ORDER } from "src/utils/constants";
import { callApi } from "src/utils/requestHelper";
import LoadingSpinner from "src/views/base/spinners/LoadingSpinner";
import ModalDetail from "./ModalDetail";
import ModalStatus from "./ModalStatus";

const Product = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [modalStatus, setModalStatus] = useState(false)
    const [modalDetail, setModalDetail] = useState(false)
    const [order, setOrder] = useState(null)
    useEffect(() => {
        getData(1)
    }, [])
    const getData = async (currentPage) => {
        try {
            setLoading(true)
            if (currentPage)
                setPage(currentPage)
            const result = await callApi(`${API_URL}/order?${new URLSearchParams({ page: currentPage || page, limit: 20 })}`)
            if (result.status === 200) {
                setData(result?.body?.result || []);
                setTotal(result?.body?.total)
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <div>
            {loading && <LoadingSpinner></LoadingSpinner>}
            {modalStatus && <ModalStatus isShow={modalStatus} setShow={setModalStatus} setLoading={setLoading}
                getData={getData} data={data} order={order}></ModalStatus>}
            {modalDetail && <ModalDetail isShow={modalDetail} setShow={setModalDetail} setLoading={setLoading}
                order={order}></ModalDetail>}

            <h4 className="mb-4">Quản lý đơn đặt hàng</h4>
            <CRow>
                <CCol className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Người đặt</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Thời gian nhận</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => {
                                return (
                                    <tr key={d._id}>
                                        <td>
                                            {d.fullName || ""}
                                        </td>
                                        <td>
                                            {d?.phoneNumber || ""}
                                        </td>
                                        <td>
                                            {d?.email || ""}
                                        </td>
                                        <td>
                                            {d?.address || ""}
                                        </td>
                                        <td>
                                            {d?.timeDelivery ? moment(d?.timeDelivery).format("DD/MM/YYYY HH:mm") : ""}
                                        </td>
                                        <td>{moment(d.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                        <td>{STATUS_ORDER[d.statusOrder]}</td>
                                        <td>
                                            <div>
                                                <CButton color="outline-info me-1" onClick={() => {
                                                    setOrder(d)
                                                    setModalDetail(true)
                                                }}>Chi Tiết</CButton>
                                                <CButton color="outline-warning me-1" onClick={() => {
                                                    setOrder(d)
                                                    setModalStatus(true)
                                                }}>Sửa Trạng Thái</CButton>
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