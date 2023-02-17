import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const EmployeeAttendance = () => {
  const [employeeAttendance, setemployeeAttendance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/employeeattendance")
      .then(response =>  { setemployeeAttendance(response.data) })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete){
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
      <button onClick={()=>navigate("/dashboard/attendance/new")} className="button-insert mt-3">Add new</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>CheckInTime</th>
            <th>CheckOutTime</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employeeAttendance.map(employeeAt => (
            <tr key={employeeAt._id}>
              <td>{employeeAt.date}</td>
              <td>{employeeAt.checkInTime}</td>
              <td>{employeeAt.checkOutTime}</td>
              <td>
                <button onClick={() => handleDelete(employeeAt)} className="button-delete">
                  Delete
                </button>
              </td>
              <td>
                <button onClick={()=>navigate(`/dashboard/attendance/${employeeAt._id}`)} className="button-update">
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeAttendance;

