import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import "./UsersTable.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    maxWidth: 1094,
    maxHeight: 500,
  },
});

const UsersTable = (props) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState({ id: "", go: false });

  const grade = (id) => {
    setRedirect({ id, go: true });
  };

  if (redirect.go) return <Redirect to={`/admin/manage/${redirect.id}`} />;
  else
    return (
      <div className="student-list-table-container">
        <div className="table-title">Semester 2/2019</div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#0000008f" }}>Student Name</TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Student ID
              </TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Status
              </TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Remark
              </TableCell>
              <TableCell style={{ color: "#0000008f" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.list.map((data) => (
              <TableRow key={data.name}>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="right">{data.id}</TableCell>
                <TableCell
                  align="right"
                  style={{ color: data.status === "Graded" ? "green" : "red" }}
                >
                  {data.status}
                </TableCell>
                <TableCell align="right">{data.remark}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: "64px" }}
                    onClick={() => grade(data.id)}
                  >
                    Grade
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
};

export default UsersTable;
