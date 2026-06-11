const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
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
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#22c55e";
      default:
        return "gray";
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{task.title}</h3>
      {task.description && <p style={{ margin: "0 0 8px 0" }}>{task.description}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
        <span
          style={{
            backgroundColor: getStatusColor(task.status),
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
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
            fontSize: "12px",
          }}
        >
          {task.priority}
        </span>
      </div>
      {task.dueDate && (
        <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button onClick={() => onToggle(task._id)}>
          {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
