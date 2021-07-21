import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./UserFeedbackPage.scss";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDataTable,
  CInputCheckbox,
} from "@coreui/react";
import feedbackApi from "src/api/feedbackApi";
import moment from "moment";
import "moment/locale/vi";
import { toast } from "react-toastify";
import CustomToast from "src/CustomToast/CustomToast";

moment.locale("vi");

function UserFeedbackPage(props) {
  const [feedbacksData, setFeedbacksData] = useState([]);
  const [selectedFeedbackIndexs, setSelectedFeedbackIndexs] = useState([]);

  useEffect(() => {
    feedbackApi.getFeedbacks()
      .then(res => {
        setFeedbacksData(res.data);
      })
      .catch(err => {

      })
  }, []);

  useEffect(() => {
    var clonedSelecteds = [];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (feedbacksData[i].isSelected) {
        clonedSelecteds.push(i);
      }
    }
    setSelectedFeedbackIndexs(clonedSelecteds);
  }, [feedbacksData]);

  const showError = () => {
    toast(
      <CustomToast
        type="error"
        title="Lỗi"
        message="Đã có lỗi xảy ra!"
      />
    );
  }

  const showSuccess = () => {
    toast(
      <CustomToast
        type="success"
        title="Thành công"
        message="Đã cập nhật thành công!"
      />
    );
  }


  const confirmPost = (item, index) => {
    var clonedFeedbacks = [...feedbacksData];
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      status: 1,
    };

    feedbackApi.makeSeen({
      feedbackIds: [item.id]
    }).then(res => {
      showSuccess();
      setFeedbacksData(clonedFeedbacks);
    }).catch(err => {
      showError();
    })
  };

  const removeItem = (item, index) => {
    var clonedFeedbacks = [];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (i !== index) {
        clonedFeedbacks.push(feedbacksData[i]);
      }
    }


    feedbackApi.remove({
      feedbackIds: [item.id]
    }).then(res => {
      showSuccess();
      setFeedbacksData(clonedFeedbacks);
    }).catch(err => {
      showError();
    })
  };

  const toggleDetails = (index) => {
    var clonedFeedbacks = [...feedbacksData];
    const isShown = clonedFeedbacks[index].isShown;
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      isShown: !isShown,
    };
    setFeedbacksData(clonedFeedbacks);
  };

  const onSelectRow = (item, index) => {
    //debugger;
    var clonedFeedbacks = [...feedbacksData];
    const isSelected = clonedFeedbacks[index].isSelected;
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      isSelected: !isSelected,
    };
    setFeedbacksData(clonedFeedbacks);
  };

  const fields = [
    {
      key: "select",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    { key: "content", label: "Nội dung góp ý", _style: { width: "40%" } },
    { key: "createdDate", label: "Ngày đăng", _style: { width: "5%" } },
    { key: "owner", label: "Người phản hồi", _style: { width: "20%" } },
    { key: "status", label: "Trạng thái", _style: { width: "15%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case 1:
        return "success";
      default:
        return "danger";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Đã xem";
      default:
        return "Mới";
    }
  };

  function truncate(str, n = 100) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function confirmAll() {
    let feedbacks = [];
    var clonedFeedbacks = [...feedbacksData];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (selectedFeedbackIndexs.indexOf(i) >= 0) {
        clonedFeedbacks[i] = {
          ...clonedFeedbacks[i],
          status: 1, //trạng thái confirm
          isSelected: false,
        };

        feedbacks.push(clonedFeedbacks[i].id);
      }
    }

    setSelectedFeedbackIndexs([]); //confirm xong bỏ chọn hết
    feedbackApi.makeSeen({
      feedbackIds: feedbacks
    }).then(res => {
      showSuccess();
      setFeedbacksData(clonedFeedbacks);
    }).catch(err => {
      showError();
    })
  }

  function removeAll() {
    let feedbacks = [];
    console.log(selectedFeedbackIndexs);
    var clonedFeedbacks = [];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (selectedFeedbackIndexs.indexOf(i) < 0) {
        clonedFeedbacks.push(feedbacksData[i]);
      }

      else {
        feedbacks.push(feedbacksData[i].id);
      }
    }

    setSelectedFeedbackIndexs([]); //confirm xong bỏ chọn hết

    feedbackApi.remove({
      feedbackIds: feedbacks,
    }).then(res => {
      showSuccess();
      setFeedbacksData(clonedFeedbacks);
    }).catch(err => {
      showError();
    })
  }

  return (
    <div className="user-feedback-page">
      <CCard>
        <CCardHeader>
          <h4>Phản hồi của người dùng</h4>
        </CCardHeader>
        <CCardBody>
          <div className="button-selection-group">
            <CButton
              disabled={selectedFeedbackIndexs.length === 0}
              className="btn-valid mr-3"
              size="lg"
              color="success"
              onClick={() => confirmAll()}
            >
              Đánh dấu tất cả đã xem
            </CButton>
            <CButton
              disabled={selectedFeedbackIndexs.length === 0}
              className="btn-remove"
              size="lg"
              color="danger"
              onClick={() => removeAll()}
            >
              Xóa tất cả đang chọn
            </CButton>
          </div>
          <CDataTable
            items={feedbacksData}
            fields={fields}
            columnFilter
            itemsPerPageSelect={{
              label: "Số dòng mỗi trang:",
              values: [5, 10, 20, 50],
            }}
            itemsPerPage={5}
            hover
            sorter
            pagination
            columnFilterSlot={"Tìm kiếm"}
            tableFilter={{
              label: "Tìm trong bảng",
              placeholder: "Tìm kiếm...",
            }}
            scopedSlots={{
              select: (item, index) => {
                return (
                  <td>
                    <CInputCheckbox
                      className="select-row"
                      name={`checkbox${index}`}
                      onClick={() => {
                        onSelectRow(item, index);
                      }}
                      checked={item.isSelected}
                    />
                  </td>
                );
              },
              createdDate: (item) => {
                return <td>{moment(item.createdDate).format('DD/MM/YYYY HH:mm:ss')}</td>;
              },
              content: (item) => {
                return (
                  <td>
                    <div className="censor-status">
                      {truncate(item.content)}
                    </div>
                  </td>
                );
              },
              owner: (item) => {
                return (
                  <td className="owner-cell">
                    <div className="owner-cell-content">
                      {item.userAvatar && item.userAvatar !== "" && (
                        <img alt="" src={item.userAvatar} />
                      )}

                      {item.userName}
                    </div>
                  </td>
                );
              },
              status: (item) => {
                return (
                  <td className="status-cell">
                    <CBadge color={getBadge(item.status)}>
                      {getStatusText(item.status)}
                    </CBadge>
                  </td>
                );
              },
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      {item.isShown ? "Ẩn" : "Xem"}
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={item.isShown}>
                    <CCardBody>
                      <p className="text-muted">Nội dung phản hồi:</p>
                      <div className="text-muted"> {item.content}</div>
                      <div className="mt-2  group-btn">
                        <div className="validate-group">
                          {item.status === 0 && <CButton
                            size="sm"
                            color="success"
                            onClick={() => confirmPost(item, index)}
                          >
                            Đánh dấu đã xem
                          </CButton>}
                        </div>
                        <CButton
                          size="sm"
                          color="info"
                          onClick={() => removeItem(item, index)}
                        >
                          Gỡ khỏi danh sách
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </div>
  );
}

export default UserFeedbackPage;
