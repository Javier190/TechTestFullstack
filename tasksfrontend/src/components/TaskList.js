import React, { useState, useEffect } from "react";
import axios from "axios";

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
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.description} - {task.completed ? "Completed" : "Not Completed"}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            handleUpdate({ ...task, title: event.target.title.value, description: event.target.description.value });
                        }}>
                            <input type="text" name="title" defaultValue={task.title} />
                            <input type="text" name="description" defaultValue={task.description} />
                            <button>Update</button>
                        </form>
                    </li>
                ))}
            </ul>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name="description" />
                </label>
                <br />
                <button>Add</button>
            </form>
        </div>
    );
}

export default TaskList;
