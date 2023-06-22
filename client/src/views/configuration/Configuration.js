import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CRow,
  CCol,
  CFormSwitch,
  CSpinner
} from '@coreui/react'
import { API_ADMIN_URL } from "../../utils/constants";
import {callApi} from "../../utils/requestHelper";
import ConfirmModal from "../../components/modals/Confirm";

const Configuration = () => {
  const [isLoading, setLoading] = useState(true);
  const [serverMaintainingStatus, setServerMaintainingStatus] = useState(false);
  const [isOpenModalConfirm,setOpenModalConfirm] = useState(false);

  useEffect(() => {
    fetchData().catch()
  }, [])

  const fetchData = async () => {
    const result = await callApi(`${API_ADMIN_URL}/configurations`, 'GET');
    setServerMaintainingStatus(result && result.is_server_maintaining);
    setLoading(false);
  }

  const onChangeServerMaintainingStatus = () => {
    setOpenModalConfirm(true);
  }

  const handleChangeServerMaintainingStatus = () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return window.location.href='/login';
    }

    const endpoint = `${API_ADMIN_URL}/server-maintain-status`;
    const data = { status: !serverMaintainingStatus };
    const headers = { headers: { Authorization: token } };
    axios.put(endpoint, data, headers)
      .then((response) => {
        setServerMaintainingStatus(!serverMaintainingStatus);
        toast.success(`Switch to ${serverMaintainingStatus ? 'OFF' : 'ON'} successfully!`);
        setOpenModalConfirm(false);
      })
      .catch(e => {
        toast.error('Something went wrong!');
        console.error(e)
      })
  }

  return (
    <>
      <ConfirmModal
        isOpen={isOpenModalConfirm}
        setOpen={setOpenModalConfirm}
        title="Confirm"
        handleConfirm={handleChangeServerMaintainingStatus}
      />
      <CRow>
        <CCol md={10}>
          <h4>Maintenance Mode</h4>
          <div style={{  marginTop: 10 }}>
            <i style={{ color: "rgba(220, 53, 69, 1)"}}>
              <span>When setting <b>ON</b>, the system will switch to maintain state</span>
              <br/>
              <span>and the website interface will display the maintain screen</span>
            </i>
          </div>

          <div style={{ marginTop: 20 }}>
            { isLoading ? (<div><CSpinner/></div>) : (
              <div>
                <CFormSwitch
                  size="xl"
                  label={serverMaintainingStatus === true ? 'ON' : 'OFF'}
                  id="formSwitchCheckDefaultXL"
                  checked={serverMaintainingStatus}
                  onChange={() => onChangeServerMaintainingStatus()}
                />
              </div>
            )}
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Configuration
