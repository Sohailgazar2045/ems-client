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
    emergencyContactInf: "",
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

  return (
    <div className="container">
      <form>
        <label>Address:</label>
        <input className="update" type="text" name="address" value={update.address} onChange={handleChange} />

        <label>DataOfBirth:</label>
        <input className="update" type="text" name="dataOfBirth"  value={update.dataOfBirth} onChange={handleChange} />

        <label>EmergencyContactInfo:</label>
        <input className="update" type="text" name="emergencyContactInfo" value={update.emergencyContactInfo} onChange={handleChange} />

        <label>PersonalEmail:</label>
        <input className="update" type="text" name="personalEmail" value={update.personalEmail} onChange={handleChange} />

        <label>PersonalPhoneNumber:</label>
        <input className="update" type="text" name="personalPhoneNumber" value={update.personalPhoneNumber} onChange={handleChange} />


        <button className="btn btn-primary " onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpDateEmployee ;
