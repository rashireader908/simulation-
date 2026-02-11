# simnace

A local-only financial decision simulator that runs entirely on your device. No login, no bank connections, no backend—just you and your financial scenarios.

## Features

- **Local-only**: All data stays on your device. No external APIs or servers.
- **Scenario Comparison**: Create multiple scenarios and compare them side-by-side.
- **Cash Flow Simulation**: See how your financial decisions impact your cash buffer over 1-6 months.
- **Bills & Subscriptions Management**: Track fixed bills and subscriptions with flexible cancellation/pause options.
- **Visual Analytics**: Interactive charts showing daily cash balance trends.
- **Export/Import**: Backup and restore your data as JSON.

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Recharts** for data visualization
- **Vitest** for unit testing
- **localStorage** for data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started

1. **Set Up Inputs**: Navigate to the Inputs page and enter your:
   - Monthly income
   - Starting cash buffer
   - Monthly flexible spending
   - Simulation period (1-6 months)

2. **Add Bills**: Go to Manage Bills and add your fixed monthly bills with their due dates (days 1-28).

3. **Add Subscriptions**: Go to Manage Subscriptions and add recurring subscriptions. You can:
   - Cancel subscriptions (stops charging next month)
   - Pause subscriptions for specific months

4. **Run Simulation**: Click "Run Simulation" from the dashboard to see results.

5. **Compare Scenarios**: Create new scenarios by duplicating your baseline and making changes. Compare results side-by-side.

### Simulation Model

The simulator uses a deterministic, day-by-day cash flow model:

- **Income**: Added on day 1 of each month
- **Bills**: Subtracted on their specified due day (1-28)
- **Subscriptions**: Subtracted on their charge day (1-28), unless cancelled or paused
- **Flexible Spending**: Spread evenly across the month (daily amount = monthly total / 30)

**Metrics Calculated:**
- Daily cash balance across the simulation period
- Minimum balance and the day it occurred
- Number of days with negative balances
- Months with any negative days ("tight months")
- Ending balance
- Rule-based insights

### Data Management

- **Export**: Download your data as a JSON file from the Results page
- **Import**: Restore data from a previously exported JSON file
- **Clear All Data**: Remove all local data (cannot be undone)

## Privacy

This application runs entirely in your browser. All data is stored locally using localStorage. No data is sent to any external servers. You can verify this by checking the Network tab in your browser's developer tools.

## Testing

Run unit tests for the simulation engine:

```bash
npm test
```

## Development

The project structure:

```
money-sandbox/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature components
├── lib/                   # Core logic
│   ├── simulation.ts      # Cash flow simulation engine
│   ├── storage.ts         # localStorage wrapper
│   └── types.ts           # TypeScript definitions
├── store/                 # Zustand state management
└── __tests__/             # Unit tests
```

## Disclaimer

This is a simulator, not financial advice. Approximate inputs produce approximate outputs. The simulation model is simplified and does not account for all real-world financial complexities. Use this tool for planning and decision-making support, not as a substitute for professional financial advice.

## License

MIT
