import React, { useEffect, useState } from 'react'
import {
  CRow,
  CForm,
  CFormInput,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { toast } from "react-toastify";
import moment from "moment/moment";
import axios from "axios";
import { API_ADMIN_URL, DATE_FORMAT, HOST_THEORY } from "../../utils/constants";
import {callApi} from "../../utils/requestHelper";

const UploadFile = () => {
  const [isValidFile, setValidFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetchData().catch()
  }, [])

  const fetchData = async () => {
    const result = await callApi(`${API_ADMIN_URL}/economic-situation-indexes`, 'GET');
    setHistories(result)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (files.length === 0) {
      return toast.error('Please upload file!');
    }
    if (!isValidFile) {
      return toast.error('Please upload correct files');
    }
    handleUpload(files);
  }

  const onFileChange = (event) => {
    const fileList = event.target.files;
    for (const file of fileList) {
      if (file.type !== 'text/csv') {
        return toast.error('Just accepted csv format!');
      }
    }
    setValidFile(true);
    setFiles(fileList);
  }

  const handleUpload = (files) => {
    const endpoint = `${API_ADMIN_URL}/upload`;
    const theoryEndpoint = `${HOST_THEORY}/update_economics_adjust`

    const formData = new FormData();
    for (const item of files) {
      formData.append(`file`, item, item.name);
    }
    const token = localStorage.getItem('jwt');
    if (!token) {
      return window.location.href='/login';
    }
    axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: token } })
      .then((response) => {
        formData.append('id', response.data.id);
        axios.post(theoryEndpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(() => {
            toast.success('Upload files successfully!');
            fetchData().catch();
          })
          .catch(e => {
            toast.error('Upload files failed!');
            console.error(e)
          });
      })
      .catch(e => {
        toast.error('Upload files failed!');
        console.error(e)
      })
  }

  const getFilename = (file) => {
    if (!file) {
      return;
    }
    const arr = `${file}`.split('/');
    return arr.length ? arr[arr.length - 1] : '';
  }

  return (
    <>
      <CRow>
        <CCol md={10}>
          <CRow>
            <div>Upload files</div>
          </CRow>
          <CRow>
            <CForm className="row g-1 m-lg-2" onSubmit={handleSubmit}>
              <CCol>
                <CFormInput type="file" id="formFileMultiple" multiple onChange={onFileChange} />
              </CCol>
              <CCol>
                <CButton color="primary" type="submit">Upload</CButton>
              </CCol>
            </CForm>
          </CRow>
        </CCol>
      </CRow>
      <CRow   className="overflow-auto">
        <CCol lg={12}>
          <CCard  className="overflow-auto" style={{ fontSize: 14 }}>
            <CCardHeader>
              <strong>Economic situation indexes ({histories ? histories.length : 0})</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User_ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">FRED_FF_RATE_FORECAST</CTableHeaderCell>
                    <CTableHeaderCell scope="col">PCE_HISTORICAL_FORECAST</CTableHeaderCell>
                    <CTableHeaderCell scope="col">UNEMPLOYMENT_RATE_HISTORICAL_FORECAST</CTableHeaderCell>
                    <CTableHeaderCell scope="col">WTI_HISTORICAL_FORECAST</CTableHeaderCell>
                    {/*<CTableHeaderCell scope="col">M2</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">INTEREST_RATE</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">UNEMPLOYMENT_RATE</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">CASE_SHILLER</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">PCE_PRICE_INDEX</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">CRUDE_OIL</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">GOVERNMENT_BOND_10Y</CTableHeaderCell>*/}
                    {/*<CTableHeaderCell scope="col">CPI_CONSUMER_PRICE_INDEX</CTableHeaderCell>*/}
                    <CTableHeaderCell scope="col">Created_At</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(histories && histories.length > 0) ? histories.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell scope="row">{item.id}</CTableDataCell>
                      <CTableDataCell scope="row">{item.user_id}</CTableDataCell>
                      <CTableDataCell>{item.status}</CTableDataCell>
                      <CTableDataCell>{getFilename(item.fred_ff_rate_forecast)}</CTableDataCell>
                      <CTableDataCell>{getFilename(item.pce_historical_forecast)}</CTableDataCell>
                      <CTableDataCell>{getFilename(item.unemployment_rate_historical_forecast)}</CTableDataCell>
                      <CTableDataCell>{getFilename(item.wti_historical_forecast)}</CTableDataCell>
                      {/*<CTableDataCell>{getFilename(item.m2)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.interest_rate)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.unemployment_rate)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.case_shiller)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.pce_price_index)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.crude_oil)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.government_bond_10y)}</CTableDataCell>*/}
                      {/*<CTableDataCell>{getFilename(item.cpi_consumer_price_index)}</CTableDataCell>*/}
                      <CTableDataCell>{moment(item.created_at).format(DATE_FORMAT)}</CTableDataCell>
                    </CTableRow>
                  )) : <CTableRow key={0} className='text-center'>Empty</CTableRow> }
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UploadFile
