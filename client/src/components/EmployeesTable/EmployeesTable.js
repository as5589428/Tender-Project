import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const styles = {
  tableContainer: { maxWidth: 700, marginBottom: 30 },
  linkIcon: { paddingRight: 3, fontSize: 20, color: "#d63e2f" },
};

const EmployeesTable = ({ employeesData, onRemove }) => (
  <TableContainer component={Paper} style={styles.tableContainer}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Surname</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Remove</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employeesData.map((employee, index) => (
          <Employee
            key={employee._id}
            employee={employee}
            onRemove={onRemove}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Employee = ({ employee, onRemove, index }) => {
  const { _id: id, name, surname, date } = employee;
  const navigate = useNavigate();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{surname}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<ModeEditIcon />}
          onClick={() => navigate(`/update-employee/${id}`)}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onRemove(id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default EmployeesTable;
