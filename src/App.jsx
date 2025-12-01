import "./App.css";
import Home from "./pages/Home";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>To-do</h1>
        <Home />
      </div>
    </TaskProvider>
  );
}

export default App;
