import React, { useEffect, useState } from "react";
import userApi from "src/api/userApi";

function Tag(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (props.userId) {
      userApi
        .getById(props.userId)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => { });
    }
  }, [props.userId]);


  return (
    <div className="my-tag">
      <strong>{user?.userFullname}</strong>
    </div>
  );
}

export default Tag;
