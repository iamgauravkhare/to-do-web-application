import { centralisedData } from "@/app/context";
import { asyncUserSignIn } from "@/store/actions";
import { addLoading } from "@/store/reducers";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    setShowSignIn,
    setShowLandingPageHeading,
    setShowSignUp,
    setShowForgetPassword,
    setShowSetForgetPassword,
  } = useContext(centralisedData);

  const showForgetPasswordHandler = () => {
    window.scrollTo(0, 0);
    setShowLandingPageHeading(null);
    setShowSetForgetPassword(null);
    setShowSignUp(null);
    setShowSignIn(null);
    setShowForgetPassword(true);
  };

  const showSignUpHandler = () => {
    window.scrollTo(0, 0);
    setShowLandingPageHeading(null);
    setShowForgetPassword(null);
    setShowSetForgetPassword(null);
    setShowSignIn(null);
    setShowSignUp(true);
  };

  const submitHandler = (e) => {
    dispatch(addLoading());
    e.preventDefault();
    const signInData = {
      email: `${e.target.email.value}`,
      password: `${e.target.password.value}`,
    };
    dispatch(asyncUserSignIn(signInData, router));
  };

  const googleSignIn = () => {
    toast.info("This service is unavailable");
  };

  return (
    <>
      <div className="w-full md:w-[50%] lg:w-[50%] flex items-center justify-center">
        <div className="w-full md:w-[80%] lg:w-[55%] p-5 md:p-6 lg:p-7 rounded-lg bg-backgroundColor">
          <form className="w-full" onSubmit={submitHandler} autoComplete="off">
            {/* <button className="form-btn" type="button" onClick={googleSignIn}>
              <img src="/googleLogo.png" alt="Google" />
              Sign In With Google
            </button>
            <div className="divider">
              <div className="dividerline"></div>
              Or
              <div className="dividerline"></div>
            </div> */}
            <div className="flex flex-col gap-4 w-full">
              <h6 className="text-center text-xl font-semibold">
                Sign In Your Account
              </h6>
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
                  autoComplete="false"
                  placeholder="Enter Password"
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
                Sign In
              </button>
              <div className="my-form-actions">
                <button
                  className="forget-btn"
                  type="button"
                  onClick={showForgetPasswordHandler}
                >
                  Forget Password
                </button>
                <h6 className="my-form-signup">
                  Dont have account ?
                  <button
                    className="forget-btn underline"
                    onClick={showSignUpHandler}
                    type="button"
                  >
                    &nbsp;Create Your Account
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

export default Signin;
