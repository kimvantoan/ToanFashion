import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FloatingChat from "../components/FloatingChat";
const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-start justify-center bg-gray-50 py-2">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingChat />
    </>
  );
};

export default RootLayout;
