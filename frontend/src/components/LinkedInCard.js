const LinkedInCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col items-center p-6 transition-all hover:border-blue-500">
      <img 
        className="h-24 w-24 rounded-full border-4 border-blue-50 shadow-sm" 
        src={profile.profilePic} 
        alt="Profile" 
      />
      <h2 className="mt-4 text-xl font-bold text-gray-900">{profile.fullName}</h2>
      <p className="text-sm text-blue-600 font-medium text-center px-2">{profile.headline}</p>
      
      <div className="mt-6 w-full flex justify-around border-t pt-4 border-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Connections</p>
          <p className="text-lg font-bold text-gray-800">{profile.connections}+</p>
        </div>
        <div className="text-center border-l pl-4 border-gray-50">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
          <p className="text-lg font-bold text-gray-800">{profile.location}</p>
        </div>
      </div>
    </div>
  );
};