import React, { useEffect, useState } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import ModalCreate from "./ModalCreate";
import { API_URL, STATUS, STATUS_DATA } from "src/utils/constants";
import { callApi } from "src/utils/requestHelper";
import LoadingSpinner from "../base/spinners/LoadingSpinner";
import moment from 'moment';
import ConfirmModal from "src/components/modals/ConfirmModal";
import Pagination from "react-js-pagination";

const Restaurants = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [actionType, setActionType] = useState(0)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        getData(1);
    }, [])

    const deleteData = async (id) => {
        try {
            setLoading(true)
            await callApi(`${API_URL}/restaurant/${id}`, "DELETE")
            await getData();
            setConfirmModal(false)
        } catch (e) {
            setConfirmModal(false)
            setLoading(false)
        }
    }

    const confirmData = async (id, body) => {
        try {
            setLoading(true)
            await callApi(`${API_URL}/restaurant/${id}/confirm`, "PATCH", body)
            await getData();
            setConfirmModal(false)
        } catch (e) {
            setConfirmModal(false)
            setLoading(false)
        }
    }

    const ACTION_TYPE = [
        {
            handleAction: deleteData, title: "Bạn có chắc chắn muốn xóa nhà hàng này?",
            acceptTitle: "Đồng ý", color: "danger"
        },
        {
            handleAction: confirmData, title: "Bạn có chắc chắn muốn xác nhận nhà hàng này?",
            acceptTitle: "Đồng ý", color: "success"
        }
    ]

    const getData = async (currentPage) => {
        try {
            setLoading(true)
            if (currentPage)
                setPage(currentPage)
            const result = await callApi(`${API_URL}/restaurant?${new URLSearchParams({ page: currentPage || page, limit: 20 })}`)
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


    const [modalCreate, setModalCreate] = useState(false)
    return (
        <div className="restaurant-page">
            {loading && <LoadingSpinner></LoadingSpinner>}
            {modalCreate && <ModalCreate isShow={modalCreate} setShow={setModalCreate} setLoading={setLoading}
                getData={getData}></ModalCreate>}
            <ConfirmModal setOpen={setConfirmModal} isOpen={confirmModal} {...actionType}></ConfirmModal>
            <h4 className="mb-4">Quản lý nhà hàng</h4>
            <CRow>
                <CCol className="col-md-12 mb-4">
                    <CButton onClick={() => setModalCreate(true)}>Tạo nhà hàng</CButton>
                </CCol>
                <CCol className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tên cửa hàng</th>
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
                                            {d.name}
                                        </td>
                                        <td>{moment(d.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                        <td>{STATUS[d.status]}</td>
                                        <td>
                                            <div className="d-flex">
                                                <CButton color="outline-info me-1" onClick={() => { getPreviewToken(d._id) }}>Preview</CButton>
                                                {d.status == STATUS_DATA.pending ?
                                                    <CButton color="outline-success me-1" onClick={() => {
                                                        setActionType({ ...ACTION_TYPE[1], id: d._id, body: { status: STATUS_DATA.active } })
                                                        setConfirmModal(true)
                                                    }}>Xác nhận</CButton>
                                                    : <CButton color="outline-warning me-1" onClick={() => {
                                                        setActionType({
                                                            ...ACTION_TYPE[1], id: d._id,
                                                            body: { status: STATUS_DATA.pending },
                                                            title: 'Bạn có chắc chắn muốn nhà hàng này trở về trạng thái chờ xác nhận?',
                                                            color: "warning"
                                                        })
                                                        setConfirmModal(true)
                                                    }}>Chờ Xác Nhận</CButton>}
                                                <CButton color="outline-danger me-1"
                                                    onClick={() => {
                                                        setActionType({ ...ACTION_TYPE[0], id: d._id })
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
export default Restaurants;