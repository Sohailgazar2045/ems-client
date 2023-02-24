import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";
import Joi from "joi";

const schema = Joi.object({
  evaluationPeriod: Joi.string().required(),
  manager: Joi.string().min(3).required(),
  goals: Joi.string().min(3).required(),
  objectives: Joi.string().min(3).required(),
  jobDuties: Joi.string().min(3).required(),
  performanceRating: Joi.number().required(),
  feedback: Joi.string().min(3).required(),
});

const UpdatePerformance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    evaluationPeriod: "",
    manager: "",
    goals: "",
    objrctives: "",
    jobDuties: "",
    performanceRating: "",
    feedBack: "",
    
    
  });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (id === "new") return;

    const fetchPeformance = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/employeeperformance/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchPeformance();
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
        await axios.post("http://localhost:5000/api/employeeperformance", update);
      } else {
        await axios.put(`http://localhost:5000/api/employeeperformance/${id}`, update);
      }
      navigate("/dashboard/performance");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
        <label>EvaluationPeriod in Month:</label>
        <input className="update" type="number" name="evaluationPeriod"  value={update.evaluationPeriod} onChange={handleChange} />
        {errors.evaluationPeriod && <div style={{ color: "red" }}>{errors.evaluationPeriod}</div>}
        <label>Manager:</label>
        <input className="update" type="text" name="manager" maxLength={20}  value={update.manager} onChange={handleChange} />
        {errors.manager && <div style={{ color: "red" }}>{errors.manager}</div>}
        <label>Goals:</label>
        <input className="update" type="text" name="goals" maxLength={20} value={update.goals} onChange={handleChange} />
        {errors.goals && <div style={{ color: "red" }}>{errors.goals}</div>}
        <label>Objectives:</label>
        <input className="update" type="text" name="objrctives" maxLength={50}  value={update.objrctives} onChange={handleChange} />
        {errors.objrctives && <div style={{ color: "red" }}>{errors.objrctives}</div>}
        <label>jobDuties:</label>
        <input className="update" type="text" name="jobDuties" maxLength={20}  value={update.jobDuties} onChange={handleChange} />
        {errors.jobDuties && <div style={{ color: "red" }}>{errors.jobDuties}</div>}
        <label>PerformanceRating:</label>
        <input className="update" type="range" min="0" max="5" name="performanceRating"  value={update.performanceRating} onChange={handleChange} />
        {errors.performanceRating && <div style={{ color: "red" }}>{errors.performanceRating}</div>}
        <label>FeedBack:</label>
        <input className="update" type="text" name="feedBack" maxLength={30} value={update.feedBack} onChange={handleChange} />
        {errors.feedBack && <div style={{ color: "red" }}>{errors.feedBack}</div>}
      </form>
      <div className="center">
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpdatePerformance;
