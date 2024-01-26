"use client";
import Illustration from "@/components/illustration/Illustration";
import { useContext } from "react";
import { centralisedData } from "../context";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Profile from "@/components/profile/Profile";
import ResetPassword from "@/components/resetPassword/ResetPassword";

const LandingPage = (props) => {
  const { illustration, profile, resetPassword } = useContext(centralisedData);

  const { loading, userData } = useSelector((state) => state.userSlice);

  return (
    <div className="w-full bg-secondaryColor rounded-lg">
      {loading ? (
        <div className="w-full min-h-[85vh] max-w-[1460px] p-5 mx-auto rounded-lg bg-secondaryColor flex items-center justify-center">
          <Loader />
        </div>
      ) : userData ? (
        <div className="w-full min-h-[85vh] max-w-[1460px] p-5 rounded-lg mx-auto bg-secondaryColor flex flex-col-reverse md:flex-row lg:flex-row gap-8 md:gap-0 lg:gap-0 items-center justify-center">
          <Illustration imageSrc={"/profileIllustration.png"} />
          {profile && <Profile />}
          {resetPassword && <ResetPassword />}
        </div>
      ) : (
        <div className="w-full min-h-[85vh] max-w-[1460px] p-5 rounded-lg mx-auto bg-secondaryColor"></div>
      )}
    </div>
  );
};

export default LandingPage;
