import * as React from "react";
import "./TownTable.css";
import { useEffect } from "react";
import TownStore from "../../stores/TownStore";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import { Alert, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//------------------------functio of mui---------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    label: " שם ישוב",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
function update(name, id) {
  console.log("update town", name, id);
  TownStore.updateTown(id, name);
};

const TownTable = () => {
  useEffect(() => {
    TownStore.getTown();
    console.log("use effect", TownStore.townList);
  }, []);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showEditTown, setShowEditTown] = React.useState(false);
  const [nameTown, setNameTown] = React.useState("");
  const [idTown, setIdTown] = React.useState(0);
  const [open, setOpen] = React.useState(false);
const[showAddTown, setAddTown] = React.useState(false);
  

  const handleClose = () => {
    setOpen(false);
    // debugger;
  };

  function deleteTown(townId) {
    console.log("deleteTown", townId);
    TownStore.deleteTown(townId);
  }
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(TownStore.townList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );
function  AddTwon(){
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: () => {
          // event.preventDefault();
            handleClose();
        },
      }}
    >
      <DialogTitle>הוספת שם עיר</DialogTitle>
      <DialogContent>
        <TextField
          // autoFocus
          // required
          margin="dense"
          label="הכנס שם עיר "
          type="text"
          // fullWidth
          variant="standard"
          defaultValue={nameTown}
          onMouseLeave={(n)=>(setNameTown(n.target.value))}
        />
      </DialogContent>
  
        
        <Button>
          שליחה
        </Button>
     
    </Dialog>
  );
}
function EditTwon () {
  // console.log("editTwon", props);
  // setNameTown(props.name);
  // setIdTown(props.id);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: () => {
          // event.preventDefault();
            handleClose();
        },
      }}
    >
      <DialogTitle>עידכון שם עיר</DialogTitle>
      <DialogContent>
        <TextField
          // autoFocus
          // required
          margin="dense"
          label="הכנס שם עיר "
          type="text"
          // fullWidth
          variant="standard"
          defaultValue={nameTown}
          onMouseLeave={(n)=>(setNameTown(n.target.value))}
        />
      </DialogContent>
        <Button onClick={update(nameTown, idTown)}>
          שליחה
        </Button>
     
    </Dialog>
  );
};
  return (
    <>
   

    <Button variant="contained" className="addButton"onClick={()=>(setAddTown(true),  setOpen(true))} endIcon={<AddIcon/>}>
  הוספה
</Button>
      <Box id="townTable">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={TownStore.townList.map((town) => town.name)}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="חיפוש" />}
        />
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table  aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={TownStore.townList.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={TownStore.townList.length}
              />
              
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{ cursor: "pointer" }}
                        className="row"
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                      className="row"
                      >
                        {row?.name}
                      </TableCell>
                      <Box>
                        <TableCell
                          align="right"
                          width={"100%"}
                          className="buttonIcon"
                        >
                          {" "}
                          <Button
                            onClick={() => (
                              setNameTown(row.name),
                              setIdTown(row.id),
                              setOpen(true),
                              setShowEditTown(true)
                            )}
                          >
                            <EditIcon />
                          </Button>{" "}
                        </TableCell>
                        <TableCell align="right" className="buttonIcon">
                          <Button onClick={() => deleteTown(row.id)}>
                            {" "}
                            <DeleteIcon />{" "}
                          </Button>
                        </TableCell>
                      </Box>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={TownStore.townList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      {showEditTown &&  EditTwon()}
      {showAddTown && AddTwon()}
    </>
  );
};
export default TownTable;
