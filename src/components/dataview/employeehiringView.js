import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import {useNavigate} from "react-router-dom";

const EmployeeHiringView = () => {
  const [employeeHiring, setEmployeeHiring] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api//employeeHiring")
      .then(response =>  { setEmployeeHiring(response.data)
      })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete){
    try {
      await axios.delete(`http://localhost:5000/api//employeeHiring/${employee._id}`);
      setEmployeeHiring((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    }
  }
  };
  return (
    <>
    <button onClick={()=>navigate("/dashboard/hiring/new")} className="button-insert mt-3">Add New</button>
          <table>
            <thead>
              <tr>
                <th>JobID</th>
                <th>JobTitle</th>
                <th>JobDescription</th>
                <th>ApplicantName</th>
                <th>InterviewDate</th>
                <th>Interviewer</th>
                <th>InterviewerFeedback</th>
                <th>OfferSalary</th>
                <th>HireDate</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {employeeHiring.map(employeehire => (
                <tr key={employeehire._id}>
                  <td>{employeehire.jobID}</td>
                  <td>{employeehire.jobTitle}</td>
                  <td>{employeehire.jobDescription}</td>
                  <td>{employeehire.applicantName}</td>
                  <td>{employeehire.interviewDate}</td>
                  <td>{employeehire.interviewer}</td>
                  <td>{employeehire.interviewerFeedback}</td>
                  <td>{employeehire.offerSalary}</td>
                  <td>{employeehire.hireDate}</td>
                  
              <td>
                <button  onClick={() => handleDelete(employeehire)} className="button-delete">Delete</button>
                </td>
                <td>
                <button onClick={()=>navigate(`/dashboard/hiring/${employeehire._id}`)} className="button-update">Update</button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
  );
};

export default EmployeeHiringView;
