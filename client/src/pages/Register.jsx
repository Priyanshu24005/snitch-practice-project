import { useForm } from "react-hook-form";
import { registerUser } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      navigate("/main");
      return;
    }

    if (registerUser.rejected.match(result)) {
      console.log("BACKEND ERROR:", result.payload);

      if (result.payload?.errors?.length>0) {
        result.payload.errors.forEach((error) => {
          setError(error.path, {
            type: "server",
            message: error.msg,
          });
        });

        return;
      }

      if (result.payload?.message) {
        setError("email", {
          type: "server",
          message: result.payload.message,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmpassword", {
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password ||
                  "Passwords do not match",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />

            {errors.confirmpassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-black font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;