
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import './App.css';
import ProtectedRoute from './component/ProtectedRoute';
import AdminMain from './component/AdminMain';
import AdminProtectedRoute from './component/AdminProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './component/AdminDashboard'
import TableComponent from './component/allUsers'
import CompletedTask from './component/CompletedTask'
import PendingTask from './component/PendingTask';
import LaunchPendingTask from './component/LaunchPendingTask';
import UserMain from './component/UserMain';
import UserCompletedTask from './component/UserCompletedTask'
import UserPendingTask from './component/UserPendingTask'
import UserLaunchPending from './component/UserLaunchPending';
import UserDashboard from './component/UserDashboard';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminMain /></AdminProtectedRoute>} >
          <Route index element={<AdminDashboard />} />
          <Route path="completed-tasks" element={<CompletedTask />} />
          <Route path="pending-tasks" element={<PendingTask />} />
          <Route path="launch-pending-tasks" element={<LaunchPendingTask />} />
          <Route path="all-users" element={<TableComponent />} />

        </Route>
        <Route path="/dashboard" element={<ProtectedRoute><UserMain /></ProtectedRoute>} >
          <Route index element={<UserDashboard />} />
          <Route path="user-completed-tasks" element={<UserCompletedTask />} />
          <Route path="pending-tasks" element={<UserPendingTask />} />
          <Route path="launch-pending" element={<UserLaunchPending />} />

        </Route>
      </Routes>



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>

  )
}
export default App;