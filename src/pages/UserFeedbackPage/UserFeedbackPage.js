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

function UserFeedbackPage(props) {
  const feedbacksDataInit = [
    {
      content:
        "Duis cursus imperdiet nisi tempus finibus. Morbi varius, diam sit amet fermentum ullamcorper, turpis diam maximus sem, vitae blandit nisi mi a odio. Curabitur molestie, libero at efficitur convallis, quam tortor imperdiet mi, non aliquet diam diam vitae purus. Proin aliquet mollis iaculis. Sed dapibus vehicula magna, non aliquet felis semper vel. Fusce eu urna enim. ",
      userName: "Ngọc Huy",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      createdDate: "20/03/2021",
      status: 0,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Pellentesque quis nibh ac quam condimentum faucibus. Ut cursus efficitur magna eget interdum. Integer vel lacus ante. In volutpat tristique luctus. ",
      userName: "Thanh Duyên",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      createdDate: "20/03/2021",
      status: 0,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Praesent sit amet sem eget quam tincidunt feugiat ac sit amet elit. Duis sed urna rutrum, finibus nunc eget, tempus arcu. Nulla in erat diam. Curabitur ipsum neque, aliquet eget euismod id, porta et lacus. Curabitur nec dui id lacus accumsan bibendum.",
      userName: "Hồng Khoa",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      createdDate: "20/03/2021",
      status: 1,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Maecenas id lacus egestas, luctus tortor a, sodales justo. Vivamus tristique ex vel nisi rutrum, vitae lacinia lorem fermentum. Proin dolor sapien, consequat a elit id, mattis lacinia dui.",
      userName: "Popo",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      createdDate: "20/03/2021",
      status: 1,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Donec quis turpis id felis ullamcorper consectetur. Curabitur blandit nisl vel velit varius, non gravida massa pulvinar. Vivamus lacinia augue nec dictum suscipit. Cras purus augue, placerat eget dignissim eu, placerat et metus. Nunc risus mi, laoreet id nibh sed, lacinia luctus nulla.",
      userName: "Anthony",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
      createdDate: "16/08/2021",
      status: 0,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Sed ultrices lorem metus, et vulputate nisl pellentesque id. Mauris placerat, lorem id volutpat dapibus, purus lorem finibus erat, ut convallis ligula ex in quam.",
      userName: "Khá Bảnh",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      createdDate: "22/12/2020",
      status: 1,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Suspendisse quis purus mi. Ut sollicitudin viverra ipsum faucibus scelerisque. Vestibulum eros lectus, fermentum at accumsan at, ullamcorper nec massa. Duis interdum laoreet elit, quis lobortis lorem rutrum dapibus. Ut condimentum lacus id libero finibus viverra. Aenean et metus consectetur, lobortis massa et, porta eros.",
      userName: "Huấn Hoa Hồng",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      createdDate: "11/04/2021",
      status: 1,
      //props for render
      isSelected: false,
      isShown: false,
    },
    {
      content:
        "Maecenas id lacus egestas, luctus tortor a, sodales justo. Vivamus tristique ex vel nisi rutrum, vitae lacinia lorem fermentum. Proin dolor sapien, consequat a elit id, mattis lacinia dui. Donec quis turpis id felis ullamcorper consectetur. Curabitur blandit nisl vel velit varius, non gravida massa pulvinar. Vivamus lacinia augue nec dictum suscipit. Cras purus augue, placerat eget dignissim eu, placerat et metus. Nunc risus mi, laoreet id nibh sed, lacinia luctus nulla. Sed ultrices lorem metus, et vulputate nisl pellentesque id. Mauris placerat, lorem id volutpat dapibus, purus lorem finibus erat, ut convallis ligula ex in quam.",
      userName: "Trốn cha trốn mẹ",
      userAvatar: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      createdDate: "20/03/2021",
      status: 0,
      //props for render
      isSelected: false,
      isShown: false,
    },
  ];
  const [feedbacksData, setFeedbacksData] = useState(feedbacksDataInit);
  const [selectedFeedbackIndexs, setSelectedFeedbackIndexs] = useState([]);

  useEffect(() => {
    var clonedSelecteds = [];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (feedbacksData[i].isSelected) {
        clonedSelecteds.push(i);
      }
    }
    setSelectedFeedbackIndexs(clonedSelecteds);
  }, [feedbacksData]);

  const confirmPost = (index) => {
    var clonedFeedbacks = [...feedbacksData];
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      status: 0,
    };
    setFeedbacksData(clonedFeedbacks);
  };

  const removeItem = (index) => {
    var clonedFeedbacks = [];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (i !== index) {
        clonedFeedbacks.push(feedbacksData[i]);
      }
    }
    setFeedbacksData(clonedFeedbacks);
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

  const onSelectRow = (index) => {
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
    { key: "owner", label: "Người đăng", _style: { width: "20%" } },
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
      case 0:
        return "success";
      default:
        return "danger";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Đã xem";
      default:
        return "Mới";
    }
  };

  function truncate(str, n = 100) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function confirmAll() {
    var clonedFeedbacks = [...feedbacksData];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (selectedFeedbackIndexs.indexOf(i) >= 0) {
        clonedFeedbacks[i] = {
          ...clonedFeedbacks[i],
          status: 0, //trạng thái confirm
          isSelected: false,
        };
      }
    }
    setFeedbacksData(clonedFeedbacks);
    setSelectedFeedbackIndexs([]); //confirm xong bỏ chọn hết
  }

  function removeAll() {
    var clonedFeedbacks = [];
    for (let i = 0; i < feedbacksData.length; i++) {
      if (selectedFeedbackIndexs.indexOf(i) < 0) {
        clonedFeedbacks.push(feedbacksData[i]);
      }
    }
    setFeedbacksData(clonedFeedbacks);
    setSelectedFeedbackIndexs([]); //confirm xong bỏ chọn hết
  }

  return (
    <div className="user-feedback-page">
      <CCard>
        <CCardHeader>
          <h4>Danh sách bài viết cần kiểm duyệt</h4>
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
                        onSelectRow(index);
                      }}
                      checked={item.isSelected}
                    />
                  </td>
                );
              },
              createdDate: (item) => {
                return <td>{item.createdDate}</td>;
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
                      <div className="group-btn">
                        <div className="validate-group">
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => confirmPost(index)}
                          >
                            Đánh dấu đã xem
                          </CButton>
                        </div>
                        <CButton
                          size="sm"
                          color="info"
                          onClick={() => removeItem(index)}
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
