import { gql } from "@apollo/client";
export const GET_ALL_TASKS = gql` # запрос всех задач
  query AllTasks {
    allTasks {
      id
      title
      description
      isCompleted
      category {
        name
        color
      }
    }
  }
`;
