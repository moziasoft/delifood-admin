import React, { useEffect, useState } from "react";
import { CButton, CCol, CRow } from "@coreui/react";
import { API_URL, STATUS, STATUS_DATA } from "src/utils/constants";
import { callApi } from "src/utils/requestHelper";
import LoadingSpinner from "../base/spinners/LoadingSpinner";
import moment from 'moment';
import Pagination from "react-js-pagination";

const Users = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getData();
  }, [])

  const getData = async (currentPage) => {
    try {
      setPage(currentPage)
      setLoading(true)
      const result = await callApi(`${API_URL}/user?${new URLSearchParams({ page: currentPage, limit: 20 })}`)
      if (result.status === 200) {
        setData(result.body?.result || []);
        setTotal(result.body?.total)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }


  return (
    <div className="restaurant-page">
      {loading && <LoadingSpinner></LoadingSpinner>}
      <h4 className="mb-4">Quản lý tài khoản</h4>
      <CRow>
        <CCol className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Cửa hàng</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                return (
                  <tr key={d._id}>
                    <td>
                      {d.username}
                    </td>
                    <td>
                      {d.email}
                    </td>
                    <td>
                      {d?.restaurant?.name || ""}
                    </td>
                    <td>
                      {moment(d.createdAt).format("DD/MM/YYYY HH:mm")}
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
export default Users;