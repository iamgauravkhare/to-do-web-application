"use client";
import style from "./Header.module.css";
import { useContext, useState } from "react";
import { centralisedData } from "@/app/context";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserSignOut } from "@/store/actions";

const Header = () => {
  const dispatch = useDispatch();
  const [slidingNavbar, setSlidingNavbar] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
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
          profile,
          setProfile,
          editProfile,
          setEditProfile,
          resetPassword,
          setResetPassword,
          showToDo,
          setShowToDo,
          createToDo,
          setCreateToDo,
          showIllusCtn,
          setShowIllusCtn,
          darkMode,
          setDarkMode,
  ] = useContext(centralisedData);

  const showHomeHandler = () => {
    window.scrollTo(0, 0);
    setSlidingNavbar(false);
    setShowSignIn(null);
    setShowSignUp(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setIllustration("/landingPageIllustration.png");
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
    setShowToDo(true);
    setCreateToDo(true);
    setIllustration("/landingPageIllustration.png");
    setShowIllusCtn(null);
    setProfile(null);
    window.scrollTo(0, 0);
    setSlidingNavbar(false);
    setShowSignIn(null);
    setShowSignUp(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowLandingPageHeading(true);
    dispatch(asyncUserSignOut());
  };

  const profileHandler = () => {
    setShowToDo(null);
    setCreateToDo(null);
    setIllustration("/profileIllustration.png");
    setShowIllusCtn(true);
    setSlidingNavbar(false);
    setResetPassword(null);
    setProfile(true);
  };

  const dashboardHandler = () => {
    setShowToDo(true);
    setCreateToDo(true);
    setSlidingNavbar(false);
    setResetPassword(null);
    setIllustration("/landingPageIllustration.png");
    setShowIllusCtn(null);
    setProfile(null);
  };

  const addSlidingNavbar = () => {
    setSlidingNavbar(true);
  };

  const removeSlidingNavbar = () => {
    setSlidingNavbar(false);
  };

  const DarkModeHandler = () => {
    document.documentElement.style.setProperty("--primaryColor", "#ffffff");
    document.documentElement.style.setProperty(
      "--secondaryColor",
      "rgba(0, 48, 143, 0.9)"
    );
    document.documentElement.style.setProperty(
      "--backgroundColor",
      "rgba(128, 128, 128, 0.1)"
    );
    document.documentElement.style.setProperty(
      "--hoverColor",
      "rgba(0, 48, 143, 1)"
    );
    setSlidingNavbar(false);
    setDarkMode(false);
  };

  const LightModeHandler = () => {
    document.documentElement.style.setProperty(
      "--primaryColor",
      "rgba(0, 48, 143, 0.9)"
    );
    document.documentElement.style.setProperty("--secondaryColor", "#ffffff");
    document.documentElement.style.setProperty(
      "--backgroundColor",
      "rgba(128, 128, 128, 0.1)"
    );
    document.documentElement.style.setProperty(
      "--hoverColor",
      "rgba(0, 48, 143, 1)"
    );
    setSlidingNavbar(false);
    setDarkMode(true);
  };

  return (
    <>
      <div className={style.headCtn}>
        <div className={style.left}>
          <h1 className={style.heading}>DailyDoer</h1>
          <h6 className={style.subHeading}>
            Daily Task Organizer For Proactive Individuals Seeking Seamless
            Productivity
          </h6>
        </div>
        <div className={style.right}>
          {!isAuthenticated ? (
            <>
              <button
                className={`btns ${style.btns}`}
                onClick={showHomeHandler}
              >
                Home
              </button>
              <button
                className={`btns ${style.btns}`}
                onClick={showSignInHandler}
              >
                Sign In
              </button>
              <button
                className={`btns ${style.btns}`}
                onClick={showSignUpHandler}
              >
                Sign Up
              </button>
              <button
                className={`btns ${style.btns}`}
                onClick={darkMode ? DarkModeHandler : LightModeHandler}
              >
                {darkMode ? "Dark Mode" : "Light Mode"}
              </button>
            </>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <>
              <button
                className={`btns ${style.btns}`}
                type="button"
                onClick={dashboardHandler}
              >
                Dashboard
              </button>
              <button
                type="button"
                className={`btns ${style.btns}`}
                onClick={profileHandler}
              >
                My Profile
              </button>
              <button
                type="button"
                className={`btns ${style.btns}`}
                onClick={signOutHandler}
              >
                Logout
              </button>
              <button
                className={`btns ${style.btns}`}
                onClick={darkMode ? DarkModeHandler : LightModeHandler}
              >
                {darkMode ? "Dark Mode" : "Light Mode"}
              </button>
            </>
          ) : (
            <></>
          )}

          <button
            type="button"
            className={`btns ${style.btns}`}
            onClick={addSlidingNavbar}
          >
            Menu
          </button>
        </div>
        {slidingNavbar && (
          <div className={style.slidingNavbar}>
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
                <button
                  className={`btns btns-slidingNav`}
                  onClick={darkMode ? DarkModeHandler : LightModeHandler}
                >
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </button>
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
                <button
                  className={`btns btns-slidingNav`}
                  onClick={darkMode ? DarkModeHandler : LightModeHandler}
                >
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
