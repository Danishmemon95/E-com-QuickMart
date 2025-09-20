import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../Redux/api/userApiSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully Logged In");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Logging In failed");
    }
  };

  const getLabelClass = (field, value) =>
    focus[field] || value ? "label active" : "label";

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <section className="w-[35rem] h-[27rem] flex flex-col justify-between items-center shadow-[0_15px_25px_rgba(0,0,0,0.6)] px-[3rem] py-[2.5rem] rounded-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-5">Log In</h1>
        </div>

        <form onSubmit={submitHandler} className="container w-[25rem]">
          {/* Email */}
          <div className="wave-group mb-5">
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
          <div className="wave-group mb-3">
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

          {/* Submit Button */}
          <button
            className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group mt-5 mb-5 left-[35%]"
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

        <div className="mt-2 text-lg">
          <p>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
