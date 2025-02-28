import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PoolSummaryProps {
  totalPools: number;
  totalTVL: number;
  totalVolume: number;
}

export function PoolSummary({ totalPools, totalTVL, totalVolume }: PoolSummaryProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pool Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Total Pools: {totalPools}</p>
          <p>Total TVL: ${totalTVL.toLocaleString()}</p>
          <p>Total Volume: ${totalVolume.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
} 