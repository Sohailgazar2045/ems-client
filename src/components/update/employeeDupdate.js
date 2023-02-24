import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";
import Joi from "joi";


const schema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  jobTitle: Joi.string().min(3).required(),
  department: Joi.string().min(3).required(),
  contactInformation: Joi.string().length(13)
  .pattern(/^\+?[1-9]\d{11}$/)
  .message('Mobile number must be in format, e.g. +923001001000'),
  dateOfHire: Joi.date().max('now').required(),
});


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
  const [errors, setErrors] = useState({});

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
  
      try {
        await schema.validateAsync(update, { abortEarly: false });
      } catch (error) {
        const newErrors = {};
        error.details.forEach((detail) => {
          newErrors[detail.path[0]] = detail.message;
        });
        setErrors(newErrors);
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


  return (
    <div className="container">
      <form>
        <label>First Name:</label>
        <input className="update" type="text" name="firstName" maxLength={25} value={update.firstName} onChange={handleChange} />
        {errors.firstName && <div style={{ color: "red" }}>{errors.firstName}</div>}
        <label>Last Name:</label>
        <input className="update" type="text" name="lastName" maxLength={25} value={update.lastName} onChange={handleChange} />
        {errors.lastName && <div style={{ color: "red" }}>{errors.lastName}</div>}
        <label>Job Title:</label>
        <input className="update" type="text" name="jobTitle" maxLength={25} value={update.jobTitle} onChange={handleChange} />
        {errors.jobTitle && <div style={{ color: "red" }}>{errors.jobTitle}</div>}
        <label>Department:</label>
        <input className="update" type="text" name="department" maxLength={25} value={update.department} onChange={handleChange} />
        {errors.department && <div style={{ color: "red" }}>{errors.department}</div>}
        <label>Contact Information:</label>
        <input className="update" type="text" name="contactInformation" maxLength="13" value={update.contactInformation} onChange={handleChange} 
        />
      {errors.contactInformation && <div style={{ color: "red" }}>{errors.contactInformation}</div>}
        <label>Joinind Date:</label>
        <input className="update" type="date" name="dateOfHire" value={update.dateOfHire} onChange={handleChange} />
        {errors.dateOfHire && <div style={{ color: "red" }}>{errors.dateOfHire}</div>}
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
