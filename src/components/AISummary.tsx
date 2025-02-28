import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getAISummary } from '@/services/openrouter';
import { PoolData } from "@/components/PoolDataCard";

interface AISummaryProps {
  poolData: PoolData[];
}

export function AISummary({ poolData }: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const aiSummary = await getAISummary(poolData);
      setSummary(aiSummary);
    } catch (err) {
      setError('Failed to generate AI summary');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Market Analysis</CardTitle>
        <Button 
          onClick={generateSummary} 
          disabled={loading}
          variant="outline"
        >
          {loading ? 'Analyzing...' : 'Generate Analysis'}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {summary && (
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-2">AI Generated</Badge>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {summary}
            </div>
          </div>
        )}
        
        {!summary && !loading && !error && (
          <div className="text-center text-muted-foreground">
            Click generate to get AI analysis of the pool data
          </div>
        )}
      </CardContent>
    </Card>
  );
} 