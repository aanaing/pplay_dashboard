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
import { validateSDL } from "graphql/validation/validate";
import { useState, useEffect } from "react";
import { CREATE_EXE_ROUTINE, SUB_TYPE_NAME } from "../../gql/exeRoutine";

const CreateExeRoutine = ({ handleClose, routineAlert }) => {
  const [values, setValues] = useState({
    exercise_routine_name: "",
    sub_name: "",
    day_1: "",
    day_2: "",
    day_3: "",
    day_4: "",
    day_5: "",
    day_6: "",
    day_7: "",
  });
  const [errors, setErrors] = useState({
    exercise_routine_name: "",
    sub_name: "",
    day_1: "",
    day_2: "",
    day_3: "",
    day_4: "",
    day_5: "",
    day_6: "",
    day_7: "",
  });

  const [loading, setLoading] = useState(false);

  const [sub, setSub] = useState({});
  const [loadSub, resultSub] = useLazyQuery(SUB_TYPE_NAME);
  const [changeSubType, setChangeSubType] = useState(false);

  useEffect(() => {
    loadSub();
  }, [loadSub]);

  useEffect(() => {
    if (resultSub.data) {
      setSub(resultSub.data.video_sub_type);
    }
  }, [resultSub]);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [createRoutine] = useMutation(CREATE_EXE_ROUTINE, {
    onError: (error) => {
      console.log("error : ", error);
      setLoading(false);
      console.log("wrong");
    },
    onCompleted: () => {
      console.log("right");
      setValues({
        exercise_routine_name: "",
        sub_name: "",
        day_1: "",
        day_2: "",
        day_3: "",
        day_4: "",
        day_5: "",
        day_6: "",
        day_7: "",
      });
      setErrors({
        exercise_routine_name: "",
        sub_name: "",
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
      exercise_routine_name: "",
      sub_name: "",
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

    if (!values.exercise_routine_name) {
      errorObject.exercise_routine_name = "Routine name is required";
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
          height: 500,
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
              id="exercise_routine_name"
              label="exercise_routine_name"
              sx={{ my: 2 }}
              value={values.exercise_routine_name}
              onChange={handleChange("exercise_routine_name")}
              error={errors.exercise_routine_name ? true : false}
              helperText={errors.exercise_routine_name}
            />

            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_1</InputLabel>
              <Select
                labelId="day_1"
                value={values.sub_name}
                label="day_1"
                onChange={handleChange("sub_name")}
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
                onChange={handleChange("sub_name")}
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
                onChange={handleChange("sub_name")}
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
          </Box>
          <LoadingButton
            variant="contained"
            //color="warning"
            size="large"
            sx={{ maxWidth: 100, mt: "1rem", left: "90%", height: 60 }}
            loading={loading}
            onClick={handleCreate}
          >
            Create
          </LoadingButton>
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
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_4</InputLabel>
              <Select
                labelId="day_4"
                value={values.sub_name}
                label="day_4"
                onChange={handleChange("sub_name")}
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
                onChange={handleChange("sub_name")}
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
                onChange={handleChange("sub_name")}
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
                onChange={handleChange("sub_name")}
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
          </Box>
        </div>
      </Card>
    </div>
  );
};

export default CreateExeRoutine;