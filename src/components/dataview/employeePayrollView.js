import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const EmployeePayroll = () => {
  const userRole = localStorage.getItem("role");
  const [employeePayroll, setEmployeePayroll] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/employeepayroll")
      .then(response =>  { setEmployeePayroll(response.data)
      })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete && (userRole === 'CEO' || userRole === 'HR')){
    try {
      await axios.delete(`http://localhost:5000/api/employeepayroll/${employee._id}`);
      setEmployeePayroll((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    
    }
  }
  };

  return (
     <>
     {userRole === 'CEO' || userRole === 'HR' ?
    <button onClick={()=>navigate("/dashboard/payRoll/new")} className="btn btn-primary mt-3">Add New</button>
    : null
  }
       <div style={{ height: "350px", overflow: "auto" }}>
          <table>
            <thead style={{position: "sticky"  , top: "0"}}>
              <tr>
                <th>payPeriod</th>
                <th>salary</th>
                <th>taxas</th>
                <th>deductions</th>
                <th>totallDeductions</th>
                <th>totalEarning</th>
                <th>netPay</th>
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
              {employeePayroll.map(employeePayroll => (
                <tr>
                  <td>{employeePayroll.payPeriod}</td>
                  <td>{employeePayroll.salary}</td>
                  <td>{employeePayroll.taxas}</td>
                  <td>{employeePayroll.deductions}</td>
                  <td>{employeePayroll.totallDeductions}</td>
                  <td>{employeePayroll.totalEarning}</td>
                  <td>{employeePayroll.netPay}</td>
                  {userRole === 'CEO' || userRole === 'HR' ?
                <>
               <td> <button onClick={() => handleDelete(employeePayroll)} className="btn btn-danger">Delete</button> </td>
               <td> <button onClick={()=>navigate(`/dashboard/payRoll/${employeePayroll._id}`)} className="btn btn-warning">Update</button> </td>
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

export default EmployeePayroll;
