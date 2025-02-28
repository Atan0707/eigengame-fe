import { PoolDataCard } from "@/components/PoolDataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto space-y-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pool API Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Get Top Pools</h3>
                <pre className="bg-gray-100 p-3 rounded">GET /api/pools</pre>
              </div>

              <div>
                <h3 className="font-medium mb-2">With Query Parameters</h3>
                <pre className="bg-gray-100 p-3 rounded">GET /api/pools?limit=20&minVolume=1000</pre>
                <p className="text-sm text-muted-foreground mt-2">
                  Parameters:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>limit: Number of pools to return (default: 10)</li>
                  <li>minVolume: Minimum volume in USD (default: 0)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Get Specific Pool</h3>
                <pre className="bg-gray-100 p-3 rounded">GET /api/pools/0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35</pre>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <PoolDataCard />
      </div>
    </main>
  );
} 