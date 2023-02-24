import React, { useState, useEffect } from "react";
import axios from "axios";
import "./employeeDview.css";
import { useNavigate } from "react-router-dom";
const EmployeeDview = () => {
  const navigate = useNavigate();
  const [employeeDirectory, setEmployeeDirectory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employeeDirectory")
      .then((response) => {
        setEmployeeDirectory(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleDelete = async (employeeDirectory)=>
  // {
  //   try{
  //     setEmployeeDirectory(employeeDirectory.filter(p=p_id !==employeeDirectory._id));
  //     await axios.delete(`http://localhost:5000/api/employeeDirectory${_id}`)
  //   }
  //   catch(error)
  //   {
  //     console.log(error);
  //   }
  // };

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete`);
    if (confirmDelete){
    try {
      setEmployeeDirectory((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employee._id));
      await axios.delete(`http://localhost:5000/api/employeeDirectory/${employee._id}`);
    } catch (error) {
      console.log(error);
    }
  }
  };
  
  return (
    <>
    <div >
       <button onClick={()=>navigate("/dashboard/employeedview/new")} className="btn btn-primary mt-3">Add New</button>
      </div>
      <div style={{ height: "350px", overflow: "auto" }}>
    <table>
      <thead style={{position: "sticky"  , top: "0"}}>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>JobTitle</th>
          <th>deparment</th>
          <th>contactInformation</th>
          <th>dateOfHire</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {employeeDirectory.map((employeedir) => (
          <tr key={employeedir._id}>
            <td>{employeedir.firstName}</td>
            <td>{employeedir.lastName}</td>
            <td>{employeedir.jobTitle}</td>
            <td>{employeedir.department}</td>
            <td>{employeedir.contactInformation}</td>
            <td>{employeedir.dateOfHire}</td>
               <td> <button  onClick={() => handleDelete(employeedir)} className="btn btn-danger">Delete</button> </td>
              <td><button onClick={()=>navigate(`/dashboard/employeedview/${employeedir._id}`)} className="btn btn-warning">Update</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
};

export default EmployeeDview;
