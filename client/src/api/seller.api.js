import {api} from "./api";

export const getSellerProductsApi = () => api.get("/products/sellerProducts");

// formData: Content-Type khud set mat karna, browser boundary ke saath lagata hai
export const createProductApi = (formData) => api.post("/products", formData);

export const listProductApi = (id) => api.patch(`/products/list/${id}`);

export const unlistProductApi = (id) => api.patch(`/products/unlist/${id}`);