import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LabelList,
  } from "recharts";
  
  export default function BarChartComponent({ data }) {
    return (
      <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1">
              <LabelList dataKey="total" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  