import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LeaveCard({ totalLeaves = 24, usedLeaves = 5 }) {
  const remaining = totalLeaves - usedLeaves;

  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Leaves Remaining</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">{remaining}</p>
        <p className="text-sm text-gray-500">
          Used: {usedLeaves} / Total: {totalLeaves}
        </p>
      </CardContent>
      <CardFooter>
        <Link to="/leaves" className="text-blue-500 hover:underline m-auto">
          View Leave Details
        </Link>
      </CardFooter>
    </Card>
  );
}
