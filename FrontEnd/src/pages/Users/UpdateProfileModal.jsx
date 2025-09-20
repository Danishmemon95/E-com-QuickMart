import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const UpdateProfileModal = ({ isOpen, onClose, userInfo, updateProfile, dispatch, setCredentials }) => {
    const [username, setUserName] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [focus, setFocus] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const getLabelClass = (field, value) =>
        `label ${focus[field] || value ? "active" : ""}`;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await updateProfile({
                _id: userInfo._id,
                username,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
            onClose();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/25">
            <div className="shadow-[0_15px_25px_rgba(0,0,0,0.6)] bg-white flex flex-col items-center justify-center h-[35rem] w-[36rem] rounded-md relative">
                <button
                    className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    ×
                </button>

                <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>

                <form onSubmit={submitHandler} className="container w-[32rem]">
                    {/* Username */}
                    <div className="wave-group mb-5">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            onFocus={() => setFocus((f) => ({ ...f, username: true }))}
                            onBlur={() => setFocus((f) => ({ ...f, username: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("username", username)}>
                            {"Name".split("").map((char, index) => (
                                <span key={index} className="label-char" style={{ "--index": index }}>
                                    {char}
                                </span>
                            ))}
                        </label>
                    </div>

                    {/* Email */}
                    <div className="wave-group mb-5">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocus((f) => ({ ...f, email: true }))}
                            onBlur={() => setFocus((f) => ({ ...f, email: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("email", email)}>
                            {"Email".split("").map((char, index) => (
                                <span key={index} className="label-char" style={{ "--index": index }}>
                                    {char}
                                </span>
                            ))}
                        </label>
                    </div>

                    {/* Password */}
                    <div className="wave-group mb-5">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocus((f) => ({ ...f, password: true }))}
                            onBlur={() => setFocus((f) => ({ ...f, password: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("password", password)}>
                            {"Password".split("").map((char, index) => (
                                <span key={index} className="label-char" style={{ "--index": index }}>
                                    {char}
                                </span>
                            ))}
                        </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="wave-group mb-5">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setFocus((f) => ({ ...f, confirmPassword: true }))}
                            onBlur={() => setFocus((f) => ({ ...f, confirmPassword: false }))}
                            className="input mt-1 p-2 border w-full"
                        />
                        <span className="bar"></span>
                        <label className={getLabelClass("confirmPassword", confirmPassword)}>
                            {"ConfirmPassword".split("").map((char, index) => (
                                <span key={index} className="label-char" style={{ "--index": index }}>
                                    {char}
                                </span>
                            ))}
                        </label>
                    </div>

                    <button
                        className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group mt-5 mb-5 left-[37%]"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        <span className="relative text-base font-semibold">
                            {isSubmitting ? "Updating..." : "Update"}
                        </span>
                    </button>

                    {isSubmitting && <Loader />}
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
