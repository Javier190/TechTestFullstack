import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8080/main/tasks")
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/main/task/delete/${id}`)
            .then(response => {
                console.log("Metodo Delete del Front");
                console.log("MOtro testst");
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            title: event.target.title.value,
            description: event.target.description.value,
            completed: false
        };
        axios.post("http://localhost:8080/main/task", newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                event.target.reset();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleUpdate = (task) => {
        axios.put(`http://localhost:8080/main/task/update/${task.id}`, task)
            .then(response => {
                console.log("MOtro tesasdasdastst");
                setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
  <h2 className="title-task-list">Task List</h2>
  <ul className="list-style" style={{ listStyleType: 'none'}}>
    {tasks.map(task => (
      <li key={task.id} style={{ marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>{task.title} - {task.description} - {task.completed ? "Completed" : "Not Completed"}</span>
          <button
            onClick={() => handleDelete(task.id)}
            style={{ marginLeft: '0.5rem' }}
          >
            Delete
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdate({ ...task, title: event.target.title.value, description: event.target.description.value });
          }}
          style={{ marginTop: '0.5rem' }}
        >
          <input type="text" name="title" defaultValue={task.title} style={{ marginRight: '0.5rem' }} />
          <input type="text" name="description" defaultValue={task.description} style={{ marginRight: '0.5rem' }} />
          <button type="submit">Update</button>
        </form>
      </li>
    ))}
  </ul>
  <h2 className="space-between-list-input">Add Task</h2>
  <form style={{ display:"flex", flexDirection: "column" }} onSubmit={handleSubmit}>
    <label style={{ marginRight: '0.5rem' }}>
      Title:
      <input type="text" name="title" style={{ marginLeft: '3.65rem' }} />
    </label>
    <br />
    <label style={{ marginRight: '0.5rem' }}>
      Description:
      <input type="text" name="description" style={{ marginLeft: '0.5rem' }} />
    </label>
    <br />
    <button style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "2rem", padding: "1rem", fontSize: "1rem" }} type="submit">Add</button>
  </form>
</div>

    );
}

export default TaskList;
