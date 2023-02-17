import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpdateTraining = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    trainingProgram: "",
    startDate: "",
    endDate: "",
    skillAquired:""
  });


  useEffect(() => {
    if (id === "new") return;

    const fetchTraining = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/employeeTraining/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchTraining();
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
        await axios.post("http://localhost:5000/api/employeeTraining", update);
      } else {
        await axios.put(`http://localhost:5000/api/employeeTraining/${id}`, update);
      }
      navigate("/dashboard/training");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
      <label>trainingProgram:</label>
        <input className="update" type="text" name="trainingProgram" value={update.trainingProgram} onChange={handleChange} />

        <label>startDate:</label>
        <input className="update" type="text" name="startDate" value={update.startDate} onChange={handleChange} />

        <label>endDate:</label>
        <input className="update" type="text" name="endDate"  value={update.endDate} onChange={handleChange} />

        <label>skillAquired:</label>
        <input className="update" type="text" name="skillAquired" value={update.skillAquired} onChange={handleChange} />

        <button type="button" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateTraining;
