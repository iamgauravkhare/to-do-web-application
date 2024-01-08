import { asyncUpdateForgetPassword } from "@/store/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SetForgetPassword = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const submitHandler = () => {
    const updatedPasswordData = {
      email: userEmail,
      newPassword: newPassword,
      otp: parseInt(otp),
    };
    dispatch(asyncUpdateForgetPassword(updatedPasswordData));
  };
  return (
    <>
      <div className="form-ctn">
        <div className="whole-form-wrapper">
          <form className="form" autoComplete="off">
            <div className="form-wrapper">
              <h6 className="form-heading">Change Your Password</h6>
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
