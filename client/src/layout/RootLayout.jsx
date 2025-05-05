import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = ({children}) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className=" flex h-fit items-start justify-center bg-gray-50 py-2">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
