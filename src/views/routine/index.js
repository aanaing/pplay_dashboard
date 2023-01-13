import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CREATE_EXE_ROUTINE,
  DELETE_EXE_ROUTINE,
  EXE_ROUTINE,
} from "../../gql/exeRoutine";
import RemoveRoutine from "../../components/exerciseRoutine/RemoveRoutine";
import CreateRoutine from "../../components/exerciseRoutine/CreateRoutine";
import UpdateRoutine from "../../components/exerciseRoutine/UpdateRoutine";
import DirectionsIcon from "@mui/icons-material/Directions";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  Breadcrumbs,
  Button,
  TableBody,
  TablePagination,
  TableHead,
  TableRow,
  TableContainer,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  Box,
  Modal,
  InputBase,
  Paper,
  autocompleteClasses,
} from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  //bgcolor: "white",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 8,
};
const styleR = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 300,
  backgroundColor: "#cecece",
};

const Routine = () => {
  //for search button
  const [search, setSearch] = useState("");

  //for routine modal
  const [removeRoutine, setRemoveRoutine] = useState("");
  const [updateRoutine, setUpdateRoutine] = useState("");
  const [removeOpen, setRemoveOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  //for alert message
  const [showAlert, setShowAlert] = useState("");

  // for pagination
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loadRoutine, resutRoutine] = useLazyQuery(EXE_ROUTINE);
  const [routine, setRoutine] = useState({});

  // ---------------------****------------------------

  // get data from db
  useEffect(() => {
    loadRoutine();
  }, [loadRoutine]);

  useEffect(() => {
    if (resutRoutine.data) {
      setRoutine(resutRoutine.data.exercise_routine);
    }
  }, [resutRoutine]);
  // console.log(routine);

  //for search button
  const handleSearch = (e) => {
    setSearch(document.getElementById("search-by-title").value);
  };
  useEffect(() => {
    loadRoutine({ variables: { search: `%${search}%` } });
  }, [loadRoutine, search]);

  //------------- REMOVE ROUTINE -------------
  const [deleteRoutine] = useMutation(DELETE_EXE_ROUTINE, {
    onError: (error) => {
      console.log("error : ", error);
    },
    onCompleted: () => {
      setShowAlert({
        message: "Routine has been deleted",
        isError: false,
      });
      setTimeout(() => {
        setShowAlert({ message: "", isError: false });
      }, 3000);
    },
  });

  const handleRemove = () => {
    if (!removeRoutine) {
      return;
    }
    deleteRoutine({ variables: { id: removeRoutine.id } });
    resutRoutine.refetch();
    setRemoveOpen(false);
  };

  // for modal box
  const handleRemoveOpen = (row) => {
    setRemoveRoutine(row);
    setRemoveOpen(true);
  };

  const handleRemoveClose = () => {
    setRemoveOpen(false);
  };

  //------------ ADD routine -------------
  const routineAlert = (message, isError = false) => {
    setShowAlert({ message: "", isError: false });
    setTimeout(() => {
      setShowAlert({ message: "", isError: false });
    }, 3000);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    resutRoutine.refetch();
    setCreateOpen(false);
  };

  // ----------------------- UPDATE Routine --------------
  const handleUpdateOpen = (row) => {
    setUpdateRoutine(row);
    //setRoutine(row);
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => {
    console.log("index");
    resutRoutine.refetch();
    setUpdateOpen(false);
  };

  // for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setOffset(rowsPerPage * newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //      backgroundColor: theme.palette.grey[700],
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.black,
      fontSize: 18,
      fontWeight: "bold",
      minWidth: 70,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      //backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  if (!routine) {
    return <em>Loading .....</em>;
  }

  return (
    <>
      <div className="align">
        {/* dashboard */}
        <div>
          <Breadcrumbs
            aria-label="breadcrumb"
            fontWeight="bold"
            fontSize="1.2rem"
          >
            <Link to="/" className="dashboard">
              Dashboard
            </Link>
            <span>Exercise routine</span>
          </Breadcrumbs>
        </div>
        {/* search */}
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 350,
            }}
          >
            {/* Search Box */}

            <InputBase
              id="search-by-title"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search By Routine Name"
              type="search"
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="warning"
              id="search-by-title"
              sx={{ p: "10px" }}
              aria-label="directions"
              value={search}
              onClick={handleSearch}
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            sx={{
              width: 100,
              height: 60,
              p: 2,
              fontWeight: "bold",
            }}
            color="secondary"
            onClick={handleCreateOpen}
          >
            Add
          </Button>
        </Box>
      </div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexFlow: "wrap row",
            "& > :not(style)": {
              m: 1,
              width: "100%",
              minHeight: "25vh",
            },
            mt: "1rem",
          }}
        >
          <TableContainer sx={{ maxHeight: "60vh", Width: "10px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Routine name</StyledTableCell>
                  <StyledTableCell>day_1</StyledTableCell>
                  <StyledTableCell>day_2</StyledTableCell>
                  <StyledTableCell>day_3</StyledTableCell>
                  <StyledTableCell>day_4</StyledTableCell>
                  <StyledTableCell>day_5</StyledTableCell>
                  <StyledTableCell>day_6</StyledTableCell>
                  <StyledTableCell>day_7</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(routine)
                  ? routine.map((row, index) => (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                      >
                        <StyledTableCell>
                          {row.id.substring(0, 8)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.exercise_routine_name}
                        </StyledTableCell>
                        <StyledTableCell>{row.day_1}</StyledTableCell>
                        <StyledTableCell>{row.day_2}</StyledTableCell>
                        <StyledTableCell>{row.day_3}</StyledTableCell>
                        <StyledTableCell>{row.day_4}</StyledTableCell>
                        <StyledTableCell>{row.day_5}</StyledTableCell>
                        <StyledTableCell>{row.day_6}</StyledTableCell>
                        <StyledTableCell>{row.day_7}</StyledTableCell>
                        <StyledTableCell>
                          <Button
                            onClick={() => handleRemoveOpen(row)}
                            size="small"
                            color="error"
                          >
                            Remove
                          </Button>
                          <Button
                            onClick={() => handleUpdateOpen(row)}
                            size="small"
                            color="primary"
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : "-"}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ color: "black" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </div>
      <div>
        <Modal
          keepMounted
          open={removeOpen}
          onClose={handleRemoveClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box style={styleR} sx={{ px: 4, py: 4, borderColor: "black" }}>
            <RemoveRoutine />
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button color="primary" onClick={handleRemoveClose}>
                Cancel
              </Button>
              <Button color="error" onClick={handleRemove}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          keepMounted
          open={createOpen}
          onClose={handleCreateClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box style={style}>
            <CreateRoutine
              routineAlert={routineAlert}
              handleClose={handleCreateClose}
            />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          keepMounted
          open={updateOpen}
          onClose={handleUpdateClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box style={style}>
            <UpdateRoutine
              routineAlert={routineAlert}
              handleClose={handleUpdateClose}
              value={updateRoutine}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Routine;
