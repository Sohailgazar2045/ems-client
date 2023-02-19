import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./employeeUpdate.css";

const UpdatePayRoll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    payPeriod: "",
    salary: "",
    taxas: "",
    deductions: "",
    totallDeductions: "",
    totalEarning: "",
    netPay: "",
  });


  useEffect(() => {
    if (id === "new") return;

    const fetchPayroll = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/employeepayroll/${id}`
        );
        setUpdate(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchPayroll();
  }, [id]);

  const handleChange = (e) => {
    const updateClone = { ...update };
    updateClone[e.target.name] = e.target.value;
    setUpdate(updateClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!update.payPeriod || !update.salary || !update.taxas || !update.deductions || !update.totallDeductions || !update.totalEarning || !update.netPay) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (id === "new") {
        await axios.post("http://localhost:5000/api/employeepayroll", update);
      } else {
        await axios.put(`http://localhost:5000/api/employeepayroll/${id}`, update);
      }
      navigate("/dashboard/payRoll");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form>
        <label>PayPer Months:</label>
        <input className="update" type="number" name="payPeriod" value={update.payPeriod} onChange={handleChange} />

        <label>Salary:</label>
        <input className="update" type="text" name="salary"  value={update.salary} onChange={handleChange} />

        <label>Taxas:</label>
        <input className="update" type="text" name="taxas" value={update.taxas} onChange={handleChange} />

        <label>Deductions:</label>
        <input className="update" type="text" name="deductions" value={update.deductions} onChange={handleChange} />
       
        <label>TotallDeductions:</label>
        <input className="update" type="text" name="totallDeductions" value={update.totallDeductions} onChange={handleChange} />
       
        <label>TotalEarning:</label>
        <input className="update" type="text" name="totalEarning" value={update.totalEarning} onChange={handleChange} />
        
        <label>NetPay:</label>
        <input className="update" type="text" name="netPay" value={update.netPay} onChange={handleChange} />
        
        <button className="btn btn-primary" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePayRoll;
