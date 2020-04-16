import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { database } from "../../firebase";

const UserDashBoard = () => {
  const [info, setInfo] = useState("");
  useEffect(() => {
    database
      .ref("users")
      .child(localStorage.id)
      .once("value", (snapshot) => {
        setInfo(JSON.stringify(snapshot.val()));
        // const temp = [];
        // snapshot.forEach((i) => {
        //   temp.push(JSON.stringify(i.val()));
        // });
        // setInfo(temp);
      });
  }, []);

  return (
    <>
      <h1>Hello, {localStorage.getItem("name").toString()}</h1>
      <p>{info}</p>
    </>
  );
};

export default UserDashBoard;
