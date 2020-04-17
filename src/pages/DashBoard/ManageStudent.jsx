import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./Dashboard.scss";
import { database } from "../../firebase";
import SideBar from "../../components/SideBar/SideBar";
import InfoCard from "../../components/InfoCard/InfoCard";
import GradeEditTable from "../../components/GradeEditTable/GradeEditTable";

const ManageStudent = () => {
  const studentId = useParams().studentId;
  const [info, setInfo] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await database
        .ref("users")
        .child(studentId)
        .once("value", async (snapshot) => {
          const snap = await snapshot.val();
          setInfo(snap.info);
        });
    };
    fetchData();
  }, [studentId]);

  const back = () => {
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/admin/dashboard" />;
  else
    return (
      <div className="container">
        <SideBar />
        <div className="dashboard">
          <div className="back-button" onClick={() => back()}>
            &lt; Back to grade result
          </div>
          <div className="grading-text">Grading</div>
          <div className="flex" style={{ display: "flex" }}>
            <InfoCard info={info} id={studentId} />
            <GradeEditTable id={studentId} />
          </div>
        </div>
      </div>
    );
};

export default ManageStudent;
