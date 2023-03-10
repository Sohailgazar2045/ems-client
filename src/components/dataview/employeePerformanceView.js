import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./employeeDview.css";

const EmployeePerformance = () => {
  const userRole = localStorage.getItem("role");
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
    if (confirmDelete && (userRole === 'CEO' || userRole === 'HR' || userRole === 'manager')){
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
    {userRole === 'CEO' || userRole === 'HR' || userRole === 'manager'?
      <button
        onClick={() => navigate("/dashboard/performance/new")}
        className="btn btn-primary mt-3"
      >
        Add New
      </button>

: null
}
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
            {userRole === 'CEO' || userRole === 'HR' || userRole === 'manager' ?
                <>
                  <th>Delete</th>
                  <th>Update</th>
                </>
                : null
              }
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
             
              {userRole === 'CEO' || userRole === 'HR'||userRole === 'manager'?
                <>
              <td>
                {" "}
                <button
                  onClick={() => handleDelete(employeePerform)}
                  type="button"
                  className="btn btn-danger"
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
                  className="btn btn-warning"
                >
                  Update
                </button>{" "}
              </td>
               </>
                : null
              }
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default EmployeePerformance;
