import { centralisedData } from "@/app/context";
import {
  asyncClearForgetPasswordToken,
  asyncSendForgetPasswordEmail,
} from "@/store/actions";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [useremail, setUserEmail] = useState("");
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

  const timeOut = (useremail) => {
    const email = {
      email: useremail,
    };
    const timeOut = setTimeout(() => {
      dispatch(asyncClearForgetPasswordToken(email));
      clearTimeout(timeOut);
    }, 60000);
  };

  const showSetForgetPasswordHandler = () => {
    setShowLandingPageHeading(null);
    setShowSignUp(null);
    setShowSignIn(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = {
      email: useremail,
    };
    const res = await dispatch(asyncSendForgetPasswordEmail(email));
    if (res) {
      showSetForgetPasswordHandler();
      timeOut(useremail);
    }
  };

  return (
    <>
      <div className="form-ctn">
        <div className="whole-form-wrapper">
          <form className="form" autoComplete="off">
            <div className="form-wrapper">
              <h6 className="form-heading">Forget Password</h6>
              <p>We will send OTP on your registered email to verify you</p>
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
