import React, { useState } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import ModalCreate from "./ModalCreate";

const Restaurants = () => {
    const [modalCreate, setModalCreate] = useState(false)
    return (
        <div className="restaurant-page">
            <ModalCreate isShow={modalCreate} setShow={setModalCreate}></ModalCreate>
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
                            <tr>
                                <td>
                                    <code>true</code>
                                </td>
                                <td>Always</td>
                            </tr>
                        </tbody>
                    </table>
                </CCol>
            </CRow>
        </div>
    )
}
export default Restaurants;