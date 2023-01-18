import { gql } from "@apollo/client";

// get nuRoutine data
export const GET_ALL_NUROUTINES = gql`
  query GET_ALL_NUROUTINE($search: String!) {
    nutrition_routine_plan(
      where: { nutrition_routine_name: { _ilike: $search } }
    ) {
      created_at
      day_1
      day_10
      day_11
      day_12
      day_13
      day_15
      day_14
      day_16
      day_17
      day_18
      day_19
      day_2
      day_20
      day_21
      day_22
      day_23
      day_24
      day_25
      day_26
      day_27
      day_28
      day_29
      day_3
      day_30
      day_31
      day_4
      day_5
      day_6
      day_7
      day_8
      day_9
      fk_video_sub_type_id
      id
      nutrition_routine_name
      updated_at
    }
  }
`;

//delete nutrion routine
export const DELETE_NUROUTINE = gql`
  mutation DELETE_NUROUTINE($id: uuid!) {
    delete_nutrition_routine_plan_by_pk(id: $id) {
      id
    }
  }
`;

//Create nu routine
export const CREATE_NUROUTINE = gql`
  mutation MyMutation(
    $nutrition_routine_name: String!
    $day_1: String!
    $day_2: String!
    $day_3: String!
    $day_4: String!
    $day_5: String!
    $day_6: String!
    $day_7: String!
    $day_8: String!
    $day_9: String!
    $day_10: String!
    $day_11: String!
    $day_12: String!
    $day_13: String!
    $day_14: String!
    $day_15: String!
    $day_16: String!
    $day_17: String!
    $day_18: String!
    $day_19: String!
    $day_20: String!
    $day_21: String!
    $day_22: String!
    $day_23: String!
    $day_24: String!
    $day_25: String!
    $day_26: String!
    $day_27: String!
    $day_28: String!
    $day_29: String!
    $day_30: String!
    $day_31: String!
    $sub_name: String!
  ) {
    insert_nutrition_routine_plan_one(
      object: {
        day_1: $day_1
        day_2: $day_2
        day_3: $day_3
        day_4: $day_4
        day_5: $day_5
        day_6: $day_6
        day_7: $day_7
        day_8: $day_8
        day_9: $day_9
        day_10: $day_10
        day_11: $day_11
        day_12: $day_12
        day_13: $day_13
        day_14: $day_14
        day_15: $day_15
        day_16: $day_16
        day_17: $day_17
        day_18: $day_18
        day_19: $day_19
        day_20: $day_20
        day_21: $day_21
        day_22: $day_22
        day_23: $day_23
        day_24: $day_24
        day_25: $day_25
        day_26: $day_26
        day_27: $day_27
        day_28: $day_28
        day_29: $day_29
        day_30: $day_30
        day_31: $day_31
        nutrition_routine_name: $nutrition_routine_name
        fk_video_sub_type_id: $sub_name
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
      day_8
      day_9
      day_10
      day_11
      day_12
      day_13
      day_14
      day_15
      day_16
      day_17
      day_18
      day_19
      day_20
      day_21
      day_22
      day_23
      day_24
      day_25
      day_26
      day_27
      day_28
      day_29
      day_30
      day_31
      nutrition_routine_name
      fk_video_sub_type_id
      id
      updated_at
    }
  }
`;

//update nu routine
export const UPDATE_NUROUTINE = gql`
  mutation UPDATE_NUROUTIEN_BY_PK(
    $id: uuid!
    $nutrition_routine_name: String!
    $day_1: String!
    $day_2: String!
    $day_3: String!
    $day_4: String!
    $day_5: String!
    $day_6: String!
    $day_7: String!
    $day_8: String!
    $day_9: String!
    $day_10: String!
    $day_11: String!
    $day_12: String!
    $day_13: String!
    $day_14: String!
    $day_15: String!
    $day_16: String!
    $day_17: String!
    $day_18: String!
    $day_19: String!
    $day_20: String!
    $day_21: String!
    $day_22: String!
    $day_23: String!
    $day_24: String!
    $day_25: String!
    $day_26: String!
    $day_27: String!
    $day_28: String!
    $day_29: String!
    $day_30: String!
    $day_31: String!
    $sub_name: String!
  ) {
    update_nutrition_routine_plan_by_pk(
      pk_columns: { id: $id }
      _set: {
        day_1: $day_1
        day_2: $day_2
        day_3: $day_3
        day_4: $day_4
        day_5: $day_5
        day_6: $day_6
        day_7: $day_7
        day_8: $day_8
        day_9: $day_9
        day_10: $day_10
        day_11: $day_11
        day_12: $day_12
        day_13: $day_13
        day_14: $day_14
        day_15: $day_15
        day_16: $day_16
        day_17: $day_17
        day_18: $day_18
        day_19: $day_19
        day_20: $day_20
        day_21: $day_21
        day_22: $day_22
        day_23: $day_23
        day_24: $day_24
        day_25: $day_25
        day_26: $day_26
        day_27: $day_27
        day_28: $day_28
        day_29: $day_29
        day_30: $day_30
        day_31: $day_31
        nutrition_routine_name: $nutrition_routine_name
        fk_video_sub_type_id: $sub_name
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
      day_8
      day_9
      day_10
      day_11
      day_12
      day_13
      day_14
      day_15
      day_16
      day_17
      day_18
      day_19
      day_20
      day_21
      day_22
      day_23
      day_24
      day_25
      day_26
      day_27
      day_28
      day_29
      day_30
      day_31
      nutrition_routine_name
      fk_video_sub_type_id
      id
      updated_at
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
