import { asyncGetUserAuthenticated } from "@/store/actions";
import {
  addLoading,
  removeError,
  removeLoading,
  removeNotification,
} from "@/store/reducers";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export const centralisedData = createContext(null);
const CentralisedData = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, notification, isAuthenticated } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    console.log("Context chala");
    dispatch(addLoading());
    dispatch(asyncGetUserAuthenticated(router));
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      error.map((e, i) => {
        toast.error(e);
      });
      dispatch(removeError());
    }
  }, [error]);

  useEffect(() => {
    if (notification.length > 0) {
      notification.map((e, i) => {
        toast.info(e);
      });
      dispatch(removeNotification());
    }
  }, [notification]);

  const [showLandingPageHeading, setShowLandingPageHeading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(null);
  const [showSignUp, setShowSignUp] = useState(null);
  const [showForgetPassword, setShowForgetPassword] = useState(null);
  const [showSetForgetPassword, setShowSetForgetPassword] = useState(null);
  const [illustration, setIllustration] = useState(
    "/landingPageIllustration.png"
  );
  const [profile, setProfile] = useState(true);
  const [editProfile, setEditProfile] = useState(null);
  const [resetPassword, setResetPassword] = useState(null);
  const [showToDo, setShowToDo] = useState(true);
  const [createToDo, setCreateToDo] = useState(true);
  const [showIllusCtn, setShowIllusCtn] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <centralisedData.Provider
        value={{
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
        }}
      >
        {props.children}
      </centralisedData.Provider>
    </>
  );
};

export default CentralisedData;
