import {api} from "../api/api";

// data = { productId, quantity, size }
export const addToCartApi = (data) => api.post("/cart", data);

export const getCartApi = () => api.get("/cart");