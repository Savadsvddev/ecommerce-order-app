export default function MyProfile() {
  const user = {
    name: "ABC Trading Company",
    email: "abc@example.com",
    address: "Riyadh, KSA",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-[#7a1c35]">My Profile</h2>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-white p-6 rounded-lg shadow-md">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={"https://cdn.vectorstock.com/i/500p/23/78/shopping-bag-icon-vector-27812378.jpg"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.address}</p>
        </div>
      </div>
    </div>
  );
}
