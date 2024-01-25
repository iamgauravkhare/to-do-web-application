import { asyncUpdateForgetPassword } from "@/store/actions";
import { addLoading } from "@/store/reducers";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

const SetForgetPassword = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const {
    setShowSignIn,
    setShowLandingPageHeading,
    setShowSignUp,
    setShowForgetPassword,
    setShowSetForgetPassword,
  } = useContext(centralisedData);

  const showSignInHandler = () => {
    window.scrollTo(0, 0);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignUp(null);
    setShowSignIn(true);
  };

  const submitHandler = () => {
    dispatch(addLoading());
    const updatedPasswordData = {
      email: userEmail,
      newPassword: newPassword,
      otp: parseInt(otp),
    };
    dispatch(asyncUpdateForgetPassword(updatedPasswordData, showSignInHandler));
  };
  return (
    <>
      <div className="w-full md:w-[50%] lg:w-[50%] flex items-center justify-center">
        <div className="w-full md:w-[80%] lg:w-[55%] p-5 md:p-6 lg:p-7 rounded-lg bg-backgroundColor">
          <form className="w-full" autoComplete="off">
            <div className="flex flex-col gap-4 w-full">
              <h6 className="text-center text-xl font-semibold">
                Change Your Password
              </h6>
              <div className="text-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                />
                <img
                  alt="Email Icon"
                  title="Email Icon"
                  src="/emailLogo.svg"
                  className="hide"
                />
              </div>
              <div className="text-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  autoComplete="false"
                />
                <img
                  alt="Password Icon"
                  title="Password Icon"
                  src="/passwordLogo.svg"
                  className="hide"
                />
              </div>
              <div className="text-field">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="email"
                  placeholder="Enter OTP"
                  required
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
              </div>
              <button
                type="button"
                className="form-btn"
                onClick={submitHandler}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetForgetPassword;
