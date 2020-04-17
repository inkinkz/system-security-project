import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
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
              remark: "",
            });
          }
        });
        setUsersList(temp);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <SideBar />
      <div className="dashboard">
        <div className="title">Grade Result</div>
        <UsersTable list={usersList} />
      </div>
    </div>
  );
};

export default UserDashBoard;
