import axiosClient from "../config/axios";
import { getTokenApi, deleteTokenApi, setTokenApi } from "./token";
import { USER } from "../utils/constants";

const setUserApi = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const getUserApi = () => {
  return localStorage.getItem(USER);
};

const deleteUserApi = () => {
  localStorage.removeItem(USER);
};

export const setUserCreditsApi = async (credits, id) => {
  try {
    const { data } = await axiosClient.put(
      `/users/${id}`,
      { credits },
      {
        headers: {
          Authorization: `Bearer ${getTokenApi()}`,
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

// The register method for the user to sign up
export const registerAPI = async (formData) => {
  // Get all the form fields values
  const { email, name, password, password_confirmation } = formData;

  // Saving the form fields values in a new object
  const newUserData = {
    name,
    email,
    password,
    password_confirmation,
  };

  // Send the request to the API with the data from the form fields values
  // and finally save the returned token to the localstorage
  const { data } = await axiosClient.post("/register", newUserData);
  setTokenApi(data.token);

  const newUser = {
    id: data.user.id,
    name: data.user.name,
    rol: data.user.rol,
    credits: data.user.credits,
  };
  setUserApi(newUser);
  return newUser;
};

// Sign in method
export async function loginAPI(formData) {
  // Get all the form fields values
  const { email, password } = formData;

  // Saving the form fields values in a new object
  const userData = {
    email,
    password,
  };

  // Send the request to the API with the data from the form fields values
  // and finally save the returned token to the localstorage
  const { data } = await axiosClient.post("/login", userData);
  setTokenApi(data.token);
  const user = {
    id: data.user.id,
    name: data.user.name,
    rol: data.user.rol,
    credits: data.user.credits,
  };
  setUserApi(user);
  return user;
}

// Log out method
export async function logoutAPI() {
  // Get the authenticated user token
  const token = getTokenApi();

  // Send the request to the API to delete the token and remove it from the localstorage
  try {
    await axiosClient.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    deleteTokenApi();
    deleteUserApi();
  } catch (err) {
    console.log(err);
  }
}
