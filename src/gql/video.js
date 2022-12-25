import { gql } from "@apollo/client";

//get all videos
export const ALL_VIDEOS = gql`
  query MyQuery($search: String!) {
    video_package(where: { video_title: { _ilike: $search } }) {
      created_at
      id
      main_type
      package_type
      promotion
      sub_type
      target_period
      thumbnail_image_url
      updated_at
      video_title
    }
  }
`;

// export const INSERT_VIDEO = gql`
//   mutation MyMutation(
//     $video_url: String!
//     $video_title: String!
//     $sub_type: String!
//     $main_type: String!
//     $package_type: String!
//     $duration: String!
//     $thumbnail_image_url: String!
//     $target_period: String!
//   ) {
//     insert_video_list(
//       objects: {
//         video_url: $video_url
//         video_title: $video_title
//         sub_type: $sub_type
//         main_type: $main_type
//         package_type: $package_type
//         duration: $duration
//         thumbnail_image_url: $thumbnail_image_url
//         target_period: $target_period
//       }
//     ) {
//       affected_rows
//       returning {
//         id
//       }
//     }
//   }
// `;

//Create Video

// export const CREATE_VIDEOS = gql`
// mutation MyMutation(
//   $main_type: String!
//   $package_type:String!
//   $sub_-type:String!
//   $target_period:String!
//   $thumbnail_image_url: String!
//   $video_title: String!
// ) {
//   insert_video_package_one(
//     object: {
//       main_type: $main_type
//       package_type: $package_type
//       sub_type: $sub_type
//       target_period: $target_period
//       thumbnail_image_url: $thumbnail_image_url
//       video_title: $video_title
//     }
//   ) {
//     created_at
//     id
//     main_type
//     package_type
//     promotion
//     sub_type
//     target_period
//     thumbnail_image_url
//     updated_at
//     video_title
//   }
// }
// `;

export const CREATE_VIDEOS = gql`
  mutation MyMutation(
    $video_title: String!
    $main_type: String!
    $sub_type: String!
    $package_type: String!
    $target_period: String!
    $thumbnail_image_url: String!
  ) {
    insert_video_package_one(
      object: {
        main_type: $main_type
        package_type: $package_type
        sub_type: $sub_type
        target_period: $target_period
        thumbnail_image_url: $target_period
        video_title: $video_title
      }
    ) {
      video_title
      updated_at
      thumbnail_image_url
      target_period
      sub_type
      promotion
      package_type
      main_type
      id
      created_at
    }
  }
`;
export const SINGLE_VIDEO = gql`
  query MyQuery($id: uuid!) {
    video_package_by_pk(id: $id) {
      created_at
      main_type
      id
      package_type
      promotion
      sub_type
      target_period
      thumbnail_image_url
      updated_at
      video_title
      videos {
        duration
        video_url
      }
    }
  }
`;

// export const INSERT_VIDEO_MAIN_TYPE = gql`
// `

//update video
// export const UPDATE_VIDEO_PK = gql`
//       mutation MyMutation($id: uuid!, $video_title: String!, $video_url: String!, $main_type: String!, $duration: String!, $package_type: String!, $sub_type: String!, $target_period: String!, $thumbnail_image_url: String! ) {
//             update_video_list_by_pk(
//                   pk_columns: { id: $id }
//                   _set: {duration: $duration, main_type: $main_type, package_type: $package_type, sub_type: $sub_type, target_period: $target_period, thumbnail_image_url: $thumbnail_image_url, video_title: $video_title, video_url: $video_url}
//             ) {
//                   created_at
//                   duration
//                   id
//                   main_type
//                   package_type
//                   promotion
//                   promotions
//                   sub_type
//                   target_period
//                   thumbnail_image_url
//                   updated_at
//                   video_title
//                   video_url
//             }
//       }
// `;

export const UPDATE_VIDEOS = gql`
  mutation MyMutation(
    $id: uuid!
    $video_title: String!
    $main_type: String!
    $package_type: String!
    $sub_type: String!
    $target_period: String!
    $thumbnail_image_url: String!
  ) {
    update_video_package_by_pk(
      pk_columns: { id: $id }
      _set: {
        main_type: $main_type
        package_type: $package_type
        sub_type: $sub_type
        target_period: $target_period
        thumbnail_image_url: $thumbnail_image_url
        video_title: $video_title
      }
    ) {
      created_at
      id
      main_type
      package_type
      sub_type
      target_period
      thumbnail_image_url
      updated_at
      video_title
    }
  }
`;

//Delete Video
export const DELETE_VIDEOS = gql`
  mutation MyMutation($id: uuid!) {
    delete_video_package_by_pk(id: $id) {
      main_type
      package_type
      sub_type
      target_period
      thumbnail_image_url
      video_title
      id
    }
  }
`;

export const GET_IMAGE_UPLOAD_URL = gql`
  mutation GET_IMAGE_UPLOAD_URL {
    getImageUploadUrl {
      error
      imageName
      imageUploadUrl
      message
    }
  }
`;

export const VIDEO_CATEGORY = gql`
  query VIDEO_CATEGORY($main: String, $sub: String) {
    video_package(
      where: { _and: { main_type: { _eq: $main }, sub_type: { _eq: $sub } } }
    ) {
      id
      main_type
      package_type
      promotion
      sub_type
      target_period
      thumbnail_image_url
      video_title
    }
  }
`;

export const ALL_VIDEO_CATEGORY = gql`
  query ALL_VIDEO_CATEGORY($main: String!) {
    video_package(where: { _and: { main_type: { _eq: $main } } }) {
      id
      main_type
      package_type
      promotion
      thumbnail_image_url
      video_title
      sub_type
      target_period
    }
  }
`;
