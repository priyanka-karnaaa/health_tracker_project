"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HealthTracker() {
    const [form, setForm] = useState({
        weight: "",
        exercise: "",
        sleep: "",
        water: "",
        heartRate: "",
        bloodPressure: "",
        bloodSugar: "",
        caloriesBurned: "",
    });
    const [logs, setLogs] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Check if all fields are filled
        for (let key in form) {
            if (form[key] === "") {
                setError("All fields must be filled.");
                return;
            }
        }

        setError(""); // Clear any previous error message

        const newLog = {
            ...form,
            date: new Date().toISOString().split("T")[0],
        };

        if (editIndex !== null) {
            const updatedLogs = logs.map((log, index) =>
                index === editIndex ? newLog : log
            );
            setLogs(updatedLogs);
            setEditIndex(null);
        } else {
            setLogs([...logs, newLog]);
        }

        setForm({
            weight: "",
            exercise: "",
            sleep: "",
            water: "",
            heartRate: "",
            bloodPressure: "",
            bloodSugar: "",
            caloriesBurned: "",
        });
    };

    const handleEdit = (index) => {
        setForm(logs[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedLogs = logs.filter((_, i) => i !== index);
        setLogs(updatedLogs);
    };

    // const handleDeleteAll = () => {
    //     setLogs([]);
    // };

    useEffect(() => {
        const savedLogs = JSON.parse(localStorage.getItem("logs") || "[]");
        setLogs(savedLogs);
    }, []);

    useEffect(() => {
        localStorage.setItem("logs", JSON.stringify(logs));
    }, [logs]);

    return (
        <div className="container mt-4">
            <h1>Health Tracker</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Weight</label>
                        <input
                            type="number"
                            name="weight"
                            className="form-control"
                            value={form.weight}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Exercise Duration (minutes)</label>
                        <input
                            type="number"
                            name="exercise"
                            className="form-control"
                            value={form.exercise}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Sleep (hours)</label>
                        <input
                            type="number"
                            name="sleep"
                            className="form-control"
                            value={form.sleep}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Water Intake (liters)</label>
                        <input
                            type="number"
                            name="water"
                            className="form-control"
                            value={form.water}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Heart Rate (bpm)</label>
                        <input
                            type="number"
                            name="heartRate"
                            className="form-control"
                            value={form.heartRate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Blood Pressure (mmHg)</label>
                        <input
                            type="text"
                            name="bloodPressure"
                            className="form-control"
                            value={form.bloodPressure}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Blood Sugar Levels (mg/dL)</label>
                        <input
                            type="number"
                            name="bloodSugar"
                            className="form-control"
                            value={form.bloodSugar}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label">Calories Burned</label>
                        <input
                            type="number"
                            name="caloriesBurned"
                            className="form-control"
                            value={form.caloriesBurned}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                    {editIndex !== null ? "Update" : "Submit"}
                </button>
            </form>
            <h2 className="mt-4">Monitor Progress</h2>
            {logs.length > 0 ? (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Weight</th>
                                <th>Exercise Duration</th>
                                <th>Sleep</th>
                                <th>Water Intake</th>
                                <th>Heart Rate</th>
                                <th>Blood Pressure</th>
                                <th>Blood Sugar Levels</th>
                                <th>Calories Burned</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>{entry.weight}</td>
                                    <td>{entry.exercise}</td>
                                    <td>{entry.sleep}</td>
                                    <td>{entry.water}</td>
                                    <td>{entry.heartRate}</td>
                                    <td>{entry.bloodPressure}</td>
                                    <td>{entry.bloodSugar}</td>
                                    <td>{entry.caloriesBurned}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No logs to display</p>
            )}
        </div>
    );
}