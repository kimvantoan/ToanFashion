import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Sort = () => {
    const [sortOpen, setSortOpen] = useState(false)
    const sortOptions = ["Mới nhất", "Giá: Thấp đến cao", "Giá: Cao đến thấp", "Bán chạy nhất"]
    const [selectedSort, setSelectedSort] = useState(sortOptions[0])

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1
        className="text-2xl font-bold text-red-600"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        Thời trang{" "}
        <span className="text-sm font-normal text-gray-500">21 sản phẩm</span>
      </h1>

      <div className="relative" data-aos="fade-left" data-aos-delay="200">
        <div
          className="flex items-center gap-2 bg-white shadow rounded-md px-4 py-2 cursor-pointer"
          onClick={() => setSortOpen(!sortOpen)}
        >
          <span>Sắp xếp</span>
          <KeyboardArrowDownIcon className="h-4 w-4" />
        </div>

        {sortOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white  rounded-md shadow-lg z-10">
            <ul>
              {sortOptions.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedSort === option ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedSort(option);
                    setSortOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
