'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Test = () => {
    // Define the type for our pool data
    interface PoolData {
        feeTier: string
        id: string
        liquidity: string
        sqrtPrice: string
        tick: string
        token0: {
            decimals: string
            id: string
            name: string
            symbol: string
        }
        // Add other fields as needed
    }

    const [poolData, setPoolData] = useState<PoolData[]>([])

    function fetchPoolData() {
        axios.get('http://localhost:3000/api/pools')
            .then(response => {
                // response.data contains: { success: true, data: [...pools] }
                setPoolData(response.data.data)
                console.log(response.data.data)
                // Log the first pool's volumeUSD if it exists
                if (response.data.data.length > 0) {
                    console.log('Volume USD:', response.data.data[0].volumeUSD)
                }
            })
            .catch(error => console.error('Error fetching pool data:', error))
    }

    // Optional: Display the data in the UI
    return (
        <div>
            <h1>Test</h1>
            <button onClick={fetchPoolData}>Fetch Pool Data</button>
            
            {/* Display pool data if it exists */}
            {/* {poolData.map((pool) => (
                <div key={pool.id} className="p-4 border rounded mt-4">
                    <h2>Pool ID: {pool.id}</h2>
                    <p>Fee Tier: {pool.feeTier}</p>
                    <p>Token: {pool.token0.name} ({pool.token0.symbol})</p>
                    <p>Liquidity: {pool.liquidity}</p>
                </div>
            ))} */}
        </div>
    )
}

export default Test