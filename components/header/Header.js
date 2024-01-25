"use client";
import style from "./Header.module.css";
import { useContext, useState } from "react";
import { centralisedData } from "@/app/context";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserSignOut } from "@/store/actions";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [slidingNavbar, setSlidingNavbar] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const {
    setShowSignIn,
    setShowLandingPageHeading,
    setShowSignUp,
    setShowForgetPassword,
    setShowSetForgetPassword,
    setIllustration,
    setProfile,
    setResetPassword,
  } = useContext(centralisedData);

  const showHomeHandler = () => {
    window.scrollTo(0, 0);
    setIllustration("/landingPageIllustration.png");
    setSlidingNavbar(false);
    setShowSignIn(null);
    setShowSignUp(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowLandingPageHeading(true);
  };

  const showSignInHandler = () => {
    window.scrollTo(0, 0);
    setSlidingNavbar(false);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignUp(null);
    setIllustration("/loginIllustration.png");
    setShowSignIn(true);
  };

  const showSignUpHandler = () => {
    window.scrollTo(0, 0);
    setSlidingNavbar(false);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignIn(null);
    setIllustration("/signupIllustration.png");
    setShowSignUp(true);
  };

  const signOutHandler = () => {
    window.scrollTo(0, 0);
    setIllustration("/landingPageIllustration.png");
    setSlidingNavbar(false);
    setShowSignIn(null);
    setShowSignUp(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowLandingPageHeading(true);
    dispatch(asyncUserSignOut(router));
  };

  const profileHandler = () => {
    setIllustration("/profileIllustration.png");
    setSlidingNavbar(false);
    setResetPassword(null);
    setProfile(true);
    router.push("/my-profile");
  };

  const dashboardHandler = () => {
    router.push("/dashboard");
    setSlidingNavbar(false);
  };

  const addSlidingNavbar = () => {
    setSlidingNavbar(true);
  };

  const removeSlidingNavbar = () => {
    setSlidingNavbar(false);
  };

  return (
    <>
      <div className="w-full bg-secondaryColor rounded-lg">
        <div className="px-5 py-4 md:p-5 lg:p-5 flex items-center justify-between flex-wrap gap-2 mx-auto w-full max-w-[1460px] rounded-lg">
          <div className="leading-6">
            <h1 className="font-extrabold text-4xl">DailyDoer</h1>
            <h6 className="hidden md:flex lg:flex">
              Daily Task Organizer For Proactive Individuals Seeking Seamless
              Productivity
            </h6>
          </div>
          <div className="flex items-center">
            {!isAuthenticated ? (
              <>
                <button
                  className={`btns ml-5 md:ml-0 lg:ml-0 hidden md:flex lg:flex`}
                  onClick={showHomeHandler}
                >
                  Home
                </button>
                <button
                  className={`btns hidden md:flex lg:flex`}
                  onClick={showSignInHandler}
                >
                  Sign In
                </button>
                <button
                  className={`btns hidden md:flex lg:flex`}
                  onClick={showSignUpHandler}
                >
                  Sign Up
                </button>
                {/* <button className={`btns hidden md:flex lg:flex`} disabled>
                  Dark Mode
                </button> */}
              </>
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <>
                <button
                  style={{ margin: "0px" }}
                  className={`btns hidden md:flex lg:flex`}
                  type="button"
                  onClick={dashboardHandler}
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  className={`btns hidden md:flex lg:flex`}
                  onClick={profileHandler}
                >
                  My Profile
                </button>
                <button
                  type="button"
                  className={`btns hidden md:flex lg:flex`}
                  onClick={signOutHandler}
                >
                  Logout
                </button>
                {/* <button className={`btns hidden md:flex lg:flex`} disabled>
                  Dark Mode
                </button> */}
              </>
            ) : (
              <></>
            )}

            <button
              type="button"
              className={`btns flex md:hidden lg:hidden m-0`}
              style={{ marginLeft: "0px" }}
              onClick={addSlidingNavbar}
            >
              Menu
            </button>
          </div>
          {slidingNavbar && (
            <div className={`${style.slidingNavbar} shadow-md`}>
              <img
                src="/closeButtonLogo.png"
                className={`${style.closeBtn}`}
                onClick={removeSlidingNavbar}
              ></img>
              {!isAuthenticated && (
                <>
                  <button
                    className="btns btns-slidingNav"
                    onClick={showHomeHandler}
                  >
                    Home
                  </button>
                  <button
                    className="btns btns-slidingNav"
                    onClick={showSignInHandler}
                  >
                    Sign In
                  </button>
                  <button
                    className="btns btns-slidingNav"
                    onClick={showSignUpHandler}
                  >
                    Sign Up
                  </button>
                  {/* <button className={`btns btns-slidingNav`} disabled>
                    Dark Mode
                  </button> */}
                </>
              )}
              {isAuthenticated && (
                <>
                  <button
                    className="btns btns-slidingNav"
                    onClick={dashboardHandler}
                  >
                    Dashboard
                  </button>
                  <button
                    className="btns btns-slidingNav"
                    onClick={profileHandler}
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    className="btns btns-slidingNav"
                    onClick={signOutHandler}
                  >
                    Logout
                  </button>
                  {/* <button className={`btns btns-slidingNav`} disabled>
                    Dark Mode
                  </button> */}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
