// src/components/ProjectTemplate.jsx
import React, { useState } from "react";
import projectData from "../../assets/output.json";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const TemplatesContent = () => {
  const data = projectData[0].RevitData;
  const sheets = data.Sheets;

  // Config phân trang
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sheets.length / itemsPerPage);
  const currentSheets = sheets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      {/* Thông tin dự án */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 transition-transform duration-300 transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-3">
          Thông Tin Dự Án
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Tên dự án", value: data.ProjectInfo.Name },
            { label: "Số hiệu", value: data.ProjectInfo.Number },
            { label: "Địa chỉ", value: data.ProjectInfo.Address },
            { label: "Tên tệp", value: data.FileInfo.FileName },
          ].map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="font-semibold text-gray-700">{item.label}</p>
              <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-md shadow-sm">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Danh sách bản vẽ */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="inline-block w-1 h-6 bg-blue-500 mr-2 rounded"></span>
          Danh Sách Bản Vẽ
        </h3>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Tên bản vẽ</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Loại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentSheets.map((sheet, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">{sheet.Name}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">{sheet.Type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Trang {currentPage} / {totalPages}
          </p>

          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md flex items-center ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md flex items-center ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="mt-8 flex justify-end animate-fade-in">
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 active:scale-95 transform transition-all duration-200">
          <Plus size={20} />
          <span className="font-medium">Xuất báo cáo</span>
        </button>
      </div>
    </div>
  );
};

export default TemplatesContent;
