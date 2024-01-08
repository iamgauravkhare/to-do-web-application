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
  const [
    showSignIn,
    setShowSignIn,
    showLandingPageHeading,
    setShowLandingPageHeading,
    showSignUp,
    setShowSignUp,
    showForgetPassword,
    setShowForgetPassword,
    showSetForgetPassword,
    setShowSetForgetPassword,
    illustration,
    setIllustration,
  ] = useContext(centralisedData);

  const { loading } = useSelector((state) => state.userSlice);

  return (
    <>
      {loading ? (
        <div className="common-content-ctn loader-center">
          <Loader />
        </div>
      ) : (
        <div className="common-content-ctn">
          {showLandingPageHeading && <LandingPageHeading />}
          <Illustration imageSrc={illustration} />
          {showSignIn && <Signin />}
          {showSignUp && <Signup />}
          {showForgetPassword && <ForgetPassword />}
          {showSetForgetPassword && <SetForgetPassword />}
        </div>
      )}
    </>
  );
};

export default LandingPage;
