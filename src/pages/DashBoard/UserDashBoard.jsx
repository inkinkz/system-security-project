import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

import { database } from "../../firebase";
import SideBar from "../../components/SideBar/SideBar";
import InfoCard from "../../components/InfoCard/InfoCard";
import CourseTable from "../../components/CourseTable/CourseTable";

const UserDashBoard = () => {
  const [info, setInfo] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const studentId = useParams().studentId;

  useEffect(() => {
    const fetchData = async () => {
      await database
        .ref("users")
        .child(studentId)
        .once("value", async (snapshot) => {
          const snap = snapshot.val();
          setInfo(snap.info);
          const temp = [];
          Object.values(snap.courses).forEach((course) => {
            temp.push(course);
          });
          setUserCourses(temp);
        });
    };
    fetchData();
  }, [studentId]);

  if (!localStorage.getItem("id")) return <Redirect to="/" />;
  else if (localStorage.accountType === "admin")
    return <Redirect to="/admin/dashboard" />;
  else
    return (
      <div className="container">
        <SideBar />
        <div className="dashboard">
          <div className="title">Overall Result</div>
          <div className="flex" style={{ display: "flex" }}>
            <InfoCard info={info} id={studentId} />
            <CourseTable courses={userCourses} />
          </div>
        </div>
      </div>
    );
};

export default UserDashBoard;
