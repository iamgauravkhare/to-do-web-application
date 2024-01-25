import { useContext } from "react";
import { centralisedData } from "@/app/context";
import { asyncUserSignUp } from "@/store/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addLoading } from "@/store/reducers";
import { useRouter } from "next/navigation";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const submitHandler = (e) => {
    dispatch(addLoading());
    e.preventDefault();
    const signUpData = {
      fullname: `${e.target.fullname.value}`,
      email: `${e.target.email.value}`,
      password: `${e.target.password.value}`,
    };
    dispatch(asyncUserSignUp(signUpData, router));
  };

  const googleSignIn = () => {
    toast.info("This service is unavailable");
  };

  return (
    <>
      <div className="w-full md:w-[50%] lg:w-[50%] flex items-center justify-center">
        <div className="w-full md:w-[80%] lg:w-[55%] p-5 md:p-6 lg:p-7 rounded-lg bg-backgroundColor">
          <form className="w-full" onSubmit={submitHandler} autoComplete="off">
            {/* <button className="form-btn" onClick={googleSignIn} type="button">
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
                Create Your Account
              </h6>
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
                    className="forget-btn underline"
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
