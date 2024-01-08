import { asyncResetPassword } from "@/store/actions";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const refe = useRef(null);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const elems = refe.current;
    if (newPassword === verifyNewPassword) {
      const updatedPasswordData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      dispatch(asyncResetPassword(updatedPasswordData));
    } else {
      elems.style.borderColor = "red";
      toast.error(
        "Both Fields of new Passwords must be same! Please try again"
      );
    }
  };

  return (
    <>
      <div className="form-ctn">
        <div className="whole-form-wrapper">
          <form className="form" autoComplete="off">
            <div className="form-wrapper">
              <h6 className="form-heading">Reset Your Password</h6>
              <div className="text-field">
                <label htmlFor="oldpassword">Old Password</label>
                <input
                  id="oldpassword"
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
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
                <label htmlFor="new1password">New Password</label>
                <input
                  id="new1password"
                  type="password"
                  name="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                <label htmlFor="newpassword">Re-Enter New Password</label>
                <input
                  id="newpassword"
                  type="password"
                  ref={refe}
                  name="password"
                  placeholder="Re-Enter New Password"
                  value={verifyNewPassword}
                  onChange={(e) => setVerifyNewPassword(e.target.value)}
                  autoComplete="false"
                />
                <img
                  alt="Password Icon"
                  title="Password Icon"
                  src="/passwordLogo.svg"
                  className="hide"
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

export default ResetPassword;
