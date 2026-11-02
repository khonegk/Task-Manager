import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../graphql/mutations";
import { GET_ALL_TASKS } from "../graphql/queries";

function TaskForm() { // форма создания задачи
  const [title, setTitle] = useState(""); // текст заголовка
  const [createTask, { loading, error }] = useMutation(CREATE_TASK, { // запуск мутации
    refetchQueries: [{ query: GET_ALL_TASKS }], // после успешного создания список запрашивается заново
  });

  const handleSubmit = async (e) => { // обработчик отправки формы.
    e.preventDefault(); // отменяем перезагрузку страницы
    if (!title.trim()) return; // не отправляем пустое название
    try {
      await createTask({
        variables: { title: title.trim(), description: "" },
      });
      setTitle(""); // очищаем поле после отправки
    } catch (err) {
      // ошибка выводится ниже через переменную error
    }
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название новой задачи"
        value={title /* значение поля */}
        onChange={(e) => setTitle(e.target.value) /* сохраняем ввод */}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Добавление..." : "Добавить"}
      </button>
      {error && (
        <p className="form-error">Не удалось создать задачу: {error.message}</p>
      )}
    </form>
  );
}
export default TaskForm;
