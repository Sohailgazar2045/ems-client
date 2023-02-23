import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpdateUserRoll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });


  useEffect(() => {
    if (id === "new") return;

    const fetchRole = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/addRole/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };



    fetchRole();
  }, [id]);

  const handleChange = (e) => {
    const updateClone = { ...update };
    updateClone[e.target.name] = e.target.value;
    setUpdate(updateClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (update.userName === "" || update.email === "" || update.password === "" || update.role === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(update.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      if (id === "new") {
        await axios.post("http://localhost:5000/api/addRole", update);
      } else {
        await axios.put(`http://localhost:5000/api/addRole/${id}`, update);
      }
      navigate("/dashboard/createRole");
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <div className="container">
      <form>
        <label>User Name:</label>
        <input className="update" type="text" name="userName" value={update.userName} minLength={3} maxLength={30} onChange={handleChange} />

        <label>Email:</label>
        <input className="update" type="email" name="email"  value={update.email} onChange={handleChange} />

        <label>Password:</label>
        <input className="update" type="pasword" name="password" minLength={8}  value={update.password} onChange={handleChange} />

        <label>role:</label>
        <select name="role" value={update.role} onChange={handleChange}>
          <option value="select">Please Selecet A Role</option>
          <option value="CEO">CEO</option>
          <option value="manager">Manager</option>
          <option value="HR">HR</option>
          <option value="employee">Employee</option>
        </select>
      </form>
      <div className="center">
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpdateUserRoll;
