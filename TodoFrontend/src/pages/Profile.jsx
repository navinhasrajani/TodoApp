import { useState } from "react";
import moment from 'moment';
import axios from 'axios';
const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [profile, setprofile] = useState(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    const fetchProfile = async () => {
      try{
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          window.location.href = "/login";
          return;
        }
        const res = await axios.get("http://localhost:3000/profile",{
          headers: {Authorization: `Bearer ${token}`}
        })

        if (res.status === 200){
          console.log(res.data);
          setprofile(res.data);
        }
      }catch(err){
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [])
  if (loading) return <p className="text-center">Loading profile...</p>;
  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">{`User ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}</h1>

      {/* Tabs */}
      <div className="flex border-b dark:border-zinc-600 mb-6">
        {["info", "preferences", "stats"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-4 pb-2 border-b-2 transition-all ${
              activeTab === tab
                ? "border-yellow-400 text-yellow-400 font-semibold"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-yellow-300"
            }`}
          >
            {tab === "info" ? "Profile Info" : tab === "preferences" ? "Preferences" : "Statistics"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md">
        {activeTab === "info" && (
          <div>
            <p><strong>Name:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Joined:</strong> {moment(profile.joined).format("D MMM YYYY")}</p>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <span>Preferred Theme</span>
                <select className="bg-gray-100 dark:bg-zinc-700 p-1 rounded">
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </label>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span>Default priority</span>
                <select className="bg-gray-100 dark:bg-zinc-700 p-1 rounded">
                  <option>High</option>
                  <option selected>Medium</option>
                  <option>Low</option>
                </select>
              </label>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span>Allow editing completed todos</span>
                <input type="checkbox" className="toggle-checkbox" />
              </label>
            </div>
            <div>
              <label className="flex items-center justify-between">
                <span>Recieve deadlines reminders</span>
                <input type="checkbox" className="toggle-checkbox" />
              </label>
            </div>
            {/* Add other toggles/dropdowns similarly */}
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <p><strong>Total Todos:</strong> {profile.stats.total}</p>
            <p><strong>Completed:</strong> {profile.stats.completed}</p>
            <p><strong>Incomplete:</strong> {profile.stats.incomplete}</p>
            {/* Later: insert pie chart or progress bar */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
