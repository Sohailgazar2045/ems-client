import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./employeeDview.css";

const EmployeePerformance = () => {
  const [employeePerformance, setEmployeePerformance] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employeeperformance")
      .then((response) => {
        setEmployeePerformance(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete){
    try {
      await axios.delete(
        `http://localhost:5000/api/employeeperformance/${employee._id}`
      );
      setEmployeePerformance((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== employee._id)
      );
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
      <button
        onClick={() => navigate("/dashboard/performance/new")}
        className="button-insert mt-3"
      >
        Add New
      </button>
      <div style={{ height: "350px", overflow: "auto" }}>
      <table>
        <thead style={{position: "sticky"  , top: "0"}}>
          <tr>
            <th>EvaluationPeriod</th>
            <th>Manager</th>
            <th>Goals</th>
            <th>objrctives</th>
            <th>jobDuties</th>
            <th>performanceRating</th>
            <th>feedBack</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employeePerformance.map((employeePerform) => (
            <tr key={employeePerform._id}>
              <td>{employeePerform.evaluationPeriod}</td>
              <td>{employeePerform.manager}</td>
              <td>{employeePerform.goals}</td>
              <td>{employeePerform.objrctives}</td>
              <td>{employeePerform.jobDuties}</td>
              <td>{employeePerform.performanceRating}</td>
              <td>{employeePerform.feedBack}</td>
              <td>
                {" "}
                <button
                  onClick={() => handleDelete(employeePerform)}
                  type="button"
                  className="button-delete"
                >
                  Delete
                </button>{" "}
              </td>
              <td>
                {" "}
                <button
                  onClick={() =>
                    navigate(`/dashboard/performance/${employeePerform._id}`)
                  }
                  tyep="button"
                  className="button-update"
                >
                  Update
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default EmployeePerformance;
