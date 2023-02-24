import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";
import Joi from "joi";

const UpDateEmployee = () => {

  const schema = Joi.object({
    address: Joi.string().min(3).required(),
    dataOfBirth: Joi.date().max('now').required(),
    emergencyContactInfo: Joi.string().length(13)
    .pattern(/^\+?[1-9]\d{11}$/)
    .message('Mobile number must be in format, e.g. +923001001000'),
    personalEmail: Joi.string().email({ tlds: { allow: false } }).required(),
    personalPhoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{11}$/)
    .message('Mobile number must be in format, e.g. +923001001000')
    
  });

  

  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    address: "",
    dataOfBirth: "",
    emergencyContactInfo: "",
    personalEmail: "",
    personalPhoneNumber: ""
  });

  const [errors, setErrors] = useState({});

  console.log(id === "new")
  useEffect(() => {
    if (id === "new") return;

    const fetcEmployee = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/employee/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetcEmployee();
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
        await axios.post("http://localhost:5000/api/employee", update)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log('Email already exist');
            window.alert('Email already exist')
            return Promise.reject(error);
          });
      } else {
        await axios.put(`http://localhost:5000/api/employee/${id}`, update);
      }
      navigate("/dashboard/employee");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container">
      <form>
        <label>Address:</label>
        <input className="update" type="text" name="address" maxLength={50} value={update.address} onChange={handleChange} />
        {errors.address && <div style={{ color: "red" }}>{errors.address}</div>}
        <label>DataOfBirth:</label>
        <input className="update" type="date" name="dataOfBirth"  value={update.dataOfBirth} onChange={handleChange} />
        {errors.dataOfBirth && <div style={{ color: "red" }}>{errors.dataOfBirth}</div>}
        <label>EmergencyContactInfo:</label>
        <input className="update" type="tel"  name="emergencyContactInfo" maxLength={13} value={update.emergencyContactInfo} onChange={handleChange} 
         />
         {errors.emergencyContactInfo && <div style={{ color: "red" }}>{errors.emergencyContactInfo}</div>}  
        <label>PersonalEmail:</label>
        <input className="update" type="email" name="personalEmail"  value={update.personalEmail} onChange={handleChange}  />
        {errors.personalEmail && <div style={{ color: "red" }}>{errors.personalEmail}</div>}
        <label>PersonalPhoneNumber:</label>
        <input className="update" type="tel" name="personalPhoneNumber" maxLength={13} value={update.personalPhoneNumber} onChange={handleChange}
        />
        {errors.personalPhoneNumber && <div style={{ color: "red" }}>{errors.personalPhoneNumber}</div>}

      </form>
      <div className="center">
      <button className="btn btn-primary" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpDateEmployee ;
