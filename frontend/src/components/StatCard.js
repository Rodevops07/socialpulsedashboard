const StatCard = ({ platform, count, rate, color }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg bg-white border-t-4 ${color} transition-transform hover:scale-105`}>
      <h3 className="text-gray-500 font-bold uppercase text-sm">{platform}</h3>
      <p className="text-3xl font-extrabold my-2">{count.toLocaleString()}</p>
      <span className="text-green-500 font-medium">↑ {rate} Engagement</span>
    </div>
  );
};

export default StatCard;