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
      special_exe_routine_name
      day_1
      day_2
      day_3
      day_4
      day_5
      day_6
      day_7
      id
      fk_users_id
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
