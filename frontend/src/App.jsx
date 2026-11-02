import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() { // главный компонент страницы
  return (
    <main className="app">
      <h1>Менеджер задач</h1> {/* заголовок */}
      <TaskForm /> {/* добавление задачи */}
      <TaskList /> {/* список задач */}
    </main>
  );
}
export default App;
