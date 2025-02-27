"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Token {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
}

interface PoolData {
  id: string;
  token0: Token;
  token1: Token;
  feeTier: string;
  liquidity: string;
  sqrtPrice: string;
  tick: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
}

export function PoolDataCard() {
  const [poolsData, setPoolsData] = useState<PoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getPoolsData() {
    try {
      const response = await fetch('/api/pools?limit=10&minVolume=0', {
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      setPoolsData(result.data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch pools data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPoolsData();
    const interval = setInterval(getPoolsData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl mx-auto">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(6)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Top Liquidity Pools</h1>
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {poolsData.map((pool) => (
              <Card key={pool.id} className="w-full">
                <CardHeader>
                  <CardTitle>
                    {pool.token0.symbol}/{pool.token1.symbol}
                  </CardTitle>
                  <CardDescription>Pool #{pool.id.slice(0, 6)}...</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Pool Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Fee Tier:</span>
                      <span>{(Number(pool.feeTier) / 10000).toFixed(2)}%</span>
                      
                      <span className="text-muted-foreground">TVL:</span>
                      <span>${Number(pool.totalValueLockedUSD).toLocaleString()}</span>
                      
                      <span className="text-muted-foreground">Volume:</span>
                      <span>${Number(pool.volumeUSD).toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Token Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm">{pool.token0.symbol}</h4>
                        <p className="text-xs text-muted-foreground truncate" title={pool.token0.name}>
                          {pool.token0.name}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{pool.token1.symbol}</h4>
                        <p className="text-xs text-muted-foreground truncate" title={pool.token1.name}>
                          {pool.token1.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {poolsData.map((pool) => (
                  <div key={pool.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {pool.token0.symbol}/{pool.token1.symbol}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Fee: {(Number(pool.feeTier) / 10000).toFixed(2)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${Number(pool.totalValueLockedUSD).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">TVL</p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 