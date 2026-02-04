import * as recharts from "recharts";

// Example attendance data
const present = 18;
const total = 20;

const data = [
  { name: "Present", value: present },
  { name: "Absent", value: total - present },
];

// Aesthetic colors
const COLORS = ["#6EE7B7", "#FCA5A5"]; // Pastel green / pastel red

export default function AttendanceChart() {
  const percentage = ((present / total) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center">
      {/* Card can wrap the chart elsewhere */}
      <div className="text-center mb-2">
        <p className="text-lg font-bold">Attendance: {percentage}%</p>
      </div>

      <recharts.PieChart
        width={250}
        height={250}
      >
        <recharts.Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <recharts.Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </recharts.Pie>
        <recharts.Tooltip />
        <recharts.Legend />
      </recharts.PieChart>
    </div>
  );
}
