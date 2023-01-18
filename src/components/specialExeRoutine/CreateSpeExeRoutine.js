import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import {
  CREATE_SPECIAL_EXE_ROUTINE,
  USER_ID,
} from "../../gql/specialExeRoutine";

const CreateSpeExeRoutine = ({ handleClose, routineAlert }) => {
  const [values, setValues] = useState({
    special_exe_routine_name: "",
    user_name: "",
    day_1: "",
    day_2: "",
    day_3: "",
    day_4: "",
    day_5: "",
    day_6: "",
    day_7: "",
  });
  const [errors, setErrors] = useState({
    special_exe_routine_name: "",
    user_name: "",
    day_1: "",
    day_2: "",
    day_3: "",
    day_4: "",
    day_5: "",
    day_6: "",
    day_7: "",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [loadUser, resultUser] = useLazyQuery(USER_ID);
  const [sub, setSub] = useState({});
  //const [loadSub, resultSub] = useLazyQuery(SUB_TYPE_NAME);

  // useEffect(() => {
  //   loadSub();
  // }, [loadSub]);

  // useEffect(() => {
  //   if (resultSub.data) {
  //     setSub(resultSub.data.video_sub_type);
  //   }
  // }, [resultSub]);

  //for user data
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  useEffect(() => {
    if (resultUser.data) {
      setUser(resultUser.data.users);
      console.log(resultUser.data.users);
    }
  }, [resultUser]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [createRoutine] = useMutation(CREATE_SPECIAL_EXE_ROUTINE, {
    onError: (error) => {
      console.log("error : ", error);
      setLoading(false);
      console.log("wrong");
    },
    onCompleted: () => {
      console.log("right");
      setValues({
        special_exe_routine_name: "",
        user_name: "",
        day_1: "",
        day_2: "",
        day_3: "",
        day_4: "",
        day_5: "",
        day_6: "",
        day_7: "",
      });
      setErrors({
        special_exe_routine_name: "",
        user_name: "",
        day_1: "",
        day_2: "",
        day_3: "",
        day_4: "",
        day_5: "",
        day_6: "",
        day_7: "",
      });
      setLoading(false);
      routineAlert("New Routine has been added");
      handleClose();
    },
  });

  const handleCreate = () => {
    setLoading(true);
    setErrors({
      special_exe_routine_name: "",
      user_name: "",
      day_1: "",
      day_2: "",
      day_3: "",
      day_4: "",
      day_5: "",
      day_6: "",
      day_7: "",
    });
    let isErrorExit = false;
    let errorObject = {};

    if (!values.special_exe_routine_name) {
      errorObject.special_exe_routine_name = "Routine name is required";
      isErrorExit = true;
    }
    if (!values.day_1) {
      errorObject.day_1 = "day 1 is required";
      isErrorExit = true;
    }
    if (!values.day_2) {
      errorObject.day_2 = "day 2 is required";
      isErrorExit = true;
    }
    if (!values.day_3) {
      errorObject.day_3 = "day 3 is required";
      isErrorExit = true;
    }
    if (!values.day_4) {
      errorObject.day_4 = "day 4 is required";
      isErrorExit = true;
    }
    if (!values.day_5) {
      errorObject.day_5 = "day 5 is required";
      isErrorExit = true;
    }
    if (!values.day_6) {
      errorObject.day_6 = "day 6 is required";
      isErrorExit = true;
    }
    if (!values.day_7) {
      errorObject.day_7 = "day 7 is required";
      isErrorExit = true;
    }
    if (isErrorExit) {
      setErrors(errorObject);
      setLoading(false);
      return;
    }
    try {
      createRoutine({ variables: { ...values } });
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log(values);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
          maxWidth: 820,
          bgcolor: "#cecece",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          py: 2,
        }}
      >
        <Typography variant="h5" component="h2" color="black" sx={{ mx: 4 }}>
          Create Routine
        </Typography>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          sx={{ mx: 4 }}
        >
          Close
        </Button>
      </Box>
      <Card
        sx={{
          display: "flex",
          justifyContent: "flex-start",

          bgcolor: "white",
          maxWidth: 820,
          borderRadius: 0,
          height: 590,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <CardContent sx={{ my: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: 330,
              ml: 5,
            }}
          >
            <TextField
              id="special_exe_routine_name"
              label="special_exe_routine_name"
              sx={{ my: 2 }}
              value={values.special_exe_routine_name}
              onChange={handleChange("special_exe_routine_name")}
              error={errors.special_exe_routine_name ? true : false}
              helperText={errors.special_exe_routine_name}
            />

            {/* <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_1</InputLabel>
              <Select
                labelId="day_1"
                value={values.sub_name}
                label="day_1"
                onChange={handleChange_1("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.d_1 && (
                <FormHelperText error>{errors.d_1}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_2</InputLabel>
              <Select
                labelId="day_2"
                value={values.sub_name}
                label="day_2"
                onChange={handleChange_2("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.sub_name && (
                <FormHelperText error>{errors.sub_name}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_3</InputLabel>
              <Select
                labelId="day_3"
                value={values.sub_name}
                label="day_3"
                onChange={handleChange_3("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.sub_name && (
                <FormHelperText error>{errors.sub_name}</FormHelperText>
              )}
            </FormControl> */}
            <TextField
              id="day_1"
              label="day_1"
              sx={{ my: 2 }}
              value={values.day_1}
              onChange={handleChange("day_1")}
              error={errors.day_1 ? true : false}
              helperText={errors.day_1}
            />
            <TextField
              id="day_2"
              label="day_2"
              sx={{ my: 2 }}
              value={values.day_2}
              onChange={handleChange("day_2")}
              error={errors.day_2 ? true : false}
              helperText={errors.day_2}
            />
            <TextField
              id="day_3"
              label="day_3"
              sx={{ my: 2 }}
              value={values.day_3}
              onChange={handleChange("day_3")}
              error={errors.day_3 ? true : false}
              helperText={errors.day_3}
            />
            <FormControl sx={{ my: 2 }} variant="outlined">
              <InputLabel id="user_name">User ID</InputLabel>
              <Select
                labelId="User ID"
                value={values.user_name}
                label="User ID"
                onChange={handleChange("user_name")}
                error={errors.user_name ? true : false}
              >
                {Array.isArray(user)
                  ? user.map((u, index) => (
                      <MenuItem value={u.id} key={index}>
                        {u.username}
                      </MenuItem>
                    ))
                  : "null"}
              </Select>
              {errors.review && (
                <FormHelperText error>{errors.review}</FormHelperText>
              )}
            </FormControl>

            <LoadingButton
              variant="contained"
              //color="warning"
              size="large"
              sx={{
                maxWidth: 100,
                height: 60,
                mt: "1rem",
                left: "90%",
              }}
              loading={loading}
              onClick={handleCreate}
            >
              Create
            </LoadingButton>
          </Box>
        </CardContent>
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: 2,
              mr: 4,
              my: 4,
              minWidth: 330,
            }}
          >
            {/* <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_4</InputLabel>
              <Select
                labelId="day_4"
                value={values.sub_name}
                label="day_4"
                //onChange={handleChange_4("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.sub_name && (
                <FormHelperText error>{errors.sub_name}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_5</InputLabel>
              <Select
                labelId="day_5"
                value={values.sub_name}
                label="day_5"
                //onChange={handleChange_5("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.sub_name && (
                <FormHelperText error>{errors.sub_name}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_6</InputLabel>
              <Select
                labelId="day_6"
                value={values.sub_name}
                label="day_6"
                //onChange={handleChange_6("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.sub_name && (
                <FormHelperText error>{errors.sub_name}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_7</InputLabel>
              <Select
                labelId="day_7"
                value={values.sub_name}
                label="day_7"
                // onChange={handleChange_7("sub_name")}
                error={errors.sub_name ? true : false}
              >
                {Array.isArray(sub)
                  ? sub.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.sub_type_name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {errors.sub_name && (
                <FormHelperText error>{errors.sub_name}</FormHelperText>
              )}
            </FormControl> */}
            <TextField
              id="day_4"
              label="day_4"
              sx={{ my: 2 }}
              value={values.day_4}
              onChange={handleChange("day_4")}
              error={errors.day_4 ? true : false}
              helperText={errors.day_4}
            />
            <TextField
              id="day_5"
              label="day_5"
              sx={{ my: 2 }}
              value={values.day_5}
              onChange={handleChange("day_5")}
              error={errors.day_5 ? true : false}
              helperText={errors.day_5}
            />
            <TextField
              id="day_6"
              label="day_6"
              sx={{ my: 2 }}
              value={values.day_6}
              onChange={handleChange("day_6")}
              error={errors.day_6 ? true : false}
              helperText={errors.day_6}
            />
            <TextField
              id="day_7"
              label="day_7"
              sx={{ my: 2 }}
              value={values.day_7}
              onChange={handleChange("day_7")}
              error={errors.day_7 ? true : false}
              helperText={errors.day_7}
            />
          </Box>
        </div>
      </Card>
    </div>
  );
};

export default CreateSpeExeRoutine;
