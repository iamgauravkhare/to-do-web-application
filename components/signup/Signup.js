import { useContext } from "react";
import { centralisedData } from "@/app/context";
import { asyncUserSignUp } from "@/store/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
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

  const showSignInHandler = () => {
    window.scrollTo(0, 0);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignUp(null);
    setShowSignIn(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const signUpData = {
      fullname: `${e.target.fullname.value}`,
      email: `${e.target.email.value}`,
      password: `${e.target.password.value}`,
    };
    dispatch(asyncUserSignUp(signUpData));
  };

  const googleSignIn = () => {
    toast.info("This service is unavailable");
  };

  return (
    <>
      <div className="form-ctn">
        <div className="whole-form-wrapper">
          <form className="form" onSubmit={submitHandler} autoComplete="off">
            <button className="form-btn" onClick={googleSignIn} type="button">
              <img src="/googleLogo.png" alt="Google" />
              Sign In With Google
            </button>
            <div className="divider">
              <div className="dividerline"></div>
              Or
              <div className="dividerline"></div>
            </div>
            <div className="form-wrapper">
              <h6 className="form-heading">Create Your Account</h6>
              <div className="text-field">
                <label htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  name="fullname"
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="text-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
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
                  placeholder="Enter Password"
                  autoComplete="false"
                  required
                />
                <img
                  alt="Password Icon"
                  title="Password Icon"
                  src="/passwordLogo.svg"
                  className="hide"
                />
              </div>
              <button type="submit" className="form-btn">
                Create Account
              </button>
              <div className="my-form-actions">
                <h6 className="my-form-signup">
                  Already have account ?
                  <button
                    className="forget-btn"
                    onClick={showSignInHandler}
                    type="button"
                  >
                    &nbsp;Login your account
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

export default Signup;
