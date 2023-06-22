import { CSpinner } from "@coreui/react"
import React from "react";
import "./LoadingSpinner.scss"

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <CSpinner color="info" />
    </div>
  )
}
export default LoadingSpinner;