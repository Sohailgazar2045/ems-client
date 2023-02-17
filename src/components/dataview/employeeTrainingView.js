import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const EmployeeTraining = () => {
  const [employeeTraining, setEmployeetraining] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/employeeTraining")
      .then(response =>  { setEmployeetraining(response.data)
      })
      .catch(error => console.log(error));
  }, []);
  const handleDelete = async (employee) => {
    try {
      await axios.delete(`http://localhost:5000/api/employeeTraining/${employee._id}`);
      setEmployeetraining((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <button onClick={()=>navigate("/dashboard/training/new")} className="button-insert mt-3">Add New</button>
          <table>
            <thead>
              <tr>
                <th>TrainingProgram</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>SkillAquired</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {employeeTraining.map(employeetraining => (
                <tr key={employeetraining._id}>
                  <td>{employeetraining.trainingProgram}</td>
                  <td>{employeetraining.startDate}</td>
                  <td>{employeetraining.endDate}</td>
                  <td>{employeetraining.skillAquired}</td>
               <td> <button onClick={() => handleDelete(employeetraining)} className="button-delete">Delete</button> </td>
               <td> <button onClick={()=>navigate(`/dashboard/training/${employeetraining._id}`)} className="button-update">Update</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
  );
};

export default EmployeeTraining;
