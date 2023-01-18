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
import { useEffect, useState } from "react";
import { CREATE_EXE_ROUTINE, UPDATE_EXE_ROUTINE } from "../../gql/exeRoutine";

const UpdateNuRoutine = ({ handleClose, routineAlert, value }) => {
  const [values, setValues] = useState({
    nutrition_routine_name: "",
    sub_name: "",
    day_1: "",
    day_2: "",
    day_3: "",
    day_4: "",
    day_5: "",
    day_6: "",
    day_7: "",
    day_8: "",
    day_9: "",
    day_10: "",
    day_11: "",
    day_12: "",
    day_13: "",
    day_14: "",
    day_15: "",
    day_16: "",
    day_17: "",
    day_18: "",
    day_19: "",
    day_20: "",
    day_21: "",
    day_22: "",
    day_23: "",
    day_24: "",
    day_25: "",
    day_26: "",
    day_27: "",
    day_28: "",
    day_29: "",
    day_30: "",
    day_31: "",
  });
  const [errors, setErrors] = useState({
    nutrition_routine_name: "",
    sub_name: "",
    day_1: "",
    day_2: "",
    day_3: "",
    day_4: "",
    day_5: "",
    day_6: "",
    day_7: "",
    day_8: "",
    day_9: "",
    day_10: "",
    day_11: "",
    day_12: "",
    day_13: "",
    day_14: "",
    day_15: "",
    day_16: "",
    day_17: "",
    day_18: "",
    day_19: "",
    day_20: "",
    day_21: "",
    day_22: "",
    day_23: "",
    day_24: "",
    day_25: "",
    day_26: "",
    day_27: "",
    day_28: "",
    day_29: "",
    day_30: "",
    day_31: "",
  });
  const [loading, setLoading] = useState(false);
  const [sub, setSub] = useState({});
  const [updateRoutine] = useMutation(UPDATE_EXE_ROUTINE, {
    onError: (error) => {
      console.log("error:", error);
      setLoading(false);
    },
    onCompleted: (data) => {
      setValues({
        nutrition_routine_name: "",
        sub_name: "",
        day_1: "",
        day_2: "",
        day_3: "",
        day_4: "",
        day_5: "",
        day_6: "",
        day_7: "",
        day_8: "",
        day_9: "",
        day_10: "",
        day_11: "",
        day_12: "",
        day_13: "",
        day_14: "",
        day_15: "",
        day_16: "",
        day_17: "",
        day_18: "",
        day_19: "",
        day_20: "",
        day_21: "",
        day_22: "",
        day_23: "",
        day_24: "",
        day_25: "",
        day_26: "",
        day_27: "",
        day_28: "",
        day_29: "",
        day_30: "",
        day_31: "",
      });
      setErrors({
        nutrition_routine_name: "",
        sub_name: "",
        day_1: "",
        day_2: "",
        day_3: "",
        day_4: "",
        day_5: "",
        day_6: "",
        day_7: "",
        day_8: "",
        day_9: "",
        day_10: "",
        day_11: "",
        day_12: "",
        day_13: "",
        day_14: "",
        day_15: "",
        day_16: "",
        day_17: "",
        day_18: "",
        day_19: "",
        day_20: "",
        day_21: "",
        day_22: "",
        day_23: "",
        day_24: "",
        day_25: "",
        day_26: "",
        day_27: "",
        day_28: "",
        day_29: "",
        day_30: "",
        day_31: "",
      });
      setLoading(false);
      routineAlert("Routine has been updated");
      handleUpdateClose();
    },
  });

  useEffect(() => {
    setValues(value);
  }, [value]);

  //console.log(values);

  const handleUpdateClose = () => {
    setValues({});
    setErrors({
      nutrition_routine_name: "",
      sub_name: "",
      day_1: "",
      day_2: "",
      day_3: "",
      day_4: "",
      day_5: "",
      day_6: "",
      day_7: "",
      day_8: "",
      day_9: "",
      day_10: "",
      day_11: "",
      day_12: "",
      day_13: "",
      day_14: "",
      day_15: "",
      day_16: "",
      day_17: "",
      day_18: "",
      day_19: "",
      day_20: "",
      day_21: "",
      day_22: "",
      day_23: "",
      day_24: "",
      day_25: "",
      day_26: "",
      day_27: "",
      day_28: "",
      day_29: "",
      day_30: "",
      day_31: "",
    });
    handleClose();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_1 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_2 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_3 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_4 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_5 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_6 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange_7 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = () => {
    setLoading(true);
    setErrors({
      nutrition_routine_name: "",
      sub_name: "",
      day_1: "",
      day_2: "",
      day_3: "",
      day_4: "",
      day_5: "",
      day_6: "",
      day_7: "",
      day_8: "",
      day_9: "",
      day_10: "",
      day_11: "",
      day_12: "",
      day_13: "",
      day_14: "",
      day_15: "",
      day_16: "",
      day_17: "",
      day_18: "",
      day_19: "",
      day_20: "",
      day_21: "",
      day_22: "",
      day_23: "",
      day_24: "",
      day_25: "",
      day_26: "",
      day_27: "",
      day_28: "",
      day_29: "",
      day_30: "",
      day_31: "",
    });

    let isErrorExit = false;
    let errorObject = {};

    if (!values.nutrition_routine_name) {
      errorObject.nutrition_routine_name = "Routine Name is required";
      isErrorExit = true;
    }
    if (!values.day_1) {
      errorObject.day_1 = "Day 1 is required";
      isErrorExit = true;
    }
    if (!values.day_2) {
      errorObject.day_2 = "Day 2 is required";
      isErrorExit = true;
    }
    if (!values.day_3) {
      errorObject.day_3 = "Day 3 is required";
      isErrorExit = true;
    }
    if (!values.day_4) {
      errorObject.day_4 = "Day 4 is required";
      isErrorExit = true;
    }
    if (!values.day_5) {
      errorObject.day_5 = "Day 5 is required";
      isErrorExit = true;
    }
    if (!values.day_6) {
      errorObject.day_6 = "Day 6 is required";
      isErrorExit = true;
    }
    if (!values.day_7) {
      errorObject.day_7 = "Day 7 is required";
      isErrorExit = true;
    }

    if (isErrorExit) {
      setErrors(errorObject);
      setLoading(false);
      return;
    }
    try {
      console.log(values);
      updateRoutine({ variables: { ...values } });
    } catch (e) {
      console.log("error:", e.message);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
          maxWidth: "lg",
          bgcolor: "#cecece",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          py: 2,
        }}
      >
        <Typography variant="h5" component="h2" color="black" sx={{ mx: 4 }}>
          Update Routine
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
          color: "white",
          bgcolor: "white",
          maxWidth: "lg",
          borderRadius: 0,
          height: 600,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 2,
            mx: 2,
            ml: 8,
            minWidth: 330,
          }}
        >
          <TextField
            id="nutrition_routine_name"
            label="nutrition_routine_name"
            sx={{ my: 2 }}
            value={values.nutrition_routine_name}
            onChange={handleChange("exercise_routine_name")}
            error={errors.nutrition_routine_name ? true : false}
            helperText={errors.nutrition_routine_name}
          />
          <FormControl variant="outlined" sx={{ my: 2 }}>
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
            {errors.d_1 && <FormHelperText error>{errors.d_1}</FormHelperText>}
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_4</InputLabel>
            <Select
              labelId="day_4"
              value={values.sub_name}
              label="day_4"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_5</InputLabel>
            <Select
              labelId="day_5"
              value={values.sub_name}
              label="day_5"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_6</InputLabel>
            <Select
              labelId="day_6"
              value={values.sub_name}
              label="day_6"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_7</InputLabel>
            <Select
              labelId="day_7"
              value={values.sub_name}
              label="day_7"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_8</InputLabel>
            <Select
              labelId="day_8"
              value={values.sub_name}
              label="day_8"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_9</InputLabel>
            <Select
              labelId="day_9"
              value={values.sub_name}
              label="day_9"
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
          </FormControl>
        </Box>

        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: 2,
              my: 2,
              minWidth: 330,
            }}
          >
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_10</InputLabel>
              <Select
                labelId="day_10"
                value={values.sub_name}
                label="day_10"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_11</InputLabel>
              <Select
                labelId="day_11"
                value={values.sub_name}
                label="day_11"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_12</InputLabel>
              <Select
                labelId="day_12"
                value={values.sub_name}
                label="day_12"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_13</InputLabel>
              <Select
                labelId="day_13"
                value={values.sub_name}
                label="day_13"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_14</InputLabel>
              <Select
                labelId="day_14"
                value={values.sub_name}
                label="day_14"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_15</InputLabel>
              <Select
                labelId="day_15"
                value={values.sub_name}
                label="day_15"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_16</InputLabel>
              <Select
                labelId="day_16"
                value={values.sub_name}
                label="day_16"
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
            </FormControl>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel id="sub_type">day_17</InputLabel>
              <Select
                labelId="day_17"
                value={values.sub_name}
                label="day_17"
                onChange={handleChange_4("sub_name")}
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
              <InputLabel id="sub_type">day_18</InputLabel>
              <Select
                labelId="day_18"
                value={values.sub_name}
                label="day_18"
                onChange={handleChange_5("sub_name")}
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
              <InputLabel id="sub_type">day_19</InputLabel>
              <Select
                labelId="day_19"
                value={values.sub_name}
                label="day_19"
                onChange={handleChange_6("sub_name")}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 2,
            mx: 2,
            minWidth: 330,
          }}
        >
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_20</InputLabel>
            <Select
              labelId="day_20"
              value={values.sub_name}
              label="day_20"
              onChange={handleChange_7("sub_name")}
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
            <InputLabel id="sub_type">day_21</InputLabel>
            <Select
              labelId="day_21"
              value={values.sub_name}
              label="day_21"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_22</InputLabel>
            <Select
              labelId="day_22"
              value={values.sub_name}
              label="day_22"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_23</InputLabel>
            <Select
              labelId="day_23"
              value={values.sub_name}
              label="day_23"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_24</InputLabel>
            <Select
              labelId="day_24"
              value={values.sub_name}
              label="day_24"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_25</InputLabel>
            <Select
              labelId="day_25"
              value={values.sub_name}
              label="day_25"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_26</InputLabel>
            <Select
              labelId="day_26"
              value={values.sub_name}
              label="day_26"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_27</InputLabel>
            <Select
              labelId="day_27"
              value={values.sub_name}
              label="day_27"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_28</InputLabel>
            <Select
              labelId="day_28"
              value={values.sub_name}
              label="day_28"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_29</InputLabel>
            <Select
              labelId="day_29"
              value={values.sub_name}
              label="day_29"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_30</InputLabel>
            <Select
              labelId="day_30"
              value={values.sub_name}
              label="day_30"
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
          </FormControl>
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_31</InputLabel>
            <Select
              labelId="day_31"
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
          </FormControl>
        </Box>
      </Card>
      <LoadingButton
        variant="contained"
        //color="warning"
        size="large"
        sx={{ maxWidth: 100, mt: "1rem", left: "90%", height: 60 }}
        loading={loading}
        onClick={handleCreate}
      >
        Update
      </LoadingButton>
    </div>
  );
};

export default UpdateNuRoutine;
