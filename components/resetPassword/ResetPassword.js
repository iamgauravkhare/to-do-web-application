import { centralisedData } from "@/app/context";
import { asyncResetPassword } from "@/store/actions";
import { addLoading, removeLoading } from "@/store/reducers";
import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const refe = useRef(null);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const { setProfile, setResetPassword } = useContext(centralisedData);

  const ProfileHandler = () => {
    setProfile(true);
    setResetPassword(false);
  };

  const submitHandler = (e) => {
    dispatch(addLoading());
    e.preventDefault();
    const elems = refe.current;
    if (newPassword === verifyNewPassword) {
      const updatedPasswordData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      dispatch(asyncResetPassword(updatedPasswordData, ProfileHandler));
    } else {
      elems.style.borderColor = "red";
      toast.error("Confirm password not matched");
      dispatch(removeLoading());
    }
  };

  return (
    <>
      <div className="w-full md:w-[50%] lg:w-[50%] flex items-center justify-center">
        <div className="w-full md:w-[80%] lg:w-[55%] p-5 md:p-6 lg:p-7 rounded-lg bg-backgroundColor">
          <form className="w-full" autoComplete="off">
            <div className="flex flex-col gap-4 w-full">
              <h6 className="text-center text-xl font-semibold">
                Reset Your Password
              </h6>
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
              <div className="my-form-actions">
                <h6 className="my-form-signup">
                  <button
                    className="forget-btn underline"
                    onClick={ProfileHandler}
                    type="button"
                  >
                    Back to profile
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

export default ResetPassword;
