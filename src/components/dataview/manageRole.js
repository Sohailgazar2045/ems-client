import React, { useState, useEffect } from "react";
import axios from "axios";
import './employeeDview.css';
import { useNavigate } from "react-router-dom";

const RoleView = () => {
  const [userRole, setuserRole] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/addRole")
      .then(response =>  { setuserRole(response.data)
      })
      .catch(error => console.log(error));
  }, []);
  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete){
    try {
      await axios.delete(`http://localhost:5000/api/addRole/${employee._id}`);
      setuserRole((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
    <button onClick={()=>navigate("/dashboard/createRole/new")} className="btn btn-primary mt-3">Add New</button>
         
         <div style={{ height: "350px", overflow: "auto" }}>
          <table>
            <thead style={{position: "sticky"  , top: "0"}}>
              <tr>
                <th>userName</th>
                <th>email</th>
                <th>role</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {userRole.map(userRole => (
                <tr key={userRole._id}>
                  <td>{userRole.userName}</td>
                  <td>{userRole.email}</td>
                  <td>{userRole.role}</td>
               <td> <button onClick={() => handleDelete(userRole)} className="btn btn-danger">Delete</button> </td>
               <td> <button onClick={()=>navigate(`/dashboard/createRole/${userRole._id}`)} className="btn btn-warning">Update</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </>
  );
};

export default RoleView;
