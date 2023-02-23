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
  const calculateFields = () => {
    const salary = parseFloat(update.salary);
    const taxas = salary * 0.1;
    const deductions = salary * 0.05;
    const totallDeductions = taxas + deductions;
    const totalEarning = salary - totallDeductions;
    const netPay = totalEarning / parseFloat(update.payPeriod);

    setUpdate((prevState) => ({
      ...prevState,
      taxas: taxas.toFixed(2),
      deductions: deductions.toFixed(2),
      totallDeductions: totallDeductions.toFixed(2),
      totalEarning: totalEarning.toFixed(2),
      netPay: netPay.toFixed(2)
    }));
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
        <label>PayPeriod Months:</label>
        <input className="update" type="number" name="payPeriod" value={update.payPeriod} onChange={handleChange} onBlur={calculateFields} />

        <label>Salary:</label>
        <input className="update" type="text" name="salary"  value={update.salary} onChange={handleChange} onBlur={calculateFields} />

        <label>Taxas:</label>
        <input className="update" type="text" name="taxas" value={update.taxas} onChange={handleChange} onBlur={calculateFields} disabled />

        <label>Deductions:</label>
        <input className="update" type="text" name="deductions" value={update.deductions} onChange={handleChange} onBlur={calculateFields}  disabled/>
       
        <label>TotallDeductions:</label>
        <input className="update" type="text" name="totallDeductions" value={update.totallDeductions} onChange={handleChange} onBlur={calculateFields} disabled/>
       
        <label>TotalEarning:</label>
        <input className="update" type="text" name="totalEarning" value={update.totalEarning} onChange={handleChange} onBlur={calculateFields} disabled />
        
        <label>NetPay:</label>
        <input className="update" type="text" name="netPay" value={update.netPay} onChange={handleChange} onBlur={calculateFields} disabled />
        
      </form>
      <div className="center">
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          {id === "new" ? "Add New" : "Update"}
        </button>
        </div>
    </div>
  );
};

export default UpdatePayRoll;
