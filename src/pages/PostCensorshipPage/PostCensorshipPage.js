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
} from "@coreui/react";
import { rgbToHex } from "@coreui/utils";
import { DocsLink } from "src/reusable";
import "./PostCensorshipPage.scss";

const PostCensorshipPage = () => {
  //status : 0: seen, 1: new
  const postsDataInit = [
    {
      id: 0,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Morbi quis nisl scelerisque, placerat risus at, malesuada lectus. Morbi eu justo pharetra, efficitur lectus vel, convallis leo. Proin eleifend vulputate arcu id pretium. Integer sodales, lacus a pellentesque sollicitudin, dolor risus fringilla quam, in pulvinar justo lectus eu eros. Duis sed sollicitudin metus, vel malesuada tellus. Maecenas lacinia volutpat ipsum, quis efficitur mi egestas at. Proin a libero eu sem dignissim lacinia.",
      owner: {
        userName: "Ngọc Huy",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      },
      status: "0",
    },
    {
      id: 1,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Curabitur quis libero eros. Quisque faucibus lacus ut neque suscipit, vitae porttitor felis dignissim. Phasellus semper consequat odio eu aliquet. Quisque sem est, ultrices posuere congue vel, lacinia vitae diam. Phasellus non lorem laoreet, consectetur est sed, interdum erat. Sed dignissim sagittis orci vitae suscipit.",
      owner: {
        userName: "Dũng Nguyễn",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      },
      status: "2",
    },
    {
      id: 2,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Sed ultrices fermentum malesuada. Nunc vitae consequat urna. Nam eget maximus sapien. Aenean sem sapien, fermentum ut accumsan quis, dapibus eget magna. Fusce vulputate lorem sit amet turpis iaculis, non interdum nisi gravida. Fusce cursus sollicitudin placerat. Phasellus dapibus quam ante, a tempor tellus venenatis nec.",
      owner: {
        userName: "Hồng Khoa",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      },
      status: "0",
    },
    {
      id: 3,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Sed nec enim eget nibh consequat efficitur in ac purus. Sed mollis eros augue, sed tempus enim luctus nec. Suspendisse auctor interdum enim, ac elementum neque eleifend a.",
      owner: {
        userName: "Phúc Khải",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      },
      status: "2",
    },
    {
      id: 4,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Aliquam erat volutpat. Cras mollis eros vitae felis malesuada, vitae pulvinar purus elementum. Quisque vitae viverra justo, sit amet blandit nisl. Sed neque libero, rhoncus eget accumsan at, tincidunt ac urna. Donec id condimentum diam. Vestibulum vel efficitur arcu.",
      owner: {
        userName: "Thanh Trúc",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-5.jpg",
      },
      status: "0",
    },
    {
      id: 5,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Maecenas facilisis mi neque, quis vestibulum diam mollis eget. Fusce eget enim lorem. Suspendisse aliquam eget nunc quis pellentesque. Duis dignissim dolor nisl, id volutpat lectus laoreet id.",
      owner: {
        userName: "Lily",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-6.jpg",
      },
      status: "2",
    },
    {
      id: 6,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Vestibulum ac velit at augue aliquam rhoncus. Mauris posuere enim eget vehicula euismod. Integer commodo hendrerit turpis, eget sagittis libero. Nullam feugiat ut lacus ut malesuada. Donec pretium in enim sit amet aliquam. Etiam eget elementum justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer auctor tellus ac sem auctor commodo. Mauris at nulla nulla.",
      owner: {
        userName: "Trần Dần",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-7.jpg",
      },
      status: "0",
    },
    {
      id: 7,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Duis non mauris interdum, mollis nisl sit amet, mattis sem. Phasellus fringilla erat ut metus vestibulum, sit amet volutpat nulla porta. Nunc porttitor metus iaculis tincidunt venenatis. Aliquam dui massa, scelerisque non est id, tempor tempor purus. Phasellus vulputate lectus a erat scelerisque, porta laoreet diam porttitor.",
      owner: {
        userName: "Khá Bảnh",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-8.jpg",
      },
      status: "1",
    },
    {
      id: 8,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Vivamus euismod maximus cursus. Curabitur vulputate tortor in dolor tincidunt, nec tempor urna vulputate. Duis semper convallis urna, ornare interdum turpis ultrices vitae. Duis imperdiet augue libero, et sagittis leo bibendum quis. Curabitur tincidunt sem at nibh lobortis, nec fringilla nibh ullamcorper. Donec non imperdiet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
      owner: {
        userName: "Huấn Roses",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-9.jpg",
      },
      status: "0",
    },
    {
      id: 9,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Suspendisse iaculis volutpat consequat. Donec finibus cursus neque vitae commodo. Cras consequat lectus sit amet pretium lobortis. Aliquam feugiat lobortis tellus, vitae elementum enim varius sed. In ullamcorper erat nec orci aliquam, sed auctor est mattis. Vivamus eleifend efficitur orci, ac euismod lectus.",
      owner: {
        userName: "Thanh Duyên",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-10.jpg",
      },
      status: "2",
    },
    {
      id: 10,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Maecenas luctus elit pharetra commodo porttitor. Sed vel consequat nisl, eget pharetra risus. Donec turpis urna, vestibulum at ornare in, interdum non orci. Quisque eget velit massa. Etiam eu mauris at ex egestas varius porttitor a elit. Etiam sodales porta elit sit amet tincidunt.",
      owner: {
        userName: "Rich Kid",
        userAvatar: "",
      },
      status: "0",
    },
    {
      id: 11,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Fusce luctus scelerisque velit, vel eleifend orci rhoncus id. Aliquam orci nibh, vulputate a pellentesque id, pulvinar eu justo. Cras nec turpis in eros fringilla lacinia.",
      owner: {
        userName: "Rapper",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-12.jpg",
      },
      status: "2",
    },
    {
      id: 12,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Duis viverra at dui sollicitudin ultricies. Cras at faucibus quam. Donec gravida mollis egestas. Nullam nec metus non eros facilisis sagittis vel sed mauris. Aenean euismod eget felis vel ultricies. ",
      owner: {
        userName: "Độ Mixi",
        userAvatar: "",
      },
      status: "1",
    },
    {
      id: 13,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed faucibus nunc ac tellus cursus facilisis. Suspendisse sollicitudin id nisl nec luctus. Pellentesque malesuada eu nisi id posuere. Nullam lobortis auctor eros eget ultricies. In quis massa nibh.",
      owner: {
        userName: "Đức Phúc",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-14.jpg",
      },
      status: "2",
    },
    {
      id: 14,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Suspendisse vestibulum sed est sit amet venenatis. Integer aliquam massa sit amet sapien malesuada, eu accumsan nibh congue. Morbi commodo ligula a sollicitudin rhoncus.",
      owner: {
        userName: "Hòa minzi",
        userAvatar: "",
      },
      status: "2",
    },
    {
      id: 15,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Pellentesque placerat pellentesque nulla, in porta nisl egestas ac. Ut luctus consectetur nulla ac lacinia. Ut egestas euismod tortor sed ultricies. Quisque tristique viverra ipsum ut rutrum. Nam pretium ultrices tellus nec tristique. Ut congue nunc eget gravida egestas. Proin cursus elit quis mollis aliquet. ",
      owner: {
        userName: "Shitty",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-16.jpg",
      },
      status: "1",
    },
    {
      id: 16,
      isSelected: false,
      isShown: false,
      createdDate: "18/06/2021",
      content:
        "Suspendisse pretium semper eros, vulputate aliquam lectus convallis eu. Aenean viverra nisi placerat velit lobortis pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tortor purus, ultricies vel feugiat vel, lacinia id felis.",
      owner: {
        userName: "Justin",
        userAvatar: "https://emilus.themenate.net/img/avatars/thumb-17.jpg",
      },
      status: "0",
    },
  ];

  const [postsData, setPostsData] = useState(postsDataInit);
  const [selectedPostIndexs, setSelectedPostIndexs] = useState([]);

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

  const confirmPost = (index, value) => {
    var clonedFeedbacks = [...postsData];
    clonedFeedbacks[index] = {
      ...clonedFeedbacks[index],
      status: value ? "1" : "2",
    };
    setPostsData(clonedFeedbacks);
  };

  const removeItem = (index) => {
    var clonedFeedbacks = [];
    for (let i = 0; i < postsData.length; i++) {
      if (i !== index) {
        clonedFeedbacks.push(postsData[i]);
      }
    }
    setPostsData(clonedFeedbacks);
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
    var clonedFeedbacks = [...postsData];
    for (let i = 0; i < postsData.length; i++) {
      if (selectedPostIndexs.indexOf(i) >= 0) {
        clonedFeedbacks[i] = {
          ...clonedFeedbacks[i],
          status: value ? "1" : "2", //trạng thái confirm
          isSelected: false,
        };
      }
    }
    setPostsData(clonedFeedbacks);
    setSelectedPostIndexs([]); //confirm xong bỏ chọn hết
  }

  function removeAll() {
    var clonedFeedbacks = [];
    for (let i = 0; i < postsData.length; i++) {
      if (selectedPostIndexs.indexOf(i) < 0) {
        clonedFeedbacks.push(postsData[i]);
      }
    }
    setPostsData(clonedFeedbacks);
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
    { key: "content", label: "Nội dung bài viết", _style: { width: "40%" } },
    { key: "createdDate", label: "Ngày đăng", _style: { width: "5%" } },

    { key: "owner", label: "Người đăng", _style: { width: "20%" } },
    { key: "status", label: "Trạng thái", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div className="post-censorship-page">
      <CCard>
        <CCardHeader>
          <h4>Danh sách bài viết cần kiểm duyệt</h4>
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
                return <td>{item.createdDate}</td>;
              },

              owner: (item) => {
                return (
                  <td className="owner-cell">
                    <div className="owner-cell-content">
                      {item.owner.userAvatar &&
                        item.owner.userAvatar !== "" && (
                          <img alt="" src={item.owner.userAvatar} />
                        )}

                      {item.owner.userName}
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
                      <p className="text-muted">Nội dung bài viết:</p>
                      <div className="text-muted"> {item.content}</div>
                      <div className="group-btn">
                        <div className="validate-group">
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => confirmPost(index, true)}
                          >
                            Duyệt hợp lệ
                          </CButton>
                          <CButton
                            onClick={() => confirmPost(index, false)}
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
};

export default PostCensorshipPage;