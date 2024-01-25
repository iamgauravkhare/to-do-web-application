import { centralisedData } from "@/app/context";
import { useContext } from "react";

const LandingPageHeading = () => {
  const {
    setShowSignIn,
    setShowLandingPageHeading,
    setShowSignUp,
    setShowForgetPassword,
    setShowSetForgetPassword,
  } = useContext(centralisedData);

  const showSignUpHandler = () => {
    window.scrollTo(0, 0);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignIn(null);
    setShowSignUp(true);
  };

  return (
    <>
      <div className="w-full md:w-[50%] lg:w-[50%] flex flex-col items-start gap-2">
        <h1 className="font-extrabold text-[32px] md:text-[42px] lg:text-[42px] leading-[44px] md:leading-[50px] lg:leading-[50px] tracking-wide">
          Redefining Productivity
          <br />
          Organize, Achieve, And Excel In Your
          <br />
          Daily Pursuits.
        </h1>
        <br />
        <h6>Get Started For Free! Sign Up Now</h6>
        <div className="btnWrapper">
          <button
            className="btns"
            style={{ marginLeft: "0px" }}
            onClick={showSignUpHandler}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPageHeading;
