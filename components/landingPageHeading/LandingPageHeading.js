import { centralisedData } from "@/app/context";
import { useContext } from "react";

const LandingPageHeading = () => {
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
  ] = useContext(centralisedData);

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
      <div className="heading-ctn">
        <h1 className="heading-ctn-heading">
          Redefining Productivity
          <br />
          Organize, Achieve, And Excel In Your
          <br />
          Daily Pursuits.
        </h1>
        <br />
        <h6>Get Started For Free! Sign Up Now</h6>
        <div className="btnWrapper">
          <button className="btns btns-s-1" onClick={showSignUpHandler}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPageHeading;
