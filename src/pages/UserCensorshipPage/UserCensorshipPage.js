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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import { rgbToHex } from "@coreui/utils";
import { DocsLink } from "src/reusable";
import "./UserCensorshipPage.scss";

const UserCensorshipPage = () => {
  //status : 0: banned, 1: active
  const usersDataInit = [
    {
      userEmail: "ngochuy@gmail.com",
      userName: "Ngọc Huy",
      userDescription: "Intern Talent at MOMO Company",
      userDateOfBirth: "18/06/1999",
      userPhoneNumber: "0376552987",
      userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-1.jpg",
      userCreatedAt: "20/02/2021",
      userAddress: "Tri Thủy, Tri Hải, Ninh Hải, Ninh Thuận",
      userFBlink: "facebook.com/ngochuy",
      userGithubLink: "github.com/ngochuy",
      //props phụ cho render ui
      status: 1,
      isShown: false,
      isSelected: false,
    },
    {
      userEmail: "tiendunghk@gmail.com",
      userName: "Tiến Dũng",
      userDescription: "GanNha senior, free lancer at home",
      userDateOfBirth: "17/07/1999",
      userPhoneNumber: "0376552987",
      userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-2.jpg",
      userCreatedAt: "18/01/2021",
      userAddress: "Việt Nam",
      userFBlink: "facebook.com/tiendunghk",
      userGithubLink: "github.com/tiendunghk",
      //props phụ cho render ui
      status: 0,
      isShown: false,
      isSelected: false,
    },
    {
      userEmail: "thetri@gmail.com",
      userName: "Thế Trí",
      userDescription: "No job, seeking for new job",
      userDateOfBirth: "17/06/2000",
      userPhoneNumber: "0376552987",
      userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-3.jpg",
      userCreatedAt: "11/03/2021",
      userAddress: "Dĩ An, Bình Dương",
      userFBlink: "facebook.com/thetri",
      userGithubLink: "github.com/thetri",
      //props phụ cho render ui
      status: 1,
      isShown: false,
      isSelected: false,
    },
    {
      userEmail: "khoanguyen@gmail.com",
      userName: "Khoa Nguyễn",
      userDescription: "Homeless at USA, seeking for new home",
      userDateOfBirth: "18/06/1999",
      userPhoneNumber: "0376552987",
      userImageUrl: "https://emilus.themenate.net/img/avatars/thumb-4.jpg",
      userCreatedAt: "11/03/2021",
      userAddress: "Số 10 Tam Phú, Thủ Đức",
      userFBlink: "facebook.com/khoanguyen99",
      userGithubLink: "github.com/khoanguyen99",
      //props phụ cho render ui
      status: 1,
      isShown: false,
      isSelected: false,
    },
  ];

  const [usersData, setUsersData] = useState(usersDataInit);
  const [selectedUserIndexs, setSelectedUserIndexs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    var clonedSelecteds = [];
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].isSelected) {
        clonedSelecteds.push(i);
      }
    }
    setSelectedUserIndexs(clonedSelecteds);
    console.log(clonedSelecteds);
  }, [usersData]);

  const confirmUser = (index, value) => {
    var clonedUsers = [...usersData];
    clonedUsers[index] = {
      ...clonedUsers[index],
      status: value ? 1 : 0,
    };
    setUsersData(clonedUsers);
  };

  const toggleDetails = (index) => {
    var clonedUsers = [...usersData];
    const isShown = clonedUsers[index].isShown;
    clonedUsers[index] = {
      ...clonedUsers[index],
      isShown: !isShown,
    };
    setUsersData(clonedUsers);
  };

  const onSelectRow = (index) => {
    //debugger;
    var clonedUsers = [...usersData];
    const isSelected = clonedUsers[index].isSelected;
    clonedUsers[index] = {
      ...clonedUsers[index],
      isSelected: !isSelected,
    };
    setUsersData(clonedUsers);
  };

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
        return "Bình thường";
      default:
        return "Đã chặn";
    }
  };

  function confirmAll(value) {
    var clonedUsers = [...usersData];
    for (let i = 0; i < clonedUsers.length; i++) {
      if (selectedUserIndexs.indexOf(i) >= 0) {
        clonedUsers[i] = {
          ...clonedUsers[i],
          status: value ? 1 : 0, //trạng thái confirm
          isSelected: false,
        };
      }
    }
    setUsersData(clonedUsers);
    setSelectedUserIndexs([]); //confirm xong bỏ chọn hết
  }

  const fields = [
    {
      key: "select",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "avatar",
      label: "Avatar",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
    {
      key: "name",
      label: "Tên người dùng",
      _style: { width: "30%" },
      sorter: true,
      filter: true,
    },
    { key: "email", label: "Email", _style: { width: "20%" } },
    { key: "status", label: "Trạng thái", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  function convertInfo(info, image = false) {
    if (image) {
      if (!info || info === "") {
        return <div className="no-info">Không có</div>;
      }
      return <img alt="" src={info} />;
    }
    if (!info || info === "") {
      return <div className="no-info">Không có</div>;
    }
    return <div className="normal-info">{info}</div>;
  }

  const [newMode, setNewMode] = useState(0); //0:tuần, 1:tháng, 2:năm

  return (
    <div className="user-censorship-page">
      <CCard>
        <CCardHeader>
          <h4>Danh sách người dùng ứng dụng</h4>
        </CCardHeader>
        <CCardBody>
          <div className="show-new-group">
            <div className={`toggle-group ${!showFilter ? "disable" : ""}`}>
              <CInputCheckbox
                checked={showFilter}
                onChange={() => setShowFilter(!showFilter)}
              />
              Xem Người dùng mới
            </div>

            <CCollapse show={showFilter}>
              <CDropdown className="">
                <CDropdownToggle>
                  {newMode === 0 && "Tuần"}
                  {newMode === 1 && "Tháng"}
                  {newMode === 2 && "Năm"}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    className={`${newMode === 0 ? "active" : ""}`}
                    onClick={() => setNewMode(0)}
                  >
                    Tuần
                  </CDropdownItem>
                  <CDropdownItem
                    className={`${newMode === 1 ? "active" : ""}`}
                    onClick={() => setNewMode(1)}
                  >
                    Tháng
                  </CDropdownItem>
                  <CDropdownItem
                    className={`${newMode === 2 ? "active" : ""}`}
                    onClick={() => setNewMode(2)}
                  >
                    Năm
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCollapse>
          </div>
          <div className="button-selection-group">
            <CButton
              disabled={selectedUserIndexs.length === 0}
              className="btn-valid mr-3"
              size="lg"
              color="success"
              onClick={() => confirmAll(true)}
            >
              Bỏ chặn tất cả
            </CButton>
            <CButton
              disabled={selectedUserIndexs.length === 0}
              className="btn-invalid mr-3"
              size="lg"
              color="danger"
              onClick={() => confirmAll(false)}
            >
              Chặn tất cả
            </CButton>
          </div>
          <CDataTable
            items={usersData}
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
              avatar: (item) => {
                return (
                  <td>
                    <img
                      className="user-image"
                      alt=""
                      src={item.userImageUrl}
                    />
                  </td>
                );
              },
              name: (item) => {
                return (
                  <td>
                    <div className="user-name">{item.userName}</div>
                  </td>
                );
              },
              email: (item) => {
                return (
                  <td className="owner-cell">
                    <div className="user-email">{item.userEmail}</div>
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
                      <div className="">Thông tin người dùng: </div>
                      <div className="info-group">
                        <div className="avatar">
                          Ảnh ̣đại diện:{` `}
                          {convertInfo(item.userImageUrl, true)}
                        </div>
                        <div className="name">
                          Tên người dùng:{` `}
                          {convertInfo(item.userName)}
                        </div>
                        <div className="email">
                          Email:{` `}
                          {convertInfo(item.userName)}
                        </div>
                        <div className="dateofbirth">
                          Ngày sinh:{` `}
                          {convertInfo(item.userDateOfBirth)}
                        </div>
                        <div className="description">
                          Mô tả:{` `}
                          {convertInfo(item.userDescription)}
                        </div>
                        <div className="phonenumber">
                          Số điện thoại:{` `}
                          {convertInfo(item.userPhoneNumber)}
                        </div>
                        <div className="createdat">
                          Ngày tạo:{` `}
                          {convertInfo(item.userCreatedAt)}
                        </div>
                        <div className="address">
                          Địa chỉ:{` `}
                          {convertInfo(item.userAddress)}
                        </div>
                        <div className="fb">
                          Địa chỉ Facebook:{` `}
                          {convertInfo(item.userFBlink)}
                        </div>
                        <div className="github">
                          Địa chỉ Github:{` `}
                          {convertInfo(item.userGithubLink)}
                        </div>
                      </div>
                      <div className="group-btn">
                        {item.status === 0 && (
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => confirmUser(index, true)}
                          >
                            Bỏ chặn người dùng
                          </CButton>
                        )}
                        {item.status === 1 && (
                          <CButton
                            onClick={() => confirmUser(index, false)}
                            size="sm"
                            color="danger"
                            className=""
                          >
                            Chặn người dùng
                          </CButton>
                        )}
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

export default UserCensorshipPage;
