# DeFi Analytics Platform with AI Insights

A modern DeFi analytics dashboard that combines real-time liquidity pool data with AI-powered market analysis. Built with Next.js, Shadcn UI, and OpenRouter AI integration.

## 🌟 Features

### 1. Liquidity Pool Analytics
- Real-time tracking of top liquidity pools
- Comprehensive pool metrics including:
  - Total Value Locked (TVL)
  - Trading Volume
  - Fee Tiers
  - Token Pair Information
- Multiple view options (Grid/List) for better data visualization

### 2. AI-Powered Market Analysis
- Integration with OpenRouter AI for intelligent market insights
- Real-time analysis of:
  - Market trends
  - Trading patterns
  - Token pair performance
  - Volume analysis
- Custom AI prompts optimized for DeFi data interpretation

### 3. Task Execution System
- Dedicated task execution and validation pipeline
- Proof-of-task verification system
- Real-time execution status monitoring
- Validation service integration

## 🚀 Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
# Create .env.local file and add:
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

4. Run the development server
```bash
yarn dev
```

## 📡 API Endpoints

### Pool Data API

1. Get Top Pools
```http
GET /api/pools
```

2. Get Pools with Parameters
```http
GET /api/pools?limit=20&minVolume=1000
```
Parameters:
- `limit`: Number of pools to return (default: 10)
- `minVolume`: Minimum volume in USD (default: 0)

3. Get Specific Pool
```http
GET /api/pools/{poolId}
```

### Task Execution API

1. Execute Task
```http
POST /task/execute
```

2. Validate Task
```http
POST /task/validate
```

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: Shadcn UI
- **AI Integration**: OpenRouter AI
- **Data Fetching**: Axios
- **Styling**: Tailwind CSS

## 🔒 Security Considerations

- API key protection using environment variables
- Error handling for API failures
- Rate limiting for API requests
- Validation of input data

## 🔄 Real-time Updates

The platform automatically refreshes data every 30 seconds to ensure up-to-date information about:
- Pool liquidity
- Trading volumes
- Token prices
- Market trends

## 🎯 Project Goals

1. Provide real-time DeFi market analytics
2. Offer AI-powered insights for better decision making
3. Implement secure task execution and validation
4. Create an intuitive user interface for data visualization

## 📝 Future Enhancements

- [ ] Additional AI models integration
- [ ] Advanced filtering options
- [ ] Historical data analysis
- [ ] Custom alert system
- [ ] Portfolio tracking features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT License](LICENSE)
