import { loginFailure, loginStart, loginSuccess,  } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {getUserFailure,
  getUserStart,
  getUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./usersRedux"
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,

} from "./productRedux";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/loginUser", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
     const res = await userRequest.delete(`/products/find/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, dispatch, product) => {
  dispatch(updateProductStart());
  try {
    const res=await userRequest.put(`/products/find/${id}`,product)
    
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
export const getUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/user");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
     const res = await userRequest.delete(`/user/find/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
export const updateUser = async (id, dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const res=await userRequest.put(`/user/${id}`,user)
    
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
