import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const token = await getAccessTokenSilently();
    const response = await axios.get(`http://localhost:5000/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserInfo(response.data);
   
  }

  return (
    <span>
      {isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <img
              src={userInfo.picture}
              alt={userInfo.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {userInfo.name}
            </h2>
            <p className="text-gray-600 mb-4">Email: {userInfo.email}</p>
            <p className="text-gray-600 mb-4">Nick Name: {userInfo.nickname}</p>
           
             
          </div>
        </div>
      ) : (
        <div>please authenticated</div>
      )}
    </span>
  );
};

export default Profile;
