import { BrowserRouter, Routes, Route } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Roles from "./components/Roles";
import Login from "./Login";
import Dashboard from "./components/Dashboard";

import AuthCallback from "../auth/auth";
import JobDetails from "./components/JobDetails";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="pt-16"> {/* easiest solution so that nav is stuck up */}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
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
    </BrowserRouter>
  );
}

export default App;
