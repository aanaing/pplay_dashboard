import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CREATE_NUROUTINE,
  DELETE_NUROUTINE,
  GET_ALL_NUROUTINES,
} from "../../gql/nuRoutine";
import RemoveNuRoutine from "../../components/nutrition routine/RemoveNuRoutine";
import CreateNuRoutine from "../../components/nutrition routine/CreateNuRoutine";
import UpdateNuRoutine from "../../components/nutrition routine/UpdateNuRoutine";
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
  left: "60%",
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
  const [scroll, setScroll] = useState("paper");

  //for alert message
  const [showAlert, setShowAlert] = useState("");

  // for pagination
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loadRoutine, resutRoutine] = useLazyQuery(GET_ALL_NUROUTINES);
  const [routine, setRoutine] = useState({});

  // ---------------------****------------------------

  // get data from db
  useEffect(() => {
    loadRoutine();
  }, [loadRoutine]);

  useEffect(() => {
    console.log(resutRoutine);
    if (resutRoutine.data) {
      setRoutine(resutRoutine.data.nutrition_routine_plan);
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
  const [deleteRoutine] = useMutation(DELETE_NUROUTINE, {
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

  const handleCreateOpen = (scrollType) => {
    setCreateOpen(true);
    setScroll(scrollType);
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
            <span>Nutrition routine</span>
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
            onClick={() => handleCreateOpen("paper")}
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
          <TableContainer sx={{ maxHeight: "60vh", width: "100px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell style={{ minWidth: 180 }}>
                    Routine name
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_1
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_2
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_3
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_4
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_5
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_6
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_7
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_8
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_9
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_10
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_11
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_12
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_13
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_14
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_15
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_16
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_17
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_18
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_19
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_20
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_21
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_22
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_23
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_24
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_25
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_26
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_27
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_28
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_29
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_30
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    day_31
                  </StyledTableCell>
                  <StyledTableCell style={{ minWidth: 100 }}>
                    Actions
                  </StyledTableCell>
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
                          {row.nutrition_routine_name}
                        </StyledTableCell>
                        <StyledTableCell>{row.day_1}</StyledTableCell>
                        <StyledTableCell>{row.day_2}</StyledTableCell>
                        <StyledTableCell>{row.day_3}</StyledTableCell>
                        <StyledTableCell>{row.day_4}</StyledTableCell>
                        <StyledTableCell>{row.day_5}</StyledTableCell>
                        <StyledTableCell>{row.day_6}</StyledTableCell>
                        <StyledTableCell>{row.day_7}</StyledTableCell>
                        <StyledTableCell>{row.day_8}</StyledTableCell>
                        <StyledTableCell>{row.day_9}</StyledTableCell>
                        <StyledTableCell>{row.day_10}</StyledTableCell>
                        <StyledTableCell>{row.day_11}</StyledTableCell>
                        <StyledTableCell>{row.day_12}</StyledTableCell>
                        <StyledTableCell>{row.day_13}</StyledTableCell>
                        <StyledTableCell>{row.day_14}</StyledTableCell>
                        <StyledTableCell>{row.day_15}</StyledTableCell>
                        <StyledTableCell>{row.day_16}</StyledTableCell>
                        <StyledTableCell>{row.day_17}</StyledTableCell>
                        <StyledTableCell>{row.day_18}</StyledTableCell>
                        <StyledTableCell>{row.day_19}</StyledTableCell>
                        <StyledTableCell>{row.day_20}</StyledTableCell>
                        <StyledTableCell>{row.day_21}</StyledTableCell>
                        <StyledTableCell>{row.day_22}</StyledTableCell>
                        <StyledTableCell>{row.day_23}</StyledTableCell>
                        <StyledTableCell>{row.day_24}</StyledTableCell>
                        <StyledTableCell>{row.day_25}</StyledTableCell>
                        <StyledTableCell>{row.day_26}</StyledTableCell>
                        <StyledTableCell>{row.day_27}</StyledTableCell>
                        <StyledTableCell>{row.day_28}</StyledTableCell>
                        <StyledTableCell>{row.day_29}</StyledTableCell>
                        <StyledTableCell>{row.day_30}</StyledTableCell>
                        <StyledTableCell>{row.day_31}</StyledTableCell>
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
      {/* delete routine */}
      <div>
        <Modal
          keepMounted
          open={removeOpen}
          onClose={handleRemoveClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box style={styleR} sx={{ px: 4, py: 4, borderColor: "black" }}>
            <RemoveNuRoutine />
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
      {/* Create exe routine */}
      <div>
        <Modal
          keepMounted
          open={createOpen}
          scroll={scroll}
          onClose={handleCreateClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box style={style}>
            <CreateNuRoutine
              routineAlert={routineAlert}
              handleClose={handleCreateClose}
            />
          </Box>
        </Modal>
      </div>

      {/* update exe routine */}
      <div>
        <Modal
          keepMounted
          open={updateOpen}
          onClose={handleUpdateClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box style={style}>
            <UpdateNuRoutine
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
