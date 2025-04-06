"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function SettingsPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(true);
  const [user, setUser] = useState(null);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail) {
        try {
          const response = await axios.post("http://localhost:5000/auth/find/Profile/", {
            email: userEmail,
          });
          if (response.data) {
            setUser(response.data);
          } else {
            console.log("Error in fetching user");
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchUserData();
  }, [userEmail]);

  const togglePrivacy = () => {
    setShowPrivacy(!showPrivacy);
  };

  const handleChange = async (e, field) => {
    const value = e.target.value;
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.patch("http://localhost:5000/api/update-settings", {
        email: userEmail,
        field,
        value,
      });

      if (response?.data) {
        setSuccessMessage(response.data?.message);
        setUser((prev) => ({ ...prev, [field]: value })); // আপডেট লোকাল ইউজার ডেটা
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to update settings.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      setErrorMessage("An error occurred while updating settings.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col py-10 min-h-screen items-center bg-gray-100 px-4">
      <h3 className="text-2xl font-semibold mb-6">Settings</h3>

      <div className="bg-white shadow-2xl rounded-lg w-full max-w-lg p-8">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={togglePrivacy}
        >
          <h2 className="text-lg font-semibold">Privacy</h2>
          {showPrivacy ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {showPrivacy && (
          <div className="space-y-6">
            {/* Profile Photo Visibility */}
            <div className="flex flex-col">
              <label htmlFor="profilePhotoVisibility" className="mb-1 font-medium">
                Profile Photo
              </label>
              <select
                id="profilePhotoVisibility"
                className="border border-gray-300 rounded px-3 py-2"
                value={user?.profilePhotoVisibility || ""}
                onChange={(e) => handleChange(e, "profilePhotoVisibility")}
              >
                <option value="everyone">Everyone</option>
                <option value="friends">Only Friends</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>

            {/* Last Seen */}
            <div className="flex flex-col">
              <label htmlFor="lastSeen" className="mb-1 font-medium">
                Last Seen
              </label>
              <select
                id="lastSeen"
                className="border border-gray-300 rounded px-3 py-2"
                value={user?.lastSeen || ""}
                onChange={(e) => handleChange(e, "lastSeen")}
              >
                <option value="yes">Show</option>
                <option value="no">Don't Show</option>
              </select>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="mb-1 font-medium">
                Status
              </label>
              <select
                id="status"
                className="border border-gray-300 rounded px-3 py-2"
                value={user?.status || ""}
                onChange={(e) => handleChange(e, "status")}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            {/* Feedback Messages */}
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
          </div>
        )}
      </div>

      
    </div>
  );
}
