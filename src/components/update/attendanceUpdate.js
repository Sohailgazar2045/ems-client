import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";
import Joi from "joi";

const schema = Joi.object({
  date: Joi.date().iso().required(),
  checkInTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  checkOutTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
});

const UpdateAttendance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    date: new Date().toISOString().substring(0, 10),
    checkInTime: "",
    checkOutTime: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id === "new") return;

    const fetchAttendance = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/employeeattendance/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchAttendance();
  }, [id]);

  const handleChange = (e) => {
    const updateClone = { ...update };
    updateClone[e.target.name] = e.target.value;
    setUpdate(updateClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!update.date || !update.checkInTime || !update.checkOutTime) {
    //   alert("Please fill in all fields.");
    //   return;
    // }
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
        await axios.post("http://localhost:5000/api/employeeattendance", update);
      } else {
        await axios.put(`http://localhost:5000/api/employeeattendance/${id}`, update);
      }
      navigate("/dashboard/attendance");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
        <label>Date:</label>
        <input className="update" type="date" name="date" value={update.date} onChange={handleChange} />
        {errors.date && <div style={{ color: "red" }}>{errors.date}</div>}
        <label>CheckInTime:</label>
        <input className="update" type="time" name="checkInTime"  value={update.checkInTime} onChange={handleChange} />
        {errors.checkInTime && <div style={{ color: "red" }}>{errors.checkInTime}</div>}
        <label>CheckOutTime:</label>
        <input className="update" type="time" name="checkOutTime" value={update.checkOutTime} onChange={handleChange} />
        {errors.checkOutTime && <div style={{ color: "red" }}>{errors.checkOutTime}</div>}
      </form>
      <div className="center">
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpdateAttendance;
