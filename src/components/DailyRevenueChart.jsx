import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  export default function DailyRevenueChart({ data }) {
    return (
      <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Revenue €"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  