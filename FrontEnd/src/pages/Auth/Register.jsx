import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { setCredentials } from "../../Redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../Redux/api/userApiSlice";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focus, setFocus] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || "Registration failed");
      }
    }
  };

  const getLabelClass = (field, value) =>
    focus[field] || value ? "label active" : "label";

  return (
    <section className="flex justify-center items-center h-[100vh]">
      <div className="shadow-[0_15px_25px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center h-[32rem] w-[35rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="container w-[32rem]">
          {/* Username */}
          <div className="wave-group mb-5">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, username: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, username: false }))}
              className="input mt-1 p-2 border w-full"
            />
            <span className="bar"></span>
            <label className={getLabelClass("username", username)}>
              {"Name".split("").map((char, index) => (
                <span
                  key={index}
                  className="label-char"
                  style={{ "--index": index }}
                >
                  {char}
                </span>
              ))}
            </label>
          </div>

          {/* Email */}
          <div className="wave-group mb-5 mt-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, email: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, email: false }))}
              className="input mt-1 p-2 border w-full"
            />
            <span className="bar"></span>
            <label className={getLabelClass("email", email)}>
              {"Email".split("").map((char, index) => (
                <span
                  key={index}
                  className="label-char"
                  style={{ "--index": index }}
                >
                  {char}
                </span>
              ))}
            </label>
          </div>

          {/* Password */}
          <div className="wave-group mb-5 mt-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
              className="input mt-1 p-2 border w-full"
            />
            <span className="bar"></span>
            <label className={getLabelClass("password", password)}>
              {"Password".split("").map((char, index) => (
                <span
                  key={index}
                  className="label-char"
                  style={{ "--index": index }}
                >
                  {char}
                </span>
              ))}
            </label>
          </div>

          {/* Confirm Password */}
          <div className="wave-group mb-5 mt-2">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() =>
                setFocus((prev) => ({ ...prev, confirmPassword: true }))
              }
              onBlur={() =>
                setFocus((prev) => ({ ...prev, confirmPassword: false }))
              }
              className="input mt-1 p-2 border w-full"
            />
            <span className="bar"></span>
            <label
              className={getLabelClass("confirmPassword", confirmPassword)}
            >
              {"ConfirmPassword".split("").map((char, index) => (
                <span
                  key={index}
                  className="label-char"
                  style={{ "--index": index }}
                >
                  {char}
                </span>
              ))}
            </label>
          </div>

          <button
            className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group mt-5 mb-5 left-[37%]"
            disabled={isLoading}
            type="submit"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-800 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="absolute bottom-0 left-0 h-full -ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-full opacity-100 object-stretch"
                viewBox="0 0 487 487"
              >
                <path
                  fillOpacity=".1"
                  fillRule="nonzero"
                  fill="#FFF"
                  d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                />
              </svg>
            </span>
            <span className="absolute top-0 right-0 w-12 h-full -mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="object-cover w-full h-full"
                viewBox="0 0 487 487"
              >
                <path
                  fillOpacity=".1"
                  fillRule="nonzero"
                  fill="#FFF"
                  d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                />
              </svg>
            </span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"></span>
            <span className="relative text-base font-semibold">
              {isLoading ? "Signing In..." : "Sign In"}
            </span>
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4 text-lg">
          <p>
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
