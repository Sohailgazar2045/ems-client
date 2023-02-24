import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const EmployeeAttendance = () => {
  const userRole = localStorage.getItem("role");
  const [employeeAttendance, setemployeeAttendance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/employeeattendance")
      .then(response =>  { setemployeeAttendance(response.data) })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete&& (userRole === 'CEO' || userRole === 'HR')){
    try {
      await axios.delete(`http://localhost:5000/api/employeeattendance/${employee._id}`);
      setemployeeAttendance((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
    {userRole === 'CEO' || userRole === 'HR' || userRole === 'employee' || userRole === 'manager'?
      <button onClick={()=>navigate("/dashboard/attendance/new")} className="btn btn-primary mt-3">Add New</button>
      : null
    }
     
     <div style={{ height: "350px", overflow: "auto" }}>
      <table>
        <thead style={{position: "sticky"  , top: "0"}}>
          <tr>
            <th>Date</th>
            <th>CheckInTime</th>
            <th>CheckOutTime</th>
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
          {employeeAttendance.map(employeeAt => (
            <tr key={employeeAt._id}>
              <td>{employeeAt.date}</td>
              <td>{employeeAt.checkInTime}</td>
              <td>{employeeAt.checkOutTime}</td>
              
              {userRole === 'CEO' || userRole === 'HR' ?
                <>
              <td>
                <button onClick={() => handleDelete(employeeAt)} className="btn btn-danger">
                  Delete
                </button>
              </td>
              <td>
                <button  onClick={()=>navigate(`/dashboard/attendance/${employeeAt._id}`)} className="btn btn-warning">
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
      </div>
    </>
  );
};

export default EmployeeAttendance;

