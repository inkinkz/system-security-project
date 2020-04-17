import React from "react";
import "./InfoCard.scss";

const InfoCard = (props) => {
  return (
    <div className="info-card">
      <div className="card-title">Profile</div>
      <ul>
        <li>
          <div className="topic">Name</div>
          <div className="info">{props.info.name}</div>
        </li>
      </ul>
      <ul>
        <li>
          <div className="topic">Student ID</div>
          <div className="info">{props.info.name ? props.id : ""}</div>
        </li>
      </ul>
      <ul>
        <li>
          <div className="topic">Faculty</div>
          <div className="info">{props.info.faculty}</div>
        </li>
      </ul>
      <ul>
        <li>
          <div className="topic">Major </div>
          <div className="info">{props.info.major}</div>
        </li>
      </ul>
    </div>
  );
};

export default InfoCard;
