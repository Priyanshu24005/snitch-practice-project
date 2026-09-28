import {api} from "../api/api";

export const getAllProductsApi = () => api.get("/products/allproducts");
export const getProductByIdApi = (id) => api.get(`/products/${id}`);