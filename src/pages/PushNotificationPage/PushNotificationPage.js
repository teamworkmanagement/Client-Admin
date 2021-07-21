import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PushNotificationPage.scss";
import { CButton, CCard, CCardBody, CTextarea } from "@coreui/react";
import notiApi from "src/api/notiApi";

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

    }).catch(err => {

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
