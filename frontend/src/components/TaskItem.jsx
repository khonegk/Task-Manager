import { useMutation } from "@apollo/client";
import { COMPLETE_TASK } from "../graphql/mutations";

function TaskItem({ task }) { // отображает одну задачу
  const [completeTask, { loading, error }] = useMutation(COMPLETE_TASK); // мутация выполнения
  const handleComplete = () => { // отправляем ID задачи
    completeTask({ variables: { id: task.id } }).catch(() => {
      // ошибка выводится ниже через переменную error
    });
  };
  return (
    <li className={task.isCompleted ? "task task-done" : "task"}>
      <div className="task-info">
        <h3>{task.title}</h3> {/* название */}
        {task.description && <p>{task.description}</p>}
        <span className={`badge badge-${task.category.color}`}>
          {task.category.name}
        </span>
        {error && <p className="form-error">Не удалось отметить задачу.</p>}
      </div>
      {task.isCompleted ? (
        <span className="done-label">Выполнено</span>
      ) : (
        <button onClick={handleComplete} disabled={loading}>
          {loading ? "Сохранение..." : "Выполнить"}
        </button>
      )}
    </li>
  );
}
export default TaskItem;
