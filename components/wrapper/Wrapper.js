"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import store from "@/store/store";
import { Provider } from "react-redux";
import CentralisedData from "@/app/context";

const Wrapper = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <CentralisedData>
          <div className="w-full min-h-screen p-2 flex items-center gap-2 flex-col relative bg-backgroundColor text-primaryColor">
            <Header />
            {children}
            <Footer />
          </div>
          <ToastContainer position="top-center" autoClose="1000" />
        </CentralisedData>
      </Provider>
    </>
  );
};

export default Wrapper;
