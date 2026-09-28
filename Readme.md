# SNITCH

SNITCH is a full-stack fashion e-commerce web application where users can browse products, manage their cart, and authenticate securely. Sellers can create, manage, list, unlist, and delete their products.

## Features

### User Features
- User registration and login
- JWT-based authentication
- Access token and refresh token authentication
- Secure logout
- View authenticated user profile
- Browse listed products
- View product details
- Add products to cart
- Select product size and quantity

### Seller Features
- Seller authentication
- Create products
- Upload product images
- Add multiple sizes and stock
- View seller products
- List products
- Unlist products
- Delete products

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Redux Toolkit
- React Hook Form
- Axios
- Tailwind CSS
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Express Validator
- Multer
- ImageKit

## Project Structure

```text
SNITCH/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md