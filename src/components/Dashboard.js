import "./Dashbaord.css";
import React from "react";
// import UpdateForm from "./update/employeeDupdate.js";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import EmployeeDview from "./dataview/employeeDview.js";
import EmployeeProview from "./dataview/employeeProview.js";
import EmployeeAttendance from "./dataview/employeeAttendanceView.js";
import EmployeePayroll from "./dataview/employeePayrollView.js";
import EmployeePerformance from "./dataview/employeePerformanceView.js";
import EmployeeTraining from "./dataview/employeeTrainingView.js";
import EmployeeHiringView from "./dataview/employeehiringView";

const Dashboard = () => {
  const [showEmployeeDirectory, setShowEmployeeDirectory] = useState(false);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [showAttendanceManagement, setShowAttendanceManagement] =
    useState(false);
  const [showPayrollManagement, setSetPayrollManagement] = useState(false);
  const [showPerformance, setPerformance] = useState(false);
  const [showTraining, setTraining] = useState(false);
  const [showHiring, sethiring] = useState(false);

  const handleEmployeeDirectoryClick = () => {
    setShowEmployeeDirectory(true);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
  };

  const handleEmployeeProfileClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(true);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
  };

  const handleAttendanceManagementClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(true);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
  };
  const handlePayrollManagementClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(true);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
  };
  const handlePerformanceManagementClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(true);
    setTraining(false);
    sethiring(false);
  };
  const handleemployeeTrainingClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(true);
    sethiring(false);
  };
  const handleEmployeeHiringClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(true);
  };
  return (
    <div className="container-fluid">
      <div className="row" >
        {/* <!-- Sidebar navigation --> */}
        <div className="col-md-2  custom-bg">
          <h2 className="heading mt-2 text-white">Dashboard</h2>
          <br></br>
          <div className="sidebar-search">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <div className="sidebar mt-4">
            <nav className="nav flex-column">
              <button
                onClick={handleEmployeeDirectoryClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Employee Directory
              </button>
              <button
                onClick={handleEmployeeProfileClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Employee Profile
              </button>
              <button
                onClick={handleAttendanceManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Attendance Management
              </button>
              <button
                onClick={handlePayrollManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Payroll Management
              </button>
              <button
                onClick={handlePerformanceManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Performance Management
              </button>
              <button
                onClick={handleemployeeTrainingClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Training and Development
              </button>
              <button
                onClick={handleEmployeeHiringClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Recuitment & Hiring
              </button>
              <a
                className="nav-link black-text btn btn-outline-light mt-5"
                href="/"
              >
                Logout
              </a>
            </nav>
          </div>
        </div>

        <div className="col-md-10">
          <div className="main-bar">
            <div class="row button-container d-flex">
              <button class="btn col-1 btn-primary btn-sm mt-3">
                Create Role
              </button>
              <h1 className="heading col-10 text-center">
                Employee Management System
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="card custom-card box-1 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Box 4</h5>
                  <p className="card-text text-white">Content goes here</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card custom-card box-2 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Box 4</h5>
                  <p className="card-text text-white">Content goes here</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card custom-card box-3 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Box 4</h5>
                  <p className="card-text text-white">Content goes here</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card custom-card box-4 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Box 4</h5>
                  <p className="card-text text-white">Content goes here</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Routes>
                  <Route
                    path="/employee-directory"
                    element={<EmployeeDview />}
                  />
                </Routes>
                {showEmployeeDirectory ? (
                  <div>
                    <EmployeeDview />
                  </div>
                ) : (
                  <div></div>
                )}
                <Routes>
                  <Route
                    path="/employee-profile"
                    element={<EmployeeProview />}
                  />
                </Routes>
                {showEmployeeProfile ? (
                  <div>
                    <EmployeeProview />
                  </div>
                ) : (
                  <div></div>
                )}
                <Routes>
                  <Route
                    path="/employee-attendance"
                    element={<EmployeeAttendance />}
                  />
                </Routes>
                {showAttendanceManagement ? (
                  <div>
                    <EmployeeAttendance />
                  </div>
                ) : (
                  <div></div>
                )}
                <Routes>
                  <Route
                    path="/employee-Payroll"
                    element={<EmployeePayroll />}
                  />
                </Routes>
                {showPayrollManagement ? (
                  <div>
                    <EmployeePayroll />
                  </div>
                ) : (
                  <div></div>
                )}
                <Routes>
                  <Route
                    path="/employee-Performance"
                    element={<showPerformance />}
                  />
                </Routes>
                {showPerformance ? (
                  <div>
                    <EmployeePerformance />
                  </div>
                ) : (
                  <div></div>
                )}
                <Routes>
                  <Route
                    path="/employee-Training"
                    element={<EmployeeTraining />}
                  />
                </Routes>
                {showTraining ? (
                  <div>
                    <EmployeeTraining />
                  </div>
                ) : (
                  <div></div>
                )}

                <Routes>
                  <Route
                    path="/employee-Training"
                    element={<EmployeeHiringView />}
                  />
                </Routes>
                {showHiring ? (
                  <div>
                    <EmployeeHiringView />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
