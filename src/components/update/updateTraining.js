import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";
import Joi from "joi";

const schema = Joi.object({
  trainingProgram: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  skillAquired: Joi.string().min(3).required(),
});

const UpdateTraining = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    trainingProgram: "",
    startDate: "",
    endDate: "",
    skillAquired:""
  });
  const [errors, setErrors] = useState({});

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

    // if (!update.trainingProgram || !update.startDate || !update.endDate || !update.skillAquired) {
    //   alert("Please fill in all fields.");
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
        <input className="update" type="text" name="trainingProgram" maxLength={20} value={update.trainingProgram} onChange={handleChange} />
        {errors.trainingProgram && <div style={{ color: "red" }}>{errors.trainingProgram}</div>}
        <label>startDate:</label>
        <input className="update" type="date" name="startDate" value={update.startDate} onChange={handleChange} />
        {errors.startDate && <div style={{ color: "red" }}>{errors.startDate}</div>}
        <label>endDate:</label>
        <input className="update" type="date" name="endDate"  value={update.endDate} onChange={handleChange} />
        {errors.endDate && <div style={{ color: "red" }}>{errors.endDate}</div>}
        <label>skillAquired:</label>
        <input className="update" type="text" name="skillAquired" maxLength={20} value={update.skillAquired} onChange={handleChange} />
        {errors.skillAquired && <div style={{ color: "red" }}>{errors.skillAquired}</div>}
      </form>

      <div className="center">
      <button className="btn btn-primary" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpdateTraining;
