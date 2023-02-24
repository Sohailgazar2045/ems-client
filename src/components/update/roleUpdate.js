import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import "./employeeUpdate.css";

const schema = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("CEO", "manager", "HR", "employee").required(),
});

const UpdateUserRoll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

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
        await axios.post("http://localhost:5000/api/addRole", update)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log('Email already exist');
            window.alert('Email already exist')
            return Promise.reject(error);
          });
      } else {
        await axios.put(`http://localhost:5000/api/addRole/${id}`, update);
      }
      navigate("/dashboard/createRole");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <form autocomplete="off">
        <label>User Name:</label>
        <input
          className="update"
          type="text"
          name="userName"
          maxLength={25}
          value={update.userName}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.userName && <div style={{ color: "red" }}>{errors.userName}</div>}

        <label>Email:</label>
        <input
          className="update"
          type="email"
          name="email"
          value={update.email}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

        <label>Password:</label>
        <input
          className="update"
          type="password"
          name="password"
          value={update.password}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}

        <label>Role:</label>
        <select name="role" value={update.role} onChange={handleChange}>
          <option value="">Please Select A Role</option>
          <option value="CEO">CEO</option>
          <option value="manager">Manager</option>
          <option value="HR">HR</option>
          <option value="employee">Employee</option>
        </select>
        {errors.role && <div style={{ color: "red" }}>{errors.role}</div>}
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

