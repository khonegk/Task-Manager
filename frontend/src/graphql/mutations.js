import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) { # создание задачи
    createTask(title: $title, description: $description) {
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
export const COMPLETE_TASK = gql`
  mutation CompleteTask($id: ID!) { # выполнение задачи
    completeTask(id: $id) {
      id
      isCompleted
    }
  }
`;
