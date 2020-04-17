import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Redirect } from "react-router-dom";

import { database } from "../../firebase";
import SideBar from "../../components/SideBar/SideBar";
import UsersTable from "../../components/UsersTable/UsersTable";

const UserDashBoard = () => {
  //   const [info, setInfo] = useState({});
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await database.ref("users").once("value", async (snapshot) => {
        const temp = [];
        snapshot.forEach((snap) => {
          if (snap.key !== "admin") {
            const val = snap.val();
            temp.push({
              name: val.info.name,
              id: snap.key,
              status: val.status,
              remark: val.remark,
            });
          }
        });
        setUsersList(temp);
      });
    };

    fetchData();
  }, []);

  if (localStorage.accountType === "admin" && localStorage.id === "admin")
    return (
      <div className="container">
        <SideBar />
        <div className="dashboard">
          <div className="title">Grade Result</div>
          <UsersTable list={usersList} />
        </div>
      </div>
    );
  else {
    alert("Access Denied: You are not an admin.");
    return <Redirect to="/dashboard" />;
  }
};

export default UserDashBoard;
