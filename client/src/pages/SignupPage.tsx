import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [role, setRole] = useState("customer");

  const handleRoleChange = () => {
    setRole((prevRole) => (prevRole === "customer" ? "owner" : "customer"));
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: data.email,
          password: data.confirmPassword,
          phone: data.phone,
          firstName: data.firstName,
          lastName: data.lastName,
          role,
        },
      );
      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await axios.post("http://localhost:5000/api/auth/google", {
        token: tokenResponse.access_token,
        role,
      });
      toast.success("Logged in with Google");
    },
  });

  return (
    <div className="mt-20 my-10 items-center justify-center flex">
      <div className="max-w-sm w-full my-5 text-center">
        <div className="flex justify-between items-center">
          <div className="text-text font-bold text-2xl my-10 text-left">
            Sign up for free
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={role === "owner"}
                onChange={handleRoleChange}
                inputProps={{ "aria-label": "switch role" }}
              />
            }
            label={role.charAt(0).toUpperCase() + role.slice(1)}
          />
        </div>
        <div className="w-full">
          <button
            onClick={() => handleGoogleLogin()}
            className="border font-semibold text-text w-full rounded-sm py-3 my-2 flex items-center justify-center gap-5"
            type="button"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>
        <div className="mt-5">OR</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="flex gap-2">
            <div className="mb-4">
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600 text-left mt-1">
                  {String(errors.firstName.message)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600 text-left mt-1">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-600 text-left mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                />
              )}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 text-left mt-1">
                {String(errors.phone.message)}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                )}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 text-left mt-1">
                {String(errors.confirmPassword.message)}
              </p>
            )}
          </div>
          <button
            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center gap-2 mt-10"
            type="submit"
          >
            <IoMailOutline size={20} />
            Continue with Email
          </button>
        </form>
        <p className="text-left mt-10 text-gray-500 text-sm">
          By continuing you agree to our T&Cs. Please also check out our Privacy
          Policy. We use your data to offer you a personalised experience and to
          better understand and improve our services. For more information see
          here.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
