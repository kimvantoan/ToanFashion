import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const Search_Header = () => {
    return (
        <div className="mb-8 text-center" data-aos="fade-down" data-aos-duration="800">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Tim kiếm</h1>
          <p className="text-gray-600 mb-6">
            Có <span className="font-medium">20</span> sản phẩm cho tìm kiếm
          </p>
    
          <div className="w-full max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              defaultValue="ghế"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
    
          <div className="border-b-2 border-gray-200 w-32 mx-auto mt-6"></div>
    
          <p className="mt-6 text-left">
            Kết quả tìm kiếm cho "<span className="font-medium">ghế</span>"
          </p>
        </div>
      )
}

export default Search_Header