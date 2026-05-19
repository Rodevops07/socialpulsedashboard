const RepoCard = ({ repo }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-black hover:shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">{repo.name}</h3>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
          {repo.language || 'Plain Text'}
        </span>
      </div>
      <div className="mt-4 flex gap-4 text-sm text-gray-500">
        <span>⭐ {repo.stars} Stars</span>
        <span>🍴 {repo.forks} Forks</span>
      </div>
      <a 
        href={repo.url} 
        target="_blank" 
        className="mt-4 block text-center text-blue-600 hover:underline text-sm font-medium"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default RepoCard;