// PROD
// export const API_ADMIN_URL = 'https://le2zoj8jv7.execute-api.us-west-2.amazonaws.com/prod/ad_apis'
// export const API_URL = 'https://le2zoj8jv7.execute-api.us-west-2.amazonaws.com/prod/apis'

// DEV1
export const API_ADMIN_URL = 'https://ndsnneeui1.execute-api.us-west-2.amazonaws.com/dev/ad_apis'
// export const HOST_URL = "http://13.215.203.204:3000"
export const HOST_URL = "http://localhost:3000"
export const API_URL = `${HOST_URL}/api/v1`

export const HOST_THEORY = 'http://44.241.205.58:5000';

export const DATE_FORMAT = 'YYYY-MM-DD'

export const USER_TYPE_MAPPING = {
  'free': 'Free',
  'trial': 'Trial',
  'premium': 'Premium',
  'family': 'Simcode Family'
}

export const USER_TYPE_OPTIONS = [
  { label: 'All' },
  { label: 'Free', value: 'free' },
  { label: 'Trial', value: 'trial' },
  { label: 'Premium', value: 'premium' },
  { label: 'Simcode Family', value: 'family' },
]

export const STATUS = {
  0: 'Hiệu lực',
  1: 'Đã xóa',
  2: 'Chờ đợi'
}

export const STATUS_DATA = {
  active: 0,
  deleted: 1,
  pending: 2
}

export const ROLE = {
  superAdmin: 0,
  admin: 1
}

export const S3_URL = "https://delifood.s3.ap-southeast-1.amazonaws.com"

export const LIST_CITY = [
  { label: 'Chọn Huyện/Thành Phố', value: "" },
  { label: 'Đồng Hới', value: 'Đồng Hới' },
  { label: 'Ba Đồn', value: 'Ba Đồn' },
  { label: 'Bố Trạch', value: 'Bố Trạch' },
  { label: 'Quảng Ninh', value: 'Quảng Ninh' },
  { label: 'Lệ Thủy', value: 'Lệ Thủy' },
  { label: 'Quảng Trạch', value: 'Quảng Trạch' },
  { label: 'Minh Hóa', value: 'Minh Hóa' },
  { label: 'Tuyên Hóa', value: 'Tuyên Hóa' }
]

export const LIST_WARD = {
  "Đồng Hới": [
    { label: 'Chọn Phường/Xã', value: "" },
    { label: 'Hải Thành', value: 'Hải Thành' },
    { label: 'Đồng Phú', value: 'Đồng Phú' },
    { label: 'Bắc Lý', value: 'Bắc Lý' },
    { label: 'Nam Lý', value: 'Nam Lý' },
    { label: 'Đồng Hải', value: 'Đồng Hải' },
    { label: 'Đồng Sơn', value: 'Đồng Sơn' },
    { label: 'Phú Hải', value: 'Phú Hải' },
    { label: 'Bắc Nghĩa', value: 'Bắc Nghĩa' },
    { label: 'Đức Ninh Đông', value: 'Đức Ninh Đông' },
    { label: 'Quang Phú', value: 'Quang Phú' },
    { label: 'Lộc Ninh', value: 'Lộc Ninh' },
    { label: 'Bảo Ninh', value: 'Bảo Ninh' },
    { label: 'Nghĩa Ninh', value: 'Nghĩa Ninh' },
    { label: 'Thuận Đức', value: 'Thuận Đức' },
    { label: 'Đức Ninh', value: 'Đức Ninh' },
  ],
  "Ba Đồn": [
    { label: 'Chọn Phường/Xã', value: "", disabled: true, selected: true },
    { label: 'Ba Đồn', value: 'Ba Đồn' },
    { label: 'Quảng Long', value: 'Quảng Long' },
    { label: 'Quảng Thọ', value: 'Quảng Thọ' },
    { label: 'Quảng Tiên', value: 'Quảng Tiên' },
    { label: 'Quảng Trung', value: 'Quảng Trung' },
    { label: 'Quảng Phong', value: 'Quảng Phong' },
    { label: 'Quảng Thuận', value: 'Quảng Thuận' },
    { label: 'Quảng Tân', value: 'Quảng Tân' },
    { label: 'Quảng Hải', value: 'Quảng Hải' },
    { label: 'Quảng Sơn', value: 'Quảng Sơn' },
    { label: 'Quảng Lộc', value: 'Quảng Lộc' },
    { label: 'Quảng Thủy', value: 'Quảng Thủy' },
    { label: 'Quảng Văn', value: 'Quảng Văn' },
    { label: 'Quảng Phúc', value: 'Quảng Phúc' },
    { label: 'Quảng Hòa', value: 'Quảng Hòa' },
    { label: 'Quảng Minh', value: 'Quảng Minh' },
  ],
  "Bố Trạch": [{ label: 'Chọn Phường/Xã', value: "" },],
  "Quảng Ninh": [{ label: 'Chọn Phường/Xã', value: "" },],
  "Lệ Thủy": [{ label: 'Chọn Phường/Xã', value: "" },],
  "Quảng Trạch": [{ label: 'Chọn Phường/Xã', value: "" },],
  "Minh Hóa": [{ label: 'Chọn Phường/Xã', value: "" },],
  "Tuyên Hóa": [{ label: 'Chọn Phường/Xã', value: "" },]
}

export const TIME_OPEN_CLOSE_OPTIONS = (init) => {
  const result = [init]
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      const h = i < 10 ? `0${i}` : `${i}`;
      const m = j === 0 ? "00" : "30";
      result.push({ label: `${h}:${m}`, value: `${h}:${m}` })
    }
  }
  return result;
}

export const TIME_DELIVERY_OPTIONS = (init) => {
  const result = [init]
  for (let i = 1; i < 13; i++) {
    result.push({ value: i * 5 * 60, label: `${i * 5} phút` })
  }
  return result;
}

export const KEYWORD_TYPE = {
  0: "Normal",
  1: "Common"
}