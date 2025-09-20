import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    saveShippingAddress,
    savePaymentMethod,
} from "../../Redux/features/Cart/cartSlice";
import ProgressSteps from "@/components/ProgressSteps";

const Shipping = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode || ""
    );
    const [country, setCountry] = useState(shippingAddress.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    // Payment
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [navigate, shippingAddress]);

    const [focus, setFocus] = useState({
        address: false,
        city: false,
        postalCode: false,
        country: false
    });

    const getLabelClass = (field, value) =>
        focus[field] || value ? "label active" : "label";

    return (
        <div className="container mx-auto mt-10">
            <ProgressSteps step1 step2 />
            <div className="mt-[10rem] flex justify-around items-center flex-wrap">
                <form onSubmit={submitHandler} className="w-[40rem]">
                    <h1 className="text-3xl font-bold mb-6">Shipping Details</h1>
                    <div className="wave-group mb-8">
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onFocus={() => setFocus((prev) => ({ ...prev, address: true }))}
                            onBlur={() => setFocus((prev) => ({ ...prev, address: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("address", address)}>
                            {"Address".split("").map((char, index) => (
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
                    <div className="wave-group mb-8">
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onFocus={() => setFocus((prev) => ({ ...prev, city: true }))}
                            onBlur={() => setFocus((prev) => ({ ...prev, city: false }))}
                            className="input mt-1 p-1 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("city", city)}>
                            {"City".split("").map((char, index) => (
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
                    <div className="wave-group mb-8">
                        <input
                            type="text"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            onFocus={() => setFocus((prev) => ({ ...prev, postalCode: true }))}
                            onBlur={() => setFocus((prev) => ({ ...prev, postalCode: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("postalCode", postalCode)}>
                            {"Zip-code".split("").map((char, index) => (
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
                    <div className="wave-group mb-8">
                        <input
                            type="text"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            onFocus={() => setFocus((prev) => ({ ...prev, country: true }))}
                            onBlur={() => setFocus((prev) => ({ ...prev, country: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("country", country)}>
                            {"Country".split("").map((char, index) => (
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
                    <div className="mb-4">
                        <label className="block text-gray-400">Select Peyment Method</label>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === "PayPal"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />

                                <span className="ml-2">PayPal or Credit Card</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex justify-center gap-2 items-center mx-auto shadow-xl text-2xl bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group hover:bg-emerald-500"
                    >
                        Continue
                        <svg
                            className="w-8 h-8 justify-end bg-emerald-400 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                            viewBox="0 0 16 19"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                className="fill-gray-800 group-hover:fill-gray-800"
                            ></path>
                        </svg>
                    </button>


                </form>
            </div>
        </div>
    );
};

export default Shipping;