import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CButton,
  CCollapse,
  CInputCheckbox,
} from "@coreui/react";
import "./CommentCensorshipPage.scss";
import moment from "moment";
import "moment/locale/vi";
import commentReportApi from "src/api/commentReportApi";
import Tag from "src/Tag/Tag";
import { toast } from "react-toastify";
import CustomToast from "src/CustomToast/CustomToast";

moment.locale("vi");

const CommentCensorshipPage = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [selectedCommentIndexs, setSelectedCommentIndexs] = useState([]);

  useEffect(() => {
    commentReportApi
      .getReports()
      .then((res) => {
        setCommentsData(res.data);
      })
      .catch((err) => { });
  }, []);

  useEffect(() => {
    let clonedSelecteds = [];
    for (let i = 0; i < commentsData.length; i++) {
      if (commentsData[i].isSelected) {
        clonedSelecteds.push(i);
      }
    }
    setSelectedCommentIndexs(clonedSelecteds);
    console.log(clonedSelecteds);
  }, [commentsData]);

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

  const confirmComment = (item, index, value) => {
    let clonedComments = [...commentsData];
    clonedComments.splice(index, 1);

    if (value) {
      commentReportApi
        .acceptComments({
          commentIds: [item.commentId],
        })
        .then((res) => {
          setCommentsData(clonedComments);
          showSuccess();
        })
        .catch((err) => {
          showError();
        });
    } else {
      commentReportApi
        .denyComments({
          commentIds: [item.commentId],
        })
        .then((res) => {
          setCommentsData(clonedComments);
          showSuccess();
        })
        .catch((err) => {
          showError();
        });
    }

    //setCommentsData(clonedComments)
  };

  const removeItem = (item, index) => {
    let clonedComments = [];
    for (let i = 0; i < commentsData.length; i++) {
      if (i !== index) {
        clonedComments.push(commentsData[i]);
      }
    }

    commentReportApi
      .removeReports({
        commentIds: [item.commentId],
      })
      .then((res) => {
        setCommentsData(clonedComments);
        showSuccess();
      })
      .catch((err) => {
        showError();
      });

    //setCommentsData(clonedComments);
  };

  const toggleDetails = (index) => {
    let clonedComments = [...commentsData];
    const isShown = clonedComments[index].isShown;
    clonedComments[index] = {
      ...clonedComments[index],
      isShown: !isShown,
    };
    setCommentsData(clonedComments);
  };

  const onSelectRow = (index) => {
    //debugger;
    let clonedComments = [...commentsData];
    const isSelected = clonedComments[index].isSelected;
    clonedComments[index] = {
      ...clonedComments[index],
      isSelected: !isSelected,
    };
    setCommentsData(clonedComments);
  };

  function truncate(str, n = 150) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function confirmAll(value) {
    let comments = [];
    let clonedComments = [];
    for (let i = 0; i < commentsData.length; i++) {
      if (selectedCommentIndexs.indexOf(i) < 0) {
        clonedComments.push(commentsData[i]);
      }
      else {
        comments.push(commentsData[i].commentId);
      }
    }

    if (value) {
      commentReportApi
        .acceptComments({
          commentIds: comments,
        })
        .then((res) => {
          setCommentsData(clonedComments);
          showSuccess();
        })
        .catch((err) => {
          showError();
        });
    } else {
      commentReportApi
        .denyComments({
          commentIds: comments,
        })
        .then((res) => {
          setCommentsData(clonedComments);
          showSuccess();
        })
        .catch((err) => {
          showError();
        });
    }

    //setCommentsData(clonedComments);
    setSelectedCommentIndexs([]); //confirm xong bỏ chọn hết
  }

  function removeAll() {
    let comments = [];
    let clonedComments = [];
    for (let i = 0; i < commentsData.length; i++) {
      if (selectedCommentIndexs.indexOf(i) < 0) {
        clonedComments.push(commentsData[i]);
      }
      else {
        comments.push(commentsData[i].commentId);
      }
    }

    commentReportApi
      .removeReports({
        commentIds: comments,
      })
      .then((res) => {
        setCommentsData(clonedComments);
        showSuccess();
      })
      .catch((err) => {
        showError();
      });

    //setCommentsData(clonedComments);

    setSelectedCommentIndexs([]); //confirm xong bỏ chọn hết
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
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const mapStringToJsx = (str) => {
    const myArr = str.split("<@tag>");
    return myArr.map((ele, index) => {
      if (index % 2 === 0) {
        return (
          <div
            className="normal-text-comment"
            dangerouslySetInnerHTML={{ __html: ele }}
          ></div>
        );
      } else {
        return (
          <Tag
            userId={ele}
          />
        );
      }
    });
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
              disabled={selectedCommentIndexs.length === 0}
              className="btn-valid mr-3"
              size="lg"
              color="success"
              onClick={() => confirmAll(true)}
            >
              Duyệt tất cả đang chọn
            </CButton>
            <CButton
              disabled={selectedCommentIndexs.length === 0}
              className="btn-valid mr-3"
              size="lg"
              color="danger"
              onClick={() => confirmAll(false)}
            >
              Chặn tất cả đang chọn
            </CButton>
            <CButton
              disabled={selectedCommentIndexs.length === 0}
              className="btn-remove"
              size="lg"
              color="info"
              onClick={() => removeAll()}
            >
              Gỡ tất cả đang chọn
            </CButton>
          </div>
          <CDataTable
            items={commentsData}
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
                    <div className="">{mapStringToJsx(item.content)}</div>
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
                      <div className="text-muted"> {mapStringToJsx(item.content)}</div>
                      <div className="group-btn">
                        <div className="mt-2 validate-group">
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => confirmComment(item, index, true)}
                          >
                            Hợp lệ
                          </CButton>
                          <CButton
                            onClick={() => confirmComment(item, index, false)}
                            size="sm"
                            color="danger"
                            className="ml-1"
                          >
                            Không hợp lệ
                          </CButton>
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
};

export default CommentCensorshipPage;
