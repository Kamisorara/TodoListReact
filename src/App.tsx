import { useEffect, useState } from "react";
import "./App.css";
import Task, { TaskProps } from "./components/Task";
import TaskFrom from "./components/TaskFrom";

interface Props {}

const App: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks: TaskProps[] = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(tasks);
  }, []);

  const addTask = (name: string) => {
    setTasks((prev) => {
      if (name === "") {
        alert("input can not be empty!!!");
        return prev;
      } else {
        return [...prev, { name: name, done: false }];
      }
    });
  };

  const updateTaskDone = (taskIndex: number, newDone: boolean) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  };

  const getMessage = (): string => {
    const percentage: number = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return "Try todo at least one!";
    } else if (percentage === 100) {
      return "Nice Job for Today!";
    }
    return "Keep it going!";
  };

  const removeTask = (taskIndexToRemove: number) => {
    setTasks((prev) => {
      return prev.filter((taskObject, index) => {
        return index !== taskIndexToRemove;
      });
    });
  };

  const renameTask = (taskIndex: number, newName: string) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].name = newName;
      return newTasks;
    });
  };

  return (
    <>
      <main>
        <h1>
          {numberComplete}/{numberTotal} Complete
        </h1>
        <h2>{getMessage()}</h2>
        <TaskFrom onAdd={addTask} />
        {tasks.map((task, key) => (
          <Task
            key={key}
            name={task.name}
            done={task.done}
            onToggle={(done) => updateTaskDone(key, done)}
            onTrash={() => removeTask(key)}
            onRename={(newName) => renameTask(key, newName)}
          />
        ))}
      </main>
    </>
  );
};

export default App;
