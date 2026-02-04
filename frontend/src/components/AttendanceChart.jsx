import * as recharts from "recharts";

// Example attendance data
// const present = 18;
// const total = 20;



// Aesthetic colors
const COLORS = ["#6EE7B7", "#FCA5A5"]; // Pastel green / pastel red

export default function AttendanceChart(props) {
  const percentage = ((props.present / props.total) * 100).toFixed(1);
const data = [
  { name: "Present", value: props.present },
  { name: "Absent", value: props.total - props.present },
];
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
