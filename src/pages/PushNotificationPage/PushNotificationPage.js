import React from "react";
import PropTypes from "prop-types";
import "./PushNotificationPage.scss";
import { CButton, CCard, CCardBody, CTextarea } from "@coreui/react";

PushNotificationPage.propTypes = {};

function PushNotificationPage(props) {
  return (
    <div className="push-notification-page">
      <CCard>
        <CCardBody>
          <CTextarea
            name="textarea-input"
            id="textarea-input"
            rows="9"
            placeholder="Nội dung thông báo..."
          />
          <CButton className="btn-send" size="lg" color="info">
            Gửi thông báo
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default PushNotificationPage;
