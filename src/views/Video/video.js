import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Breadcrumbs,
  Paper,
  Box,
  Card,
  CardMedia,
  CardActions,
  Typography,
  CardContent,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SINGLE_VIDEO } from "../../gql/video";
const Video = () => {
  const { id } = useParams();
  const result = useQuery(SINGLE_VIDEO, { variables: { id: id } });
  //console.log(result);
  if (result.loading) {
    return (
      <div>
        <em>Loading.....</em>
      </div>
    );
  }
  let video = result.data.video_package_by_pk.videos[0].video_url;
  console.log(video);
  return (
    <div>
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
            <Link to="/video" className="user">
              Video
            </Link>
            <span>{id}</span>
          </Breadcrumbs>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexFlow: "wrap row",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            minHeight: "25vh",
          },
        }}
      >
        {Array.isArray(video)
          ? video.map((row, index) => {
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="video"
                  height="140"
                  image={row.video_url}
                  alt="video"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {row.duration}
                  </Typography>
                </CardContent>
              </Card>;
            })
          : null}
      </Box>
    </div>
  );
};
export default Video;
