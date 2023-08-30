import axiosClient from "../config/axios";
import { getTokenApi, deleteTokenApi, setTokenApi } from "./token";
import { USER } from "../utils/constants";

const setUserApi = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const getUserApi = () => {
  return JSON.parse(localStorage.getItem(USER));
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
    return data;
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
  try {
    const { data } = await axiosClient.post("/register", newUserData);

    setTokenApi(data.token);

    const newUser = {
      id: data.user.id,
      name: data.user.name,
      rol: data.user.rol,
      credits: data.user.credits,
    };
    // and finally save the returned token to the localstorage
    setUserApi(newUser);
    return newUser;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
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

  try {
    // Send the request to the API with the data from the form fields values
    const { data } = await axiosClient.post("/login", userData);
    setTokenApi(data.token);
    const user = {
      id: data.user.id,
      name: data.user.name,
      rol: data.user.rol,
      credits: data.user.credits,
    };
    // and finally save the returned token to the localstorage
    setUserApi(user);
    return user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
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
