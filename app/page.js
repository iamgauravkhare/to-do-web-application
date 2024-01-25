"use client";
import Illustration from "@/components/illustration/Illustration";
import LandingPageHeading from "@/components/landingPageHeading/LandingPageHeading";
import Signin from "@/components/signin/Signin";
import { useContext } from "react";
import { centralisedData } from "./context";
import Signup from "@/components/signup/Signup";
import ForgetPassword from "@/components/forgetPassword/ForgetPassword";
import SetForgetPassword from "@/components/setForgetPassword/SetForgetPassword";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";

const LandingPage = (props) => {
  const {
    showSignIn,
    showLandingPageHeading,
    showSignUp,
    showForgetPassword,
    showSetForgetPassword,
    illustration,
  } = useContext(centralisedData);

  const { loading } = useSelector((state) => state.userSlice);

  return (
    <div className="w-full bg-secondaryColor rounded-lg">
      {loading ? (
        <div className="w-full min-h-[85vh] max-w-[1460px] p-5 mx-auto rounded-lg bg-secondaryColor flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div
          className={`w-full min-h-[85vh] max-w-[1460px] p-5 rounded-lg mx-auto bg-secondaryColor flex ${
            showLandingPageHeading ? "flex-col" : "flex-col-reverse"
          } md:flex-row lg:flex-row gap-8 md:gap-0 lg:gap-0 items-center justify-center`}
        >
          {showLandingPageHeading && <LandingPageHeading />}
          <Illustration imageSrc={illustration} />
          {showSignIn && <Signin />}
          {showSignUp && <Signup />}
          {showForgetPassword && <ForgetPassword />}
          {showSetForgetPassword && <SetForgetPassword />}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
