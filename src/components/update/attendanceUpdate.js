import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpdateAttendance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    date: "",
    checkInTime: "",
    checkOutTime: "",
  });


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
        <input className="update" type="text" name="date" value={update.date} onChange={handleChange} />

        <label>CheckInTime:</label>
        <input className="update" type="text" name="checkInTime"  value={update.checkInTime} onChange={handleChange} />

        <label>CheckOutTime:</label>
        <input className="update" type="text" name="checkOutTime" value={update.checkOutTime} onChange={handleChange} />

        <button type="button" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAttendance;
