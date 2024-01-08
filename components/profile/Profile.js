import { centralisedData } from "@/app/context";
import {
  asyncUploadProfileImage,
  asyncUserDeleteAccount,
} from "@/store/actions/userActions";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const elemRef = useRef(null);
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
  ] = useContext(centralisedData);

  const dispatch = useDispatch();
  const [uploadProfileForm, setUploadProfileForm] = useState(true);
  const [imageInputTrigger, setImageInputTrigger] = useState(null);

  const [profileCard, setProfileCard] = useState(false);
  const { userData, isAuthenticated } = useSelector((state) => state.userSlice);
  const deleteAccountHandler = () => {
    dispatch(asyncUserDeleteAccount());
  };
  const uploadProfileFormHandler = () => {
    setProfileCard(true);
    setUploadProfileForm(false);
  };
  const resetPasswordFormHandler = () => {
    setProfile(null);
    setResetPassword(true);
  };

  useEffect(() => {
    if (imageInputTrigger !== null) {
      const elem = elemRef.current;
      elem.click();
      setImageInputTrigger(null);
    }
  }, [imageInputTrigger]);

  const submitHandler = (e) => {
    e.preventDefault();
    const profileImageData = new FormData(e.target);
    profileImageData.set("profileImage", e.target.profileImage.files[0]);
    dispatch(asyncUploadProfileImage(profileImageData));
    setProfileCard(false);
    setUploadProfileForm(true);
  };
  return (
    <>
      <div className="profile-ctn">
        <div className={`profile-card ${profileCard && "set-profile-card"}`}>
          <div className="left">
            {userData && <img src={userData.profileimage.url} alt="" />}
          </div>
          <div className="right">
            <div className="top">
              <button className="btns" onClick={uploadProfileFormHandler}>
                Upload Profile
              </button>
              {userData && <h1>{userData.fullname}</h1>}
              {userData && <h5>{userData.email}</h5>}
            </div>
            <div className="bottom">
              <button className="btns" onClick={resetPasswordFormHandler}>
                Reset Password
              </button>
              <button className="btns" onClick={deleteAccountHandler}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div
          className={`whole-form-wrapper ${
            uploadProfileForm && "upload-profile-form"
          }`}
        >
          <form
            className="form"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="form-wrapper">
              <h6 className="form-heading">Upload Profile Image</h6>
              <div className="text-field">
                <label htmlFor="email">Select Image</label>
                <input
                  type="file"
                  id="email"
                  name="profileImage"
                  ref={elemRef}
                  className="profileImg"
                  required
                />
                <button
                  type="button"
                  className="form-btn"
                  onClick={() => setImageInputTrigger(true)}
                  style={{ marginTop: "5px" }}
                >
                  Choose Image
                </button>
              </div>
              <input type="submit" className="form-btn" value="Upload Image" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
