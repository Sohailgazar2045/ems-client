import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpDateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    address: "",
    dataOfBirth: "",
    emergencyContactInfo: "",
    personalEmail: "",
    personalPhoneNumber: ""
  });

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
    
    if (!update.address || !update.dataOfBirth || !update.emergencyContactInfo || !update.personalEmail || !update.personalPhoneNumber) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(update.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      if (id === "new") {
        await axios.post("http://localhost:5000/api/employee", update);
      } else {
        await axios.put(`http://localhost:5000/api/employee/${id}`, update);
      }
      navigate("/dashboard/employee");
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
        <label>Address:</label>
        <input className="update" type="text" name="address" value={update.address} onChange={handleChange} />

        <label>DataOfBirth:</label>
        <input className="update" type="date" name="dataOfBirth"  value={update.dataOfBirth} onChange={handleChange} />

        <label>EmergencyContactInfo:</label>
        <input className="update" type="text" maxLength="11" name="emergencyContactInfo" value={update.emergencyContactInfo} onChange={handleChange} 
         onKeyDown={handleNumericInput}/>

        <label>PersonalEmail:</label>
        <input className="update" type="email" name="personalEmail"  value={update.personalEmail} onChange={handleChange}  />

        <label>PersonalPhoneNumber:</label>
        <input className="update" type="text" maxLength="11" name="personalPhoneNumber" value={update.personalPhoneNumber} onChange={handleChange}
        onKeyDown={handleNumericInput}/>

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
