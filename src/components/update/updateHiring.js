import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";
import Joi from "joi";



const schema = Joi.object({
  jobID: Joi.string().required(),
  jobTitle: Joi.string().min(3).required(),
  jobDescription: Joi.string().min(3).required(),
  applicantName: Joi.string().min(3).required(),
  interviewDate: Joi.date().iso().required(),
  interviewer: Joi.string().min(3).required(),
  interviewerFeedback: Joi.string().min(3).required(),
  offerSalary: Joi.number().min(0).required(),
  hireDate: Joi.date().iso().required(),
}); 

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
  const [errors, setErrors] = useState({});

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
        await axios.post("http://localhost:5000/api//employeeHiring", update)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log('job ID already exist');
            window.alert('job ID already exist')
            return Promise.reject(error);
          });
      }  else {
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
        <label>Job ID:</label>
        <input className="update" type="text" name="jobID" value={update.jobID} onChange={handleChange} />
        {errors.jobID && <div style={{ color: "red" }}>{errors.jobID}</div>}
        <label>Job Title:</label>
        <input className="update" type="text" name="jobTitle" maxLength={25}  value={update.jobTitle} onChange={handleChange} />
        {errors.jobTitle && <div style={{ color: "red" }}>{errors.jobTitle}</div>}
        <label>Job Description:</label>
        <input className="update" type="text" name="jobDescription" maxLength={30}  value={update.jobDescription} onChange={handleChange} />
        {errors.jobDescription && <div style={{ color: "red" }}>{errors.jobDescription}</div>}
        <label>ApplicantName:</label>
        <input className="update" type="text" name="applicantName" maxLength={25}  value={update.applicantName} onChange={handleChange} />
        {errors.applicantName && <div style={{ color: "red" }}>{errors.applicantName}</div>}
        <label>InterviewDate:</label>
        <input className="update" type="date" name="interviewDate" value={update.interviewDate} onChange={handleChange} />
        {errors.interviewDate && <div style={{ color: "red" }}>{errors.interviewDate}</div>}
        <label>Interviewer:</label>
        <input className="update" type="text" name="interviewer" maxLength={25}  value={update.interviewer} onChange={handleChange} />
        {errors.interviewer && <div style={{ color: "red" }}>{errors.interviewer}</div>}
        <label>interviewer Feedback:</label>
        <input className="update" type="text" name="interviewerFeedback"  maxLength={30} value={update.interviewerFeedback} onChange={handleChange} />
        {errors.interviewerFeedback && <div style={{ color: "red" }}>{errors.interviewerFeedback}</div>}
        <label>Offer Salary:</label>
        <input className="update" type="text" name="offerSalary" value={update.offerSalary} onChange={handleChange} />
        {errors.offerSalary && <div style={{ color: "red" }}>{errors.offerSalary}</div>}
        <label>Join Date:</label>
        <input className="update" type="date" name="hireDate" value={update.hireDate} onChange={handleChange} />
        {errors.hireDate && <div style={{ color: "red" }}>{errors.hireDate}</div>}
      </form>
      <div className="center">
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpDateHiring ;
