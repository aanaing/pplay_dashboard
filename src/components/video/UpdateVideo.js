import React, { useEffect, useState } from "react";
import imageService from "../../services/image";
import { useMutation } from "@apollo/client";
import { GET_IMAGE_UPLOAD_URL, DELETE_IMAGE } from "../../gql/misc";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { UPDATE_VIDEOS } from "../../gql/video";

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

const UpdateVideo = ({ handleClose, videoAlert, video }) => {
  //console.log(video.video_title);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    video_title: "",
    main_type: "",
    sub_type: "",
    package_type: "",
    promotion: "",
    target_period: "",
    thumbnail_image_url: "",
  });
  const [errors, setErrors] = useState({
    video_title: "",
    main_type: "",
    sub_type: "",
    package_type: "",
    promotion: "",
    target_period: "",
    thumbnail_image_url: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);
  const [oldImageName, setOldImageName] = useState(null);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [getImageUrl] = useMutation(GET_IMAGE_UPLOAD_URL, {
    onError: (error) => {
      console.log("error : ", error);
    },
    onCompleted: (result) => {
      setImageFileUrl(result.getImageUploadUrl.imageUploadUrl);
      setIsImageChange(true);
      setValues({
        ...values,
        thumbnail_image_url: `https://axra.sgp1.digitaloceanspaces.com/VJun/${result.getImageUploadUrl.imageName}`,
      });
    },
  });

  const [deleteImage] = useMutation(DELETE_IMAGE, {
    onError: (error) => {
      console.log("error : ", error);
      setLoading(false);
    },
  });

  const [updateVideo] = useMutation(UPDATE_VIDEOS, {
    onError: (error) => {
      console.log("error : ", error);
      setLoading(false);
    },
    onCompleted: () => {
      setValues({
        video_title: "",
        main_type: "",
        sub_type: "",
        package_type: "",
        promotion: "",
        target_period: "",
        thumbnail_image_url: "",
      });
      setErrors({
        video_title: "",
        main_type: "",
        sub_type: "",
        package_type: "",
        promotion: "",
        target_period: "",
        thumbnail_image_url: "",
      });
      setImageFile("");
      setImagePreview("");
      setLoading(false);
      videoAlert("The video have been updated.");
      handleClose();
    },
  });

  useEffect(() => {
    // console.log(video);
    setValues({
      video_title: video.video_title,
      main_type: video.main_type,
      sub_type: video.sub_type,
      package_type: video.package_type,
      promotion: video.promotion,
      target_period: video.target_period,
      thumbnail_image_url: video.thumbnail_image_url,
    });
    setImagePreview(video.thumbnail_image_url);
    let image_url = video.thumbnail_image_url;
    console.log(video);
    setOldImageName();
    //image_url.substring(image_url.lastIndexOf("/") + 1, image_url.lenght);
  }, [
    video.video_title,
    video.main_type,
    video.sub_type,
    video.package_type,
    video.promotion,
    video.target_period,
    video.thumbnail_image_url,
  ]);

  const imageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (!fileTypes.includes(img.type)) {
        setErrors({
          ...errors,
          image_url: "Please select image. (png, jpeg, jpeg, gif, ...)",
        });
        return;
      }
      if (img.size > 10485760) {
        setErrors({
          ...errors,
          image_url: "Image file size must be smaller than 10MB.",
        });
        return;
      }
      setImageFile(img);
      setImagePreview(URL.createObjectURL(img));
      getImageUrl();
    }
  };
  const handleCreate = async () => {
    setLoading(true);
    setErrors({
      video_title: "",
      main_type: "",
      sub_type: "",
      package_type: "",
      promotion: "",
      target_period: "",
      thumbnail_image_url: "",
    });
    let isErrorExit = false;
    let errorObject = {};
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
    if (!values.duration) {
      errorObject.duration = "duration field is required.";
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
      return;
    }
    try {
      if (isImageChange) {
        await imageService.uploadImage(imageFileUrl, imageFile);
        deleteImage({ variables: { image_name: oldImageName } });
      }
      updateVideo({ variables: { ...values, id: ad.id } });
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
          Update Video
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
          height: 450,
          mx: 13,
          borderRadius: 0,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            my: 2,
            mx: 2,
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

        <CardContent sx={{ mx: 2, my: 2, maxWidth: 700 }}>
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
              label="thumbnail_image_url"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
              InputLabelProps={{ shrink: "shrink" }}
              sx={{ my: 2 }}
              //value={values.thumbnail_image_url}
              onChange={imageChange}
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
            >
              {/* {mainType.map((type) => (
                <MenuItem key={type.value}>{type.label}</MenuItem>
              ))} */}
            </TextField>
          </Box>

          <LoadingButton
            variant="contained"
            size="large"
            color="warning"
            sx={{ maxWidth: 100, mt: 2 }}
            loading={loading}
            onClick={handleCreate}
          >
            Update
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
              id="sub_type"
              label="Sub Type"
              sx={{ my: 2 }}
              value={values.sub_type}
              onChange={handleChange("sub_type")}
              error={errors.sub_type ? true : false}
              helperText={errors.sub_type}
            />
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
          </Box>
        </div>
      </Card>
    </div>
  );
};

export default UpdateVideo;
