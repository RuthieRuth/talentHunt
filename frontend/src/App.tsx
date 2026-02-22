import { BrowserRouter, Routes, Route } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Roles from "./components/Roles";
import Login from "./Login";
import Dashboard from "./components/JobDashboard";
import AuthCallback from "../auth/auth";
import JobDetails from "./components/JobDetails";
import { AuthProvider } from "../src/hooks/useAuth";
import AdminDashboard from "./components/AdminDashboard";
import AdminJobDetail from "./components/AdminJobDetail";
import AdminAddJob from "./components/AdminAddJob";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/admin/addJob" element={<AdminAddJob />} />
            <Route path="/job-details/:id" element={<JobDetails />} />
            <Route path="/admin/job-details/:id" element={<AdminJobDetail />} />
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Roles />
                <Contact />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;