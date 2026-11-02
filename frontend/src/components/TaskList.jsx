import { useQuery } from "@apollo/client";
import { GET_ALL_TASKS } from "../graphql/queries";
import TaskItem from "./TaskItem";

function TaskList() { // загружает и показывает список задач
  const { data, loading, error, refetch } = useQuery(GET_ALL_TASKS); // запрос к API
  if (loading) { // показываем состояние загрузки
    return <p className="status">Загрузка задач...</p>;
  }
  if (error) { // ошибка запроса
    return (
      <div className="status status-error">
        <p>Не удалось загрузить задачи: {error.message}</p>
        <p>Проверьте, что Python-сервер запущен на http://localhost:8000.</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }
  if (data.allTasks.length === 0) { // список пуст
    return <p className="status">Задач пока нет. Добавьте первую.</p>;
  }
  return (
    <ul className="task-list">
      {data.allTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
export default TaskList;
