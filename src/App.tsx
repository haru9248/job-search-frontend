import Header from './components/header'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobPost from './components/postJob'
import JobList from './components/jobList';
import Sidebar from './components/sidebar';


function App() {
  const [filters, setFilters] = useState<{ category: string[]; salary: number }>({
    category: [],
    salary: 0,
  });

  const handleFilterChange = (newFilters: { category: string[]; salary: number }) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <Header />
      <Routes>
      <Route
  path="/"
  element={
    <div className="flex">
      <Sidebar onFilterChange={handleFilterChange} />
      <JobList filters={filters} />
    </div>
  }/>
        <Route path="/job-post" element={<JobPost />}/>
      </Routes>
      </Router>
  )
}

export default App
