import { centralisedData } from "@/app/context";
import {
  asyncClearForgetPasswordToken,
  asyncSendForgetPasswordEmail,
} from "@/store/actions";
import { addLoading } from "@/store/reducers";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [useremail, setUserEmail] = useState("");
  const {
    setShowSignIn,
    setShowLandingPageHeading,
    setShowSignUp,
    setShowForgetPassword,
    setShowSetForgetPassword,
  } = useContext(centralisedData);

  const timeOut = (useremail) => {
    const email = {
      email: useremail,
    };
    const timeOut = setTimeout(() => {
      dispatch(asyncClearForgetPasswordToken(email));
      clearTimeout(timeOut);
    }, 60000);
  };

  const showSignInHandler = () => {
    window.scrollTo(0, 0);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignUp(null);
    setShowSignIn(true);
  };

  const showSetForgetPasswordHandler = () => {
    setShowLandingPageHeading(null);
    setShowSignUp(null);
    setShowSignIn(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(true);
  };

  const submitHandler = async (e) => {
    dispatch(addLoading());
    e.preventDefault();
    const email = {
      email: useremail,
    };
    await dispatch(
      asyncSendForgetPasswordEmail(
        email,
        showSetForgetPasswordHandler,
        timeOut,
        useremail
      )
    );
  };

  return (
    <>
      <div className="w-full md:w-[50%] lg:w-[50%] flex items-center justify-center">
        <div className="w-full md:w-[80%] lg:w-[55%] p-5 md:p-6 lg:p-7 rounded-lg bg-backgroundColor">
          <form className="w-full" autoComplete="off">
            <div className="flex flex-col gap-4 w-full">
              <h6 className="text-center text-xl font-semibold">
                Forget Password
              </h6>
              <p className="text-center md:text-start lg:text-start">
                We will send OTP on your registered email to verify you
              </p>
              <div className="text-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={useremail}
                  required
                />
                <img
                  alt="Email Icon"
                  title="Email Icon"
                  src="/emailLogo.svg"
                  className="hide"
                />
              </div>
              <button
                type="button"
                className="form-btn"
                onClick={submitHandler}
              >
                Send Email
              </button>
              <div className="my-form-actions">
                <h6 className="my-form-signup">
                  <button
                    className="forget-btn underline"
                    onClick={showSignInHandler}
                    type="button"
                  >
                    Back to sign in
                  </button>
                </h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
