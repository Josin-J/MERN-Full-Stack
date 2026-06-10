const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <span
        style={{
          backgroundColor: getStatusColor(task.status),
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {task.status}
      </span>
      <span
        style={{
          backgroundColor: getPriorityColor(task.priority),
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          marginLeft: "8px",
        }}
      >
        {task.priority}
      </span>
      {task.dueDate && (
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
