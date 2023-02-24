import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const userRole = localStorage.getItem("role");
  const [employeeAttendance, setemployeeProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/employee")
      .then(response =>  { setemployeeProfile(response.data) })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete && (userRole === 'CEO' || userRole === 'HR')){
    try {
      await axios.delete(`http://localhost:5000/api/employee/${employee._id}`);
      setemployeeProfile((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
    {userRole === 'CEO' || userRole === 'HR' ?
      <button onClick={()=>navigate("/dashboard/employee/new")} className="btn btn-primary mt-3">Add New</button>
      : null
    }
    <table>
        <thead style={{position: "sticky"  , top: "0"}}>
          <tr>
            <th>address</th>
            <th>dataOfBirth</th>
            <th>emergencyContactInfo</th>
            <th>personalEmail</th>
            <th>personalPhoneNumber</th>
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
          {employeeAttendance.map(employee => (
            <tr key={employee._id}>
              <td>{employee.address}</td>
              <td>{employee.dataOfBirth}</td>
              <td>{employee.emergencyContactInfo}</td>
              <td>{employee.personalEmail}</td>
              <td>{employee.personalPhoneNumber}</td>
              
              {userRole === 'CEO' || userRole === 'HR' ?
                <>
              <td>
                <button onClick={() => handleDelete(employee)} className="btn btn-danger">
                  Delete
                </button>
              </td>
              <td>
                <button onClick={()=>navigate(`/dashboard/employee/${employee._id}`)} className="btn btn-warning">
                  Update
                </button>
              </td>
              </>
                : null
              }
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeProfile;

