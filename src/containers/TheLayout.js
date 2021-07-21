import React from 'react'
import { ToastContainer } from 'react-toastify'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import 'react-toastify/dist/ReactToastify.css';

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          progressClassName="toastProgress" />
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
