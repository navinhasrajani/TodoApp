import React from "react";

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>

      {/* Section: Basic Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p>
          <strong>Name:</strong> Naveen
        </p>
        <p>
          <strong>Email:</strong> naveen@email.com
        </p>
        <p>
          <strong>Joined:</strong> July 2025
        </p>
      </div>

      {/* Section: Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* <Stat label="Total Todos" value={42} />
        <Stat label="Completed" value={17} />
        <Stat label="Pending" value={25} /> */}
      </div>

      {/* Section: Actions */}
      <div className="flex flex-col gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Change Password
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
