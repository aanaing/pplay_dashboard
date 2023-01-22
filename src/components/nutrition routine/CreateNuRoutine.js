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
import { UPDATE_NUROUTINE, SUB_TYPE_NAME } from "../../gql/nuRoutine";

const CreateNuRoutine = ({ handleClose, routineAlert }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

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

  const [createRoutine] = useMutation(UPDATE_NUROUTINE, {
    onError: (error) => {
      console.log("error : ", error);
      setLoading(false);
      console.log("wrong");
    },
    onCompleted: () => {
      console.log("right");
      setValues({});
      setErrors({});
      setLoading(false);
      routineAlert("New Routine has been added");
      handleClose();
    },
  });

  const handleCreate = () => {
    setLoading(true);
    setErrors({});
    let isErrorExit = false;
    let errorObject = {};

    if (!values.nutrition_routine_name) {
      errorObject.nutrition_routine_name = "Routine name is required";
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
          maxWidth: "lg",
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
            {errors.d_1 && <FormHelperText error>{errors.d_1}</FormHelperText>}
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
          <FormControl variant="outlined" sx={{ my: 2 }}>
            <InputLabel id="sub_type">day_8</InputLabel>
            <Select
              labelId="day_8"
              value={values.sub_name}
              label="day_8"
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
            <InputLabel id="sub_type">day_9</InputLabel>
            <Select
              labelId="day_9"
              value={values.sub_name}
              label="day_9"
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
              <InputLabel id="sub_type">day_11</InputLabel>
              <Select
                labelId="day_11"
                value={values.sub_name}
                label="day_11"
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
              <InputLabel id="sub_type">day_12</InputLabel>
              <Select
                labelId="day_12"
                value={values.sub_name}
                label="day_12"
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
              <InputLabel id="sub_type">day_13</InputLabel>
              <Select
                labelId="day_13"
                value={values.sub_name}
                label="day_13"
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
              <InputLabel id="sub_type">day_14</InputLabel>
              <Select
                labelId="day_14"
                value={values.sub_name}
                label="day_14"
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
              <InputLabel id="sub_type">day_15</InputLabel>
              <Select
                labelId="day_15"
                value={values.sub_name}
                label="day_15"
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
              <InputLabel id="sub_type">day_16</InputLabel>
              <Select
                labelId="day_16"
                value={values.sub_name}
                label="day_16"
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
              <InputLabel id="sub_type">day_17</InputLabel>
              <Select
                labelId="day_17"
                value={values.sub_name}
                label="day_17"
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
              <InputLabel id="sub_type">day_18</InputLabel>
              <Select
                labelId="day_18"
                value={values.sub_name}
                label="day_18"
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
              <InputLabel id="sub_type">day_19</InputLabel>
              <Select
                labelId="day_19"
                value={values.sub_name}
                label="day_19"
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
            <InputLabel id="sub_type">day_21</InputLabel>
            <Select
              labelId="day_21"
              value={values.sub_name}
              label="day_21"
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
            <InputLabel id="sub_type">day_22</InputLabel>
            <Select
              labelId="day_22"
              value={values.sub_name}
              label="day_22"
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
            <InputLabel id="sub_type">day_23</InputLabel>
            <Select
              labelId="day_23"
              value={values.sub_name}
              label="day_23"
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
            <InputLabel id="sub_type">day_24</InputLabel>
            <Select
              labelId="day_24"
              value={values.sub_name}
              label="day_24"
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
            <InputLabel id="sub_type">day_25</InputLabel>
            <Select
              labelId="day_25"
              value={values.sub_name}
              label="day_25"
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
            <InputLabel id="sub_type">day_26</InputLabel>
            <Select
              labelId="day_26"
              value={values.sub_name}
              label="day_26"
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
            <InputLabel id="sub_type">day_27</InputLabel>
            <Select
              labelId="day_27"
              value={values.sub_name}
              label="day_27"
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
            <InputLabel id="sub_type">day_28</InputLabel>
            <Select
              labelId="day_28"
              value={values.sub_name}
              label="day_28"
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
            <InputLabel id="sub_type">day_29</InputLabel>
            <Select
              labelId="day_29"
              value={values.sub_name}
              label="day_29"
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
            <InputLabel id="sub_type">day_30</InputLabel>
            <Select
              labelId="day_30"
              value={values.sub_name}
              label="day_30"
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
            <InputLabel id="sub_type">day_31</InputLabel>
            <Select
              labelId="day_31"
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

export default CreateNuRoutine;
