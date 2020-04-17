import React, { useState, useEffect } from "react";
import "./GradeEditTable.scss";
import { database } from "../../firebase";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  table: {
    maxWidth: 816,
    maxHeight: 300,
  },
});

const buttonStyle = {
  position: "absolute",
  bottom: "24px",
  right: "24px",
  width: "137px",
  height: "36px",
  borderRadius: "2px",
};

const UsersTable = ({ id }) => {
  const classes = useStyles();
  const [userCourses, setUserCourses] = useState([]);
  const [grade, setGrade] = useState([]);
  const [graded, setGraded] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [gradeChange, setGradeChange] = useState([]);

  const studentRef = database.ref("users").child(id);

  const fetchData = async () => {
    await database
      .ref("users")
      .child(id)
      .once("value", async (snapshot) => {
        const snap = snapshot.val();
        const temp = [];
        const g = [];
        setGraded(snap.status);
        Object.values(snap.courses).forEach((course) => {
          g.push(course.grade);
          temp.push(course);
        });
        setGrade(g);
        setUserCourses(temp);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const tempGrade = async (i, course_id, newGrade) => {
    setGrade(
      grade.map((value, j) => {
        if (i === j) {
          value = newGrade;
        }
        return value;
      })
    );

    const temp = [...gradeChange];
    temp.push({ course_id, newGrade });
    setGradeChange(temp);
  };

  const saveGrade = () => {
    let isGraded = true;
    gradeChange.forEach((item) => {
      if (item.newGrade.includes("-")) isGraded = false;
      studentRef
        .child("courses")
        .child(item.course_id)
        .update({ grade: item.newGrade });
    });
    if (isGraded) studentRef.update({ status: "Graded" });
    else studentRef.update({ status: "Not Graded" });
    fetchData();
    alert("Grade Updated!");
  };

  if (redirect)
    return <Redirect to="/thispageisonlyforadmin/dashboardforadmin" />;
  else
    return (
      <div className="grade-edit-table-container">
        <div className="table-title">Semester 2/2019</div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#0000008f" }}>Course Name</TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Credits
              </TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Grade
              </TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Remark
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userCourses.map((data, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {data.course_name}
                </TableCell>
                <TableCell align="right">{data.credits}</TableCell>

                <TableCell align="right">
                  <Select
                    variant="outlined"
                    labelId="grade-select"
                    id="grade"
                    value={grade[i]}
                    onChange={(e) =>
                      tempGrade(i, data.course_id, e.target.value)
                    }
                    style={{ height: "34px", padding: 0 }}
                  >
                    <MenuItem value="-">
                      <em>-</em>
                    </MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                    <MenuItem value="W">W</MenuItem>
                  </Select>
                </TableCell>

                <TableCell align="right">{data.remark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="status-text">
          Status:
          <span style={{ color: graded === "Graded" ? "#4CAF50" : "#F44336" }}>
            {" "}
            {graded}
          </span>
        </div>
        <div className="discard-text" onClick={() => setRedirect(true)}>
          Discard
        </div>
        <Button
          style={buttonStyle}
          variant="contained"
          color="primary"
          onClick={() => saveGrade()}
          disableElevation
        >
          SAVE CHANGE
        </Button>
      </div>
    );
};

export default UsersTable;
