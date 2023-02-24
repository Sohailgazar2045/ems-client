import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const EmployeeTraining = () => {
  const userRole = localStorage.getItem("role");
  const [employeeTraining, setEmployeetraining] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/employeeTraining")
      .then(response =>  { setEmployeetraining(response.data)
      })
      .catch(error => console.log(error));
  }, []);
  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete){
    try {
      await axios.delete(`http://localhost:5000/api/employeeTraining/${employee._id}`);
      setEmployeetraining((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
    {userRole === 'CEO' || userRole === 'HR' ?
    <button onClick={()=>navigate("/dashboard/training/new")} className="btn btn-primary mt-3">Add New</button>
    : null
  }
        <div style={{ height: "350px", overflow: "auto" }}>
          <table>
            <thead style={{position: "sticky"  , top: "0"}}>
              <tr>
                <th>TrainingProgram</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>SkillAquired</th>
                {userRole === 'CEO' || userRole === 'HR' ?
                <>
                  <th>Delete</th>
                  <th>Update</th>
                </>
                : null
              }
              </tr>
            </thead>
            <tbody>
              {employeeTraining.map(employeetraining => (
                <tr key={employeetraining._id}>
                  <td>{employeetraining.trainingProgram}</td>
                  <td>{employeetraining.startDate}</td>
                  <td>{employeetraining.endDate}</td>
                  <td>{employeetraining.skillAquired}</td>
               <td> <button onClick={() => handleDelete(employeetraining)} className="btn btn-danger">Delete</button> </td>
               <td> <button onClick={()=>navigate(`/dashboard/training/${employeetraining._id}`)} className="btn btn-warning">Update</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </>
  );
};

export default EmployeeTraining;
