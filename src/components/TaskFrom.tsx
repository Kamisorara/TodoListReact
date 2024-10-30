import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

const TaskFrom: React.FC<Props> = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button>+</button>
        <input
          type="text"
          value={taskName}
          onChange={(ev) => setTaskName(ev.target.value)}
          placeholder="Your next task..."
        />
      </form>
    </>
  );
};

export default TaskFrom;
