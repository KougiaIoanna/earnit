import React from "react";
import moment from "moment";
import {
  setConfirmPassword,
  setEmail,
  setId,
  setIsLoggedin,
  setPassword,
  setUsername,
} from "../redux/actions";

export const isEmailValid = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

export const isFormValidSignup = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  if (
    areSignupFieldsFilledOut({ username, email, password, confirmPassword }) ==
    false
  ) {
    return false;
  } else if (password !== confirmPassword) {
    alert("Given passwords dont match");
  } else return true;
};

const areSignupFieldsFilledOut = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  if (!username) {
    alert("username cannot be empty");
    return false;
  } else if (!isEmailValid(email)) {
    alert("Invalid Email");
    return false;
  } else if (!confirmPassword) {
    alert("You need to confirm your password");
  } else return true;
};
export const isFormValidSignin = ({ email, password }) => {
  if (!email) {
    alert("email cannot be empty");
    return false;
  } else if (!isEmailValid) {
    alert("give a valid email");
    return false;
  } else if (!password) {
    alert("Password cannot be empty");
    return false;
  }
  return true;
};

export const serverApprovesSignup = (data) => {
  if (data.success === true) {
    return true;
  } else {
    switch (data.message) {
      case "This email is already in use, try sign-in":
        alert("This email is already in use, try sign-in");
        return false;
      case "Password must be 8 to 20 characters long!":
        alert("Password must be 8 to 20 characters long!");
        return false;
      case "Both password must be same!":
        alert("Both password must be same!");
        return false;
    }
  }
};

export const serverAprovesSignin = (data) => {
  if (data.success === true) {
    return true;
  } else if (data.message == "email/password dont match") {
    alert("Email / password dont match ");
    return false;
  } else if (data.message == "User not found with this email") {
    alert("User not found with this email. Try Signing up");
    return false;
  }
};

export const areFormFieldsFilledOut = (listOfAttributes) => {
  for (let i = 0; i < listOfAttributes.length; i++) {
    if (listOfAttributes[i] === "" || listOfAttributes[i] === null) {
      alert("fields cannot be empty");
      return false;
    }
  }
  return true;
};

export const setStatesNull = (dispatch) => {
  dispatch(setId(null));
  dispatch(setUsername(null));
  dispatch(setEmail(null));
  dispatch(setPassword(null));
  dispatch(setConfirmPassword(null));
  dispatch(setIsLoggedin(false));
};
