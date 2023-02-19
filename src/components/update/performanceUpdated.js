import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

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

    
  if (!update.evaluationPeriod || !update.manager || !update.goals || !update.objrctives || !update.jobDuties || !update.performanceRating || !update.feedBack) {
    alert("Please fill in all fields.");
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
        <input className="update" type="number" name="evaluationPeriod" value={update.evaluationPeriod} onChange={handleChange} />

        <label>Manager:</label>
        <input className="update" type="text" name="manager"  value={update.manager} onChange={handleChange} />
     
        <label>Goals:</label>
        <input className="update" type="text" name="goals"  value={update.goals} onChange={handleChange} />

        <label>Objectives:</label>
        <input className="update" type="text" name="objrctives"  value={update.objrctives} onChange={handleChange} />
       
        <label>jobDuties:</label>
        <input className="update" type="text" name="jobDuties"  value={update.jobDuties} onChange={handleChange} />

        <label>PerformanceRating:</label>
        <input className="update" type="range" min="0" max="5" name="performanceRating"  value={update.performanceRating} onChange={handleChange} />

        <label>FeedBack:</label>
        <input className="update" type="text" name="feedBack" value={update.feedBack} onChange={handleChange} />

        <button className="btn btn-primary"onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePerformance;
