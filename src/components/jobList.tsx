import { useEffect, useState } from 'react';

interface Job {
  id: number;
  title: string;
  salary: number;
  category: string;
}

const JobList = ({ filters }: { filters: { category: string[]; salary: number } }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 10;

  useEffect(() => {
    fetch("https://job-search-2-d504b1a6097d.herokuapp.com")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetching jobs:", data);
        setJobs(data);
    })
      .catch((error) => console.error("Error fetching jobs", error));
  }, []);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        const matchesCategory = filters.category.length === 0 || filters.category.includes(job.category);
        const matchesSalary = job.salary >= filters.salary;
        return matchesCategory && matchesSalary;
      })
    );
    setCurrentPage(1);
  }, [filters, jobs]);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="p-3 w-full">
      <h1 className="text-2xl font-bold">求人一覧</h1>
      <p className="mb-3">該当件数: {filteredJobs.length}件</p>
      <div>
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div className="border-2 mb-3 w-full pl-2 pt-1 rounded-md" key={job.id}>
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>カテゴリ: {job.category}</p>
              <p className="mb-10">年収: {job.salary}万円</p>
            </div>
          ))
        ) : (
          <p>条件に合った求人はありません。</p>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          {"◀︎"}
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button
        onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          {"▶︎"}
        </button>
      </div>
    </div>
  );
};

export default JobList;