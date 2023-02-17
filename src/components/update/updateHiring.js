import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpDateHiring = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    jobID: "",
    jobTitle: "",
    jobDescription: "",
    applicantName: "",
    interviewDate: "",
    interviewer: "",
    interviewerFeedback: "",
    offerSalary: "",
    hireDate: ""

  });

  console.log(id === "new")
  useEffect(() => {
    if (id === "new") return;

    const fetcHiring = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api//employeeHiring/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetcHiring();
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
        await axios.post("http://localhost:5000/api//employeeHiring", update);
      } else {
        await axios.put(`http://localhost:5000/api//employeeHiring/${id}`, update);
      }
      navigate("/dashboard/hiring");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
        <label>JobID:</label>
        <input className="update" type="text" name="jobID" value={update.jobID} onChange={handleChange} />

        <label>JobTitle:</label>
        <input className="update" type="text" name="jobTitle"  value={update.jobTitle} onChange={handleChange} />

        <label>JobDescription:</label>
        <input className="update" type="text" name="jobDescription" value={update.jobDescription} onChange={handleChange} />

        <label>applicantName:</label>
        <input className="update" type="text" name="applicantName" value={update.applicantName} onChange={handleChange} />

        <label>interviewDate:</label>
        <input className="update" type="text" name="interviewDate" value={update.interviewDate} onChange={handleChange} />

        <label>interviewer:</label>
        <input className="update" type="text" name="interviewer" value={update.interviewer} onChange={handleChange} />

        <label>interviewerFeedback:</label>
        <input className="update" type="text" name="interviewerFeedback" value={update.interviewerFeedback} onChange={handleChange} />

        <label>offerSalary:</label>
        <input className="update" type="text" name="offerSalary" value={update.offerSalary} onChange={handleChange} />
        
        <label>hireDate:</label>
        <input className="update" type="text" name="hireDate" value={update.hireDate} onChange={handleChange} />

        <button className="btn btn-primary" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpDateHiring ;
