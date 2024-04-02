import React from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { IoMailOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await axios.post("http://localhost:5000/api/auth/google", {
        token: tokenResponse.access_token,
      });
      toast.success("Logged in with Google");
    },
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="mt-20 my-10 items-center justify-center flex">
      {isLoading ? (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="max-w-sm w-full my-5 text-center">
          <div className="flex justify-between items-center">
            <div className="text-text font-bold text-2xl my-10 text-left">
              Sign in to your account
            </div>
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
                    type="email"
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
              {errors.password && (
                <p className="text-xs text-red-600 text-left mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
            <button
              className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center gap-2 mt-10"
              type="submit"
            >
              <IoMailOutline size={20} />
              Sign in with Email
            </button>
          </form>
          <p className="text-left mt-10 text-gray-500 text-sm">
            By continuing you agree to our T&Cs. Please also check out our
            Privacy Policy. We use your data to offer you a personalised
            experience and to better understand and improve our services. For
            more information see here.
          </p>
        </div>
      )}
    </div>
  );
}
export default Login;
