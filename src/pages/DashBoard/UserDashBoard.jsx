import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { database } from "../../firebase";
import SideBar from "../../components/SideBar/SideBar";
import InfoCard from "../../components/InfoCard/InfoCard";
import CourseTable from "../../components/Tables/CourseTable";

const UserDashBoard = () => {
  const [info, setInfo] = useState({});
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await database
        .ref("users")
        .child(localStorage.id)
        .once("value", async (snapshot) => {
          const snap = await snapshot.val();
          setInfo(snap.info);
          const temp = [];
          Object.values(snap.courses).map((course) => {
            temp.push(course);
          });
          setUserCourses(temp);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <SideBar />
      <div className="dashboard">
        <div className="title">Overall Result</div>
        <div className="flex" style={{ display: "flex" }}>
          <InfoCard info={info} />
          <CourseTable courses={userCourses} />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
