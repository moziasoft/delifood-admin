import { CModal, CForm, CFormInput, CModalBody, CModalTitle, CModalHeader, CFormLabel, CCol, CButton, CRow, CFormSelect } from "@coreui/react"
import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { API_URL, S3_URL, STATUS_ORDER_DATA } from "src/utils/constants";
import { callApi, callApiWithFile } from "src/utils/requestHelper";
import { toast } from "react-toastify";

const ModalDetail = (props) => {
    const { isShow, setShow, order, setLoading } = props;
    const [data, setData] = useState({ products: [] })
    useEffect(() => {
        getDetail();
    }, [])
    const getDetail = async () => {
        try {
            setLoading(true)
            const result = await callApi(`${API_URL}/order/${order.id}`)
            if (result.status === 200) setData(result.body)
            console.log(result)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const totalPrice = () => {
        let count = 0;
        data.products.forEach(o => {
            count += (o?.product.price * o.count);
        });
        return count || 0;
    }

    return (
        <CModal visible={isShow} onClose={() => { setShow(false) }} size="lg">
            <CModalHeader>
                <CModalTitle>Chi tiết đơn hàng</CModalTitle>

            </CModalHeader>
            <CModalBody>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên món ăn</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map(d => {
                            return (
                                <tr key={d._id}>
                                    <td>
                                        <img className="image-50" src={`${S3_URL}/${d?.product?.image}`}></img></td>
                                    <td>{d?.product?.name}</td>
                                    <td>{`${(d?.product?.price || 0).toLocaleString('vi')} VNĐ`}</td>
                                    <td>{d.count}</td>
                                    <td>{((d?.product?.price || 0) * (d.count || 0)).toLocaleString('vi')} VNĐ</td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                <h4 className="mt-4">{`Tổng Giá Trị Đơn Hàng: ${totalPrice().toLocaleString('vi')} VNĐ`}</h4>
            </CModalBody>
        </CModal>
    )
}
ModalDetail.propTypes = {
    isShow: PropTypes.bool,
    setShow: PropTypes.func,
    order: PropTypes.object,
    setLoading: PropTypes.func,
}

export default ModalDetail;