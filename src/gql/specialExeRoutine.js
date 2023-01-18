import { gql } from "@apollo/client";

//get customized exeRoutine
export const GET_ALL_SPECIAL_EXE_ROUTINE = gql`
  query MyQuery($search: String) {
    special_exercise_routine(
      where: { special_exe_routine_name: { _ilike: $search } }
    ) {
      created_at
      day_2
      day_1
      day_3
      day_4
      day_5
      day_6
      day_7
      fk_users_id
      special_exe_routine_name
      id
      updated_at
    }
  }
`;

//Delete customized exeroutine
export const DELETE_SPECIAL_EXE_ROUTINE = gql`
  mutation MyMutation($id: uuid!) {
    delete_special_exercise_routine_by_pk(id: $id) {
      id
    }
  }
`;

//Create customized exeroutine
// export const CREATE_SPECIAL_EXE_ROUTINE = gql`
//   mutation MyMutation {
//     insert_special_exercise_routine_one(
//       object: {
//         created_at: "2023-01-18T17:08:33.873483+00:00"
//         day_1: "leg"
//         day_2: "leg"
//         day_3: "leg"
//         day_4: "leg"
//         day_5: "leg"
//         day_6: "leg"
//         day_7: "leg"
//         fk_users_id: "8c57e7f5-0c03-450b-8adc-c8fe86af4b14"
//         id: "e7052eb3-3ab9-4181-ac00-84649eac14c8"
//         special_exe_routine_name: ""
//         updated_at: "2023-01-18T17:08:33.873483+00:00"
//       }
//     ) {
//       created_at
//       day_1
//       day_2
//       day_3
//       day_4
//       day_5
//       day_6
//       day_7
//       fk_users_id
//       id
//       special_exe_routine_name
//       updated_at
//     }
//   }
// `;

export const CREATE_SPECIAL_EXE_ROUTINE = gql`
  mutation MyMutation(
    $special_exe_routine_name: String!
    $day_1: String!
    $day_2: String!
    $day_3: String!
    $day_4: String!
    $day_5: String!
    $day_6: String!
    $day_7: String!
    $user_name: uuid!
  ) {
    insert_special_exercise_routine_one(
      object: {
        day_1: $day_1
        day_2: $day_2
        day_3: $day_3
        day_4: $day_4
        day_5: $day_5
        day_6: $day_6
        day_7: $day_7
        fk_users_id: $user_name
        special_exe_routine_name: $special_exe_routine_name
      }
    ) {
      created_at
      day_1
      day_2
      day_3
      day_4
      day_5
      day_6
      day_7
      fk_users_id
      id
      special_exe_routine_name
      updated_at
    }
  }
`;

//Update Special exercise routine
export const UPDATE_SPECIAL_EXE_ROUTINE = gql`
  mutation MyMutation(
    $id: uuid!
    $special_exe_routine_name: String!
    $day_1: String!
    $day_2: String!
    $day_3: String!
    $day_4: String!
    $day_5: String!
    $day_6: String!
    $day_7: String!
    $user_name: uuid!
  ) {
    update_special_exercise_routine_by_pk(
      pk_columns: { id: $id }
      _set: {
        day_1: $day_1
        day_2: $day_2
        day_3: $day_3
        day_4: $day_4
        day_5: $day_5
        day_6: $day_6
        day_7: $day_7
        fk_users_id: $user_name
        special_exe_routine_name: $special_exe_routine_name
      }
    ) {
      created_at
      day_1
      day_2
      day_3
      day_4
      day_5
      day_6
      day_7
      fk_users_id
      id
      special_exe_routine_name
      updated_at
    }
  }
`;

//get users data
export const USER_ID = gql`
  query MyQuery {
    users {
      id
      username
    }
  }
`;

// for sub_type dropdown list
export const SUB_TYPE_NAME = gql`
  query MyQuery {
    video_sub_type {
      id
      sub_type_name
    }
  }
`;
