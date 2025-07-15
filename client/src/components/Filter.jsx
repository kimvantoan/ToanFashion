import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Filter = () => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const brands = [
    "ZARA",
    "H&M",
    "GUCCI",
    "CHANEL",
    "DIOR",
    "PRADA",
    "VERSACE",
    "BALENCIAGA",
    "FENDI",
    "LOUIS VUITTON",
  ];

  const priceRanges = [
    "Dưới 1.000.000₫",
    "1.000.000₫ - 2.000.000₫",
    "2.000.000₫ - 3.000.000₫",
    "3.000.000₫ - 4.000.000₫",
    "Trên 4.000.000₫",
  ];

  return (
    <div className="space-y-6">
      <div
        className="rounded-md bg-white shadow"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          <h3 className="font-medium">Danh mục sản phẩm</h3>
          <KeyboardArrowDownIcon
            className={`h-5 w-5 transition-transform ${
              categoryOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {categoryOpen && (
          <div className="p-4 pt-0 border border-gray-100">
            <ul className="space-y-2">
              <li
                className="hover:text-red-600 cursor-pointer"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                Được mua nhiều gần đây
              </li>
              <li
                className="hover:text-red-600 cursor-pointer"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                Sản phẩm mới
              </li>
              <li
                className="hover:text-red-600 cursor-pointer"
                data-aos="fade-left"
                data-aos-delay="250"
              >
                Tất cả sản phẩm
              </li>
            </ul>
          </div>
        )}
      </div>

      <div
        className="shadow rounded-md bg-white"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setBrandOpen(!brandOpen)}
        >
          <h3 className="font-medium">Nhà cung cấp</h3>
          <KeyboardArrowDownIcon
            className={`h-5 w-5 transition-transform ${
              brandOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {brandOpen && (
          <div className="p-4 pt-0 border border-gray-100">
            <ul className="space-y-2">
              {brands.map((brand, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2"
                  data-aos="fade-left"
                  data-aos-delay={150 + index * 50}
                >
                  <input
                    type="checkbox"
                    id={`brand-${index}`}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`brand-${index}`} className="cursor-pointer">
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        className="shadow rounded-md bg-white"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <h3 className="font-medium">Giá</h3>
          <KeyboardArrowDownIcon
            className={`h-5 w-5 transition-transform ${
              priceOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {priceOpen && (
          <div className="p-4 pt-0 border-t border-gray-100">
            <ul className="space-y-2">
              {priceRanges.map((range, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2"
                  data-aos="fade-left"
                  data-aos-delay={150 + index * 50}
                >
                  <input
                    type="checkbox"
                    id={`price-${index}`}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`price-${index}`} className="cursor-pointer">
                    {range}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
