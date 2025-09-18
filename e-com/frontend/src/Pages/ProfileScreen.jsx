import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // redirect if not logged in
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null; // avoid rendering before redirect

  return (
    <main className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Profile
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium">{userInfo.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{userInfo.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="text-lg font-medium">
            {userInfo.isAdmin ? "Admin" : "User"}
          </p>
        </div>
      </div>
      <button
      onClick={() => navigate("/")}
      className="mt-5 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
    >
      ← Back to Home
    </button>
    </main>
    
  );
};

export default ProfileScreen;
