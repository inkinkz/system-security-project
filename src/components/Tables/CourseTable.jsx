import React, { useEffect, useState } from "react";
import "./Tables.scss";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    maxWidth: 816,
    maxHeight: 296,
  },
});

const CourseTable = (props) => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(props.data);
    const temp = [];
    props.courses.map((course) => {
      console.log(course);
      temp.push({
        course_name: course.course_name,
        credits: course.credits,
        status: course.status,
        grade: course.grade,
        remark: course.remark,
      });
    });
    setData(temp);
  }, [props]);

  return (
    <div className="table-container">
      <div className="table-title">Semester 2/2019</div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "#0000008f" }}>Course Name</TableCell>
            <TableCell style={{ color: "#0000008f" }} align="right">
              Credit(s)
            </TableCell>
            <TableCell style={{ color: "#0000008f" }} align="right">
              Status
            </TableCell>
            <TableCell style={{ color: "#0000008f" }} align="right">
              Result
            </TableCell>
            <TableCell style={{ color: "#0000008f" }} align="right">
              Remark
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.course_name}>
              <TableCell component="th" scope="row">
                {data.course_name}
              </TableCell>
              <TableCell align="right">{data.credits}</TableCell>
              <TableCell
                align="right"
                style={{ color: data.status === "Graded" ? "green" : "red" }}
              >
                {data.status}
              </TableCell>
              <TableCell align="right">{data.grade}</TableCell>
              <TableCell align="right">{data.remark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
