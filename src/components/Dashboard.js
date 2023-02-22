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
import EmployeeHiringView from "./dataview/employeehiringView.js";
import RoleView from "./dataview/manageRole.js";
import DateTime from "./timeDate";
import DateToday from "./dateToday";

const Dashboard = () => {
  const userRole = localStorage.getItem("role");
  const [showEmployeeDirectory, setShowEmployeeDirectory] = useState(false);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [showAttendanceManagement, setShowAttendanceManagement] = useState(false);
  const [showPayrollManagement, setSetPayrollManagement] = useState(false);
  const [showPerformance, setPerformance] = useState(false);
  const [showTraining, setTraining] = useState(false);
  const [showHiring, sethiring] = useState(false);
  const [showRole, setshowRole] = useState(false);


  
  const handleEmployeeDirectoryClick = () => {
    setShowEmployeeDirectory(true);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
    setshowRole(false)
  };

  const handleEmployeeProfileClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(true);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
    setshowRole(false)
  };

  const handleAttendanceManagementClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(true);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
    setshowRole(false)
  };
  const handlePayrollManagementClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(true);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
    setshowRole(false)
  };
  const handlePerformanceManagementClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(true);
    setTraining(false);
    sethiring(false);
    setshowRole(false)
  };
  const handleemployeeTrainingClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(true);
    sethiring(false);
    setshowRole(false)
  };
  const handleEmployeeHiringClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(true);
    setshowRole(false)
  };
  const handleUserRoleClick = () => {
    setShowEmployeeDirectory(false);
    setShowEmployeeProfile(false);
    setShowAttendanceManagement(false);
    setSetPayrollManagement(false);
    setPerformance(false);
    setTraining(false);
    sethiring(false);
    setshowRole(true)
  };

  return (
    <div className="container-fluid">
      <div className="row" >
        {/* <!-- Sidebar navigation --> */}
        <div className=" col-md-2  custom-bg">
          <h2 className="heading mt-2 text-white">Dashboard</h2>
          <br></br>
          <div className="sidebar-search">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <div className="sidebar mt-4">
            <nav className="nav flex-column">
              
            {userRole  === 'CEO' && (
                 <>

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
                Attendance
              </button>

         
              <button
                onClick={handlePayrollManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Payroll
              </button>
              <button
                onClick={handlePerformanceManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Performance
              </button>
              <button
                onClick={handleemployeeTrainingClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Training 
              </button>
              <button
                onClick={handleEmployeeHiringClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Hiring
              </button>
             

              <button onClick={handleUserRoleClick}  className="nav-link black-text btn btn-outline-light mt-2">
                Roles
              </button>
                   </>
        )}

{userRole  === 'HR' && (
                 <>

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
                Attendance
              </button>

         
              <button
                onClick={handlePayrollManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Payroll
              </button>
              <button
                onClick={handlePerformanceManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Performance
              </button>
              <button
                onClick={handleemployeeTrainingClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Training 
              </button>
              <button
                onClick={handleEmployeeHiringClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Hiring
              </button>
             
                   </>
        )}

{userRole  === 'manager' && (
                 <>

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
                Attendance
              </button>
              <button
                onClick={handlePerformanceManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Performance
              </button>
               </>
        )}

{userRole  === 'employee' && (
                 <>

              
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
                Attendance
              </button>

         
              <button
                onClick={handlePayrollManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Payroll
              </button>
              <button
                onClick={handlePerformanceManagementClick}
                className="nav-link black-text btn btn-outline-light mt-2"
              >
                Performance
              </button>
             
                   </>
        )}

              <a
                className="nav-link black-text btn btn-outline-light mt-4"
                href="/"
                style={{ position: "absolute", bottom: 0 }}
              >
                Logout
              </a>
              
            </nav>
          </div>
        </div>
        

        <div className="col-md-10">
          <div className="main-bar">
            <div class="row button-container d-flex">
              
              <h1 className="heading col-10 text-center">
                Employee Management System
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="card custom-card box-1 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Welcome</h5>
                  <p className="card-text text-white">{userRole}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card custom-card box-2 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Time</h5>
                  <p className="card-text text-white"><DateTime></DateTime></p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card custom-card box-3 mt-3">
                <div className="card-body">
                  <h5 className="card-title text-white">Date</h5>
                  <p className="card-text text-white"><DateToday></DateToday></p>
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
                    path="/employee-hiring"
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

                <Routes>
                  <Route
                    path="/employee-createRole"
                    element={<RoleView />}
                  />
                </Routes>
                {showRole ? (
                  <div>
                    <RoleView />
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
