import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 


const PostJob = () => {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const jobCategories = [
    { id: 1, name: "事務"},
    { id: 2, name: "エンジニア"},
    { id: 3, name: "営業"},
    { id: 4, name: "デザイン"},
    { id: 5, name: "マーケティング"},
    { id: 6, name: "財務・経理"},
    { id: 7, name: "人事"},
    { id: 8, name: "カスタマーサポート"},
    { id: 9, name: "製造"},
    { id: 10, name: "医療・介護"},
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = { title, salary, category };

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then((data) => {console.log("Job posted:", data);
      navigate('/');
  })
      .catch((error) => console.error("Error posting job:", error));
  };

  return (
    <form className="p-4 w-full" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-5">求人投稿</h2>
      <div className="mb-3">
        <div>
        <p className="mb-3">求人カテゴリを選択</p>
        </div>
        <select
          className="block w-1/3 p-1 border-2 border-gray-30 appearance-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            カテゴリを選択 ▼
          </option>
          {jobCategories.map((job) => (
            <option key={job.id} value={job.name}>
              {job.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <p className="mb-3">年収(万円)</p>
        <input
          className="border-2 w-1/3 p-1"
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </div>
      <div>
        <p className="mt-3 mb-3">求人タイトル</p>
        <input
          className="border-2 w-3/4 p-1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <button className="mt-10 bg-blue-400 text-white p-2 w-1/3 rounded-md" type="submit">投稿</button>
    </form>
  );
};

export default PostJob;