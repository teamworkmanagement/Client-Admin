import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CBadge,
  CButton,
  CCollapse,
  CInputCheckbox,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import { rgbToHex } from "@coreui/utils";
import { DocsLink } from "src/reusable";
import "./CommentCensorshipPage.scss";
import ImageGallery from "react-image-gallery";
import postReportApi from "src/api/postReportApi";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

const CommentCensorshipPage = () => {
  const [postsData, setPostsData] = useState([]);
  const [selectedPostIndexs, setSelectedPostIndexs] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    postReportApi
      .getReports()
      .then((res) => {
        setPostsData(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    var clonedSelecteds = [];
    for (let i = 0; i < postsData.length; i++) {
      if (postsData[i].isSelected) {
        clonedSelecteds.push(i);
      }
    }
    setSelectedPostIndexs(clonedSelecteds);
    console.log(clonedSelecteds);
  }, [postsData]);

  const confirmPost = (item, index, value) => {
    var clonedFeedbacks = [...postsData];
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      status: value ? "1" : "2",
    };

    if (value) {
      postReportApi
        .acceptPosts({
          postIds: [item.postId],
        })
        .then((res) => {
          setPostsData(clonedFeedbacks);
        })
        .catch((err) => {});
    } else {
      postReportApi
        .denyPosts({
          postIds: [item.postId],
        })
        .then((res) => {
          setPostsData(clonedFeedbacks);
        })
        .catch((err) => {});
    }
  };

  const removeItem = (item, index) => {
    var clonedFeedbacks = [];
    for (let i = 0; i < postsData.length; i++) {
      if (i !== index) {
        clonedFeedbacks.push(postsData[i]);
      }
    }

    postReportApi
      .removeReports({
        reportIds: [item.id],
      })
      .then((res) => {
        setPostsData(clonedFeedbacks);
      })
      .catch((err) => {});
    console.log(postsData);
  };

  const toggleDetails = (index) => {
    var clonedFeedbacks = [...postsData];
    const isShown = clonedFeedbacks[index].isShown;
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      isShown: !isShown,
    };
    setPostsData(clonedFeedbacks);
  };

  const onSelectRow = (index) => {
    //debugger;
    var clonedFeedbacks = [...postsData];
    const isSelected = clonedFeedbacks[index].isSelected;
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      isSelected: !isSelected,
    };
    setPostsData(clonedFeedbacks);
    console.log(postsData);
  };

  function truncate(str, n = 150) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const getBadge = (status) => {
    switch (status) {
      case "1":
        return "success";
      case "0":
        return "warning";
      default:
        return "danger";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "1":
        return "Hợp lệ";
      case "0":
        return "Chờ duyệt";
      default:
        return "Đã chặn";
    }
  };

  function confirmAll(value) {
    let posts = [];
    var clonedFeedbacks = [...postsData];
    for (let i = 0; i < postsData.length; i++) {
      if (selectedPostIndexs.indexOf(i) >= 0) {
        clonedFeedbacks[i] = {
          ...clonedFeedbacks[i],
          status: value ? "1" : "2", //trạng thái confirm
          isSelected: false,
        };

        posts.push(clonedFeedbacks[i].postId);
      }
    }

    if (value) {
      postReportApi
        .acceptPosts({
          postIds: posts,
        })
        .then((res) => {
          setPostsData(clonedFeedbacks);
        })
        .catch((err) => {});
    } else {
      postReportApi
        .denyPosts({
          postIds: posts,
        })
        .then((res) => {
          setPostsData(clonedFeedbacks);
        })
        .catch((err) => {});
    }
    setSelectedPostIndexs([]); //confirm xong bỏ chọn hết
  }

  function removeAll() {
    let reports = [];
    var clonedFeedbacks = [];
    for (let i = 0; i < postsData.length; i++) {
      if (selectedPostIndexs.indexOf(i) < 0) {
        clonedFeedbacks.push(postsData[i]);
        reports.push(postsData[i].id);
      }
    }

    postReportApi
      .removeReports({
        reportIds: reports,
      })
      .then((res) => {
        setPostsData(clonedFeedbacks);
      })
      .catch((err) => {});

    setSelectedPostIndexs([]); //confirm xong bỏ chọn hết
  }

  const fields = [
    {
      key: "select",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    { key: "content", label: "Nội dung bình luận", _style: { width: "40%" } },
    { key: "createdDate", label: "Ngày đăng", _style: { width: "5%" } },

    { key: "owner", label: "Người đăng", _style: { width: "20%" } },
    { key: "rpcount", label: "Số báo cáo", _style: { width: "10%" } },
    { key: "status", label: "Trạng thái", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const [images, setImages] = useState([]);
  const viewImages = (item) => {
    console.log("clicked");
    setShowModal(true);
    setImages(item.images);
  };

  const onCLoseModal = () => {
    setShowModal(false);
    setImages([]);
  };
  return (
    <div className="post-censorship-page">
      <CCard>
        <CCardHeader>
          <h4>Danh sách bình luận bị báo cáo</h4>
        </CCardHeader>
        <CCardBody>
          <div className="button-selection-group">
            <CButton
              disabled={selectedPostIndexs.length === 0}
              className="btn-valid mr-3"
              size="lg"
              color="success"
              onClick={() => confirmAll(true)}
            >
              Duyệt tất cả đang chọn
            </CButton>
            <CButton
              disabled={selectedPostIndexs.length === 0}
              className="btn-valid mr-3"
              size="lg"
              color="danger"
              onClick={() => confirmAll(false)}
            >
              Chặn tất cả đang chọn
            </CButton>
            <CButton
              disabled={selectedPostIndexs.length === 0}
              className="btn-remove"
              size="lg"
              color="info"
              onClick={() => removeAll()}
            >
              Gỡ tất cả đang chọn
            </CButton>
          </div>
          <CDataTable
            items={postsData}
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
              content: (item) => {
                return (
                  <td>
                    <div className="">{truncate(item.content)}</div>
                  </td>
                );
              },
              createdDate: (item) => {
                return (
                  <td>
                    {moment(item.createdDate).format("DD/MM/YYYY HH:mm:ss")}
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
              rpcount: (item) => {
                return (
                  <td>
                    <div>{item.reportCounts}</div>
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
                      <p className="text-muted">Nội dung bình luận:</p>
                      <div className="text-muted"> {item.content}</div>
                      <div className="group-btn">
                        <div className="mt-2 validate-group">
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => confirmPost(item, index, true)}
                          >
                            Hợp lệ
                          </CButton>
                          <CButton
                            onClick={() => confirmPost(item, index, false)}
                            size="sm"
                            color="danger"
                            className="ml-1"
                          >
                            Không hợp lệ
                          </CButton>
                          {item.images?.length > 0 && (
                            <CButton
                              onClick={() => viewImages(item)}
                              size="sm"
                              color="info"
                              className="ml-1"
                            >
                              Xem hình ảnh
                            </CButton>
                          )}
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

      <CModal
        show={showModal}
        onClose={onCLoseModal}
        size="lg"
        closeOnBackdrop="false"
      >
        <CModalHeader closeButton></CModalHeader>

        <CModalBody>
          <ImageGallery showPlayButton={false} items={images} />;
        </CModalBody>
      </CModal>
    </div>
  );
};

export default CommentCensorshipPage;
