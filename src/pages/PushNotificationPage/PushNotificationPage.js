import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PushNotificationPage.scss";
import { CButton, CCard, CCardBody, CTextarea } from "@coreui/react";
import notiApi from "src/api/notiApi";
import { toast } from "react-toastify";
import CustomToast from "src/CustomToast/CustomToast";

PushNotificationPage.propTypes = {};

function PushNotificationPage(props) {
  const [value, setValue] = useState('');
  const onPush = () => {
    if (!value)
      return;
    console.log(value);
    notiApi.push({
      notiContent: value,
    }).then(res => {
      toast(
        <CustomToast
          type="success"
          title="Thành công"
          message="Đã gửi thông báo thành công!"
        />
      );
      setValue('');
    }).catch(err => {
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Đã có lỗi xảy ra!"
        />
      );
    })
  }
  return (
    <div className="push-notification-page">
      <CCard>
        <CCardBody>
          <CTextarea
            name="textarea-input"
            id="textarea-input"
            rows="9"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nội dung thông báo..."
          />
          <CButton onClick={onPush} className="btn-send" size="lg" color="info">
            Gửi thông báo
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default PushNotificationPage;
