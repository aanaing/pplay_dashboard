import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import imageService from "../../services/image";
import { GET_IMAGE_UPLOAD_URL } from "../../gql/misc";
import { Box } from "@mui/system";
import { CREATE_VIDEOS } from "../../gql/video";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  FormControl,
  Menu,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { valueFromAST } from "graphql";

const CreateVideo = ({ handleClose, videoAlert }) => {
  const fileTypes = ["video/webm", "video/mkv", "video/mp4"];
  const thumbnailfileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
  ];

  const mainType = [
    { value: 1, label: "HOME" },
    { value: 2, label: "GYM" },
    { value: 3, label: "ZUMBA" },
  ];

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    main_type: "",
    package_type: "",
    sub_type: "",
    target_period: "",
    thumbnail_image_url: "",
    video_title: "",
  });
  const [errors, setErrors] = useState({
    main_type: "",
    package_type: "",
    sub_type: "",
    target_period: "",
    thumbnail_image_url: "",
    video_title: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [getImageUrl] = useMutation(GET_IMAGE_UPLOAD_URL, {
    onError: (error) => {
      console.log("error : ", error);
    },
    onCompleted: (result) => {
      setImageFileUrl(result.getImageUploadUrl.imageUploadUrl);
      setValues({
        ...values,
        //video_url: `https://axra.sgp1.digitaloceanspaces.com/VJun/${result.getImageUploadUrl.imageName}`,
        thumbnail_image_url: `https://axra.sgp1.digitaloceanspaces.com/VJun/${result.getImageUploadUrl.imageName}`,
      });
    },
  });

  const [createVideo] = useMutation(CREATE_VIDEOS, {
    onError: (error) => {
      console.log("error : ", error);
      setLoading(false);
    },
    onCompleted: () => {
      setValues({
        main_type: "",
        package_type: "",
        sub_type: "",
        target_period: "",
        thumbnail_image_url: "",
        video_title: "",
      });
      setErrors({
        main_type: "",
        package_type: "",
        sub_type: "",
        target_period: "",
        thumbnail_image_url: "",
        video_title: "",
      });
      setImageFile("");
      setImagePreview("");
      setLoading(false);
      videoAlert("New Video have been created.");
      handleClose();
    },
  });

  // const videoChange = async (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     let video = e.target.files[0];
  //     if (!fileTypes.includes(video.type)) {
  //       setErrors({
  //         ...errors,
  //         thumbnail_image_url: "Please select image. (jpg,png,...)",
  //       });
  //       return;
  //     }
  //     if (video.size > 10485760) {
  //       setErrors({
  //         ...errors,
  //         thumbnail_image_url: "Image file size must be smaller than 10MB.",
  //       });
  //       return;
  //     }
  //     setImageFile(video);
  //     setImagePreview(URL.createObjectURL(video));
  //     getImageUrl();
  //   }
  // };

  const thumbnailImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let thumbImg = e.target.files[0];

      if (!thumbnailfileTypes.includes(thumbImg.type)) {
        setErrors({
          ...errors,
          thumbnail_image_url:
            "Please select images. (PNG, JPG, JPEG, GIF, ...)",
        });
        return;
      }
      if (thumbImg.size > 10485760) {
        setErrors({
          ...errors,
          thumbnail_image_url: "Video file size must be smaller than 10MB.",
        });
        return;
      }
      setImageFile(thumbImg);

      setImagePreview(URL.createObjectURL(thumbImg));
      getImageUrl();
    }
  };

  const handleCreate = async () => {
    console.log("hay");
    setLoading(true);
    setErrors({
      main_type: "",
      package_type: "",
      sub_type: "",
      target_period: "",
      thumbnail_image_url: "",
      video_title: "",
    });
    let isErrorExit = false;
    let errorObject = {};

    // if (!values.video_url || !imageFile) {
    //   errorObject.video_url = "Video field is required.";
    //   isErrorExit = true;
    // }
    if (!values.video_title) {
      errorObject.video_title = "Video Title field is required.";
      isErrorExit = true;
    }
    if (!values.main_type) {
      errorObject.main_type = "Main Type field is required.";
      isErrorExit = true;
    }
    if (!values.sub_type) {
      errorObject.sub_type = "Sub Type field is required.";
      isErrorExit = true;
    }
    if (!values.package_type) {
      errorObject.package_type = "package_type field is required.";
      isErrorExit = true;
    }

    if (!values.target_period) {
      errorObject.target_period = "target_period field is required.";
      isErrorExit = true;
    }

    if (!values.thumbnail_image_url || !imageFile) {
      errorObject.thumbnail_image_url = "Video Image field is required.";
      isErrorExit = true;
    }
    if (isErrorExit) {
      setErrors({ ...errorObject });
      setLoading(false);
      console.log(errorObject);
      return;
    }
    try {
      await imageService.uploadImage(imageFileUrl, imageFile);
      createVideo({ variables: { ...values } });
      console.log(values);
    } catch (error) {
      console.log("error : ", error);
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
          mx: 13,
        }}
      >
        <Typography variant="h5" component="h2" color="black" sx={{ mx: 4 }}>
          Create Video
        </Typography>
        <Button
          onClick={handleClose}
          variant="contained"
          color="warning"
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
          mx: 13,
          borderRadius: 0,
          height: 450,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            my: 2,
            mx: 3,
            ml: 5,
          }}
        >
          <CardMedia
            component="img"
            image={imagePreview}
            alt="Video"
            sx={{
              flex: 1,
              bgcolor: "#cecece",
              maxHeight: 200,
              objectFit: "contain",
              width: 200,
              mt: 4,
              boxShadow: 10,
              borderRadius: 2,
              border: 1,
            }}
          />
          {/* <Typography variant="span" component="div" sx={{ color: "black" }}>
            1024 * 1024 recommended
          </Typography> */}
        </Box>

        <CardContent sx={{ mx: 2, my: 2, maxWidth: 500 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* <TextField
              id="video_url"
              label="Upload Video"
              type="file"
              InputLabelProps={{ shrink: "shrink" }}
              sx={{ my: 2 }}
              onChange={videoChange}
              error={errors.video_url ? true : false}
              helperText={errors.video_url}
              accept="video/webm, video/mkv, video/mp4"
            /> */}
            <TextField
              id="thumbnail_image_url"
              label="image_url"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
              InputLabelProps={{ shrink: "shrink" }}
              sx={{ my: 2 }}
              //value={values.thumbnail_image_url}
              onChange={thumbnailImageChange}
              error={errors.thumbnail_image_url ? true : false}
              helperText={errors.thumbnail_image_url}
            />
            <TextField
              id="video_title"
              label="Video Title"
              sx={{ my: 2 }}
              value={values.video_title}
              onChange={handleChange("video_title")}
              error={errors.video_title ? true : false}
              helperText={errors.video_title}
            />
            <TextField
              id="main_type"
              label="Main Type"
              //select
              sx={{ my: 2 }}
              value={values.main_type}
              onChange={handleChange("main_type")}
              error={errors.main_type ? true : false}
              helperText={errors.main_type}
            ></TextField>
            {/* <FormControl sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Main Type
              </InputLabel>
              <Select
                //sx={style}
                sx={{
                  width: 350,
                  color: "black",
                }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Main Type"
                //value={subType}
                //onChange={(e) => setSubType(e.target.value)}
                //helperText="Please select your subscription"
              >
                <MenuItem value="">HOME</MenuItem>
                <MenuItem value="">GYM</MenuItem>
                <MenuItem value="">ZUMBA</MenuItem>
              </Select>
            </FormControl> */}
          </Box>

          <LoadingButton
            variant="contained"
            color="warning"
            size="large"
            sx={{ maxWidth: 100, mt: "1rem" }}
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
              my: 4,
              minWidth: 350,
            }}
          >
            <TextField
              id="package_type"
              label="package_type"
              sx={{ my: 2 }}
              value={values.package_type}
              onChange={handleChange("package_type")}
              error={errors.package_type ? true : false}
              helperText={errors.package_type}
            />
            <TextField
              id="target_period"
              label="target_period"
              sx={{ my: 2 }}
              value={values.target_period}
              onChange={handleChange("target_period")}
              error={errors.target_period ? true : false}
              helperText={errors.target_period}
            />
            <TextField
              id="sub_type"
              label="Sub Type"
              sx={{ my: 2 }}
              value={values.sub_type}
              onChange={handleChange("sub_type")}
              error={errors.sub_type ? true : false}
              helperText={errors.sub_type}
            />
          </Box>
        </div>
      </Card>
    </div>
  );
};
export default CreateVideo;
