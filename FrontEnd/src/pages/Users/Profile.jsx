import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setCredentials } from "@/Redux/features/auth/authSlice";
import { useProfileMutation } from "@/Redux/api/userApiSlice";
import UpdateProfileModal from "./UpdateProfileModal";
import UserOrder from "./UserOrder";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const [updateProfile] = useProfileMutation();
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4 mt-[2rem]">
      <div className="flex flex-col">
        <div>
          <h2 className="text-3xl font-semibold mb-6">My Profile</h2>
          <p className="mb-2"><strong>Name:</strong> {userInfo.username}</p>
          <p className="mb-4"><strong>Email:</strong> {userInfo.email}</p>
        </div>

        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Update Profile
          </button>

        </div>
        <div className="mt-[3rem]">
          <UserOrder />
        </div>
      </div>

      <UpdateProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userInfo={userInfo}
        updateProfile={updateProfile}
        dispatch={dispatch}
        setCredentials={setCredentials}
      />
    </div>
  );
};

export default Profile;
