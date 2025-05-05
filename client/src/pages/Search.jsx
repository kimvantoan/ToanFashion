import React from 'react'
import Search_Header from '../components/Search_Header'
import Product_Grid from '../components/Product_Grid'
import RootLayout from '../layout/RootLayout'

const Search = () => {
  return (
    <RootLayout>

    <div className="container mx-auto px-4 py-8">
    <Search_Header />
    <Product_Grid />
  </div>
    </RootLayout>
  )
}

export default Search