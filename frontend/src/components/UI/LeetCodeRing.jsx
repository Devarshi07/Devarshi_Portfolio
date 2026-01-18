export default function LeetCodeRing({ difficulty, count, total, color }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (count / total) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-800"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute text-center">
          <span className="block text-xs font-bold text-white">{count}</span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-wider mt-1 text-gray-400">
        {difficulty}
      </span>
    </div>
  );
}