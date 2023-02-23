import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpDateDirectory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    contactInformation: "",
    dateOfHire: "",
  });

  console.log(id === "new")
  useEffect(() => {
    if (id === "new") return;

    const fetchDirectory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/employeeDirectory/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchDirectory();
  }, [id]);

  const handleChange = (e) => {
    const updateClone = { ...update };
    updateClone[e.target.name] = e.target.value;
    setUpdate(updateClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!update.firstName || !update.lastName || !update.jobTitle || !update.department || !update.contactInformation || !update.dateOfHire) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (id === "new") {
        await axios.post("http://localhost:5000/api/employeeDirectory", update);
      } else {
        await axios.put(`http://localhost:5000/api/employeeDirectory/${id}`, update);
      }
      navigate("/dashboard/employeedview");
    } catch (error) {
      console.log(error);
    }
  };
  const handleNumericInput = (ev) => {
    const allowedKeys = ['Backspace', 'Delete', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (!allowedKeys.includes(ev.key)) {
      ev.preventDefault();
    }
  }

  return (
    <div className="container">
      <form>
        <label>First Name:</label>
        <input className="update" type="text" name="firstName" value={update.firstName} onChange={handleChange} />

        <label>Last Name:</label>
        <input className="update" type="text" name="lastName"  value={update.lastName} onChange={handleChange} />

        <label>Job Title:</label>
        <input className="update" type="text" name="jobTitle" value={update.jobTitle} onChange={handleChange} />

        <label>Department:</label>
        <input className="update" type="text" name="department" value={update.department} onChange={handleChange} />

        <label>Contact Information:</label>
        <input className="update" type="text" name="contactInformation" maxLength="11" value={update.contactInformation} onChange={handleChange} 
        onKeyDown={handleNumericInput}/>

        <label>Joinind Date:</label>
        <input className="update" type="date" name="dateOfHire" value={update.dateOfHire} onChange={handleChange} />

      </form>
      <div className="center">
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpDateDirectory;
