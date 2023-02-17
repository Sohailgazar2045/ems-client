import './App.css';
import Login from "./components/login"
import Dashboard from './components/Dashboard';
import EmployeeDview from './components/dataview/employeeDview';
import UpDateDirectory from '../src/components/update/employeeDupdate';
import UpDateEmployee from './components/update/employeeProOpe';
import EmployeeProview from './components/dataview/employeeProview';
import EmployeeAttendance from './components/dataview/employeeAttendanceView';
import UpdateAttendance from './components/update/attendanceUpdate';
import EmployeePayroll  from './components/dataview/employeePayrollView';
import UpdatePayRoll from './components/update/payRollUpdate';
import EmployeePerformance from './components/dataview/employeePerformanceView';
import UpdatePerformance from './components/update/performanceUpdated';
import EmployeeTraining from './components/dataview/employeeTrainingView';
import UpdateTraining from './components/update/updateTraining';
import EmployeeHiringView from './components/dataview/employeehiringView';
import UpDateHiring from './components/update/updateHiring';
import { Routes , Route } from 'react-router-dom';
function App() {
  return (
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/employeedview' element={<EmployeeDview/>}/>
      <Route path='/dashboard/employeedview/:id' element={<UpDateDirectory/>}/>

      <Route path='/dashboard/employee' element={<EmployeeProview/>}/>
      <Route path='/dashboard/employee/:id' element={<UpDateEmployee/>}/>

      <Route path='/dashboard/attendance' element={<EmployeeAttendance/>}/>
      <Route path='/dashboard/attendance/:id' element={<UpdateAttendance/>}/>

      <Route path='/dashboard/payRoll' element={<EmployeePayroll/>}/>
      <Route path='/dashboard/payRoll/:id' element={<UpdatePayRoll/>}/>

      <Route path='/dashboard/performance' element={<EmployeePerformance/>}/>
      <Route path='/dashboard/performance/:id' element={<UpdatePerformance/>}/>

      <Route path='/dashboard/training' element={<EmployeeTraining/>}/>
      <Route path='/dashboard/training/:id' element={<UpdateTraining/>}/>

      <Route path='/dashboard/hiring' element={<EmployeeHiringView/>}/>
      <Route path='/dashboard/hiring/:id' element={<UpDateHiring/>}/>

      </Routes>
  );
}

export default App;
