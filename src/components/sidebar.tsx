import React, { useState } from 'react';

const Sidebar = ({ onFilterChange }: { onFilterChange: (filters: { category: string[]; salary: number }) => void }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(0);

  const jobCategories = [
    "事務", "エンジニア", "営業", "デザイン", "マーケティング", "財務・経理",
    "人事", "カスタマーサポート", "製造", "医療・介護"
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedCategories = checked ? [...categories, value] : categories.filter((category) => category !== value);

    setCategories(updatedCategories);
    onFilterChange({ category: updatedCategories, salary});
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSalary = parseInt(e.target.value, 10);
    setSalary(newSalary);
    onFilterChange({ category: categories, salary: newSalary });
  };

  return (
    <div className="bg-blue-50" style={{ width:"30%", height:"1500px"}}>
      <div className="pt-3 pl-3 ">
        <p className="text-2xl font-bold mb-5">求人カテゴリ</p>
        <div className="flex flex-col gap-2">
          {jobCategories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div  className="p-3">
        <div>
         <p className="text-2xl font-bold mb-3">年収</p>
        </div>
        <select className="appearance-none w-full rounded-none p-1 border-2" value={salary} onChange={handleSalaryChange}>
  <option value="300">300万円以上</option>
  <option value="500">500万円以上</option>
  <option value="700">700万円以上</option>
  <option value="1000">1000万円以上</option>
</select>
      </div>
    </div>
  );
};

export default Sidebar;