import { useState } from 'react'
import BatteryForm from './components/BatteryForm'
import SummaryPanel from './components/SummaryPanel'
import SiteLayout from './components/SiteLayout'
import SessionManager from './components/SessionManager'
import CostChart from './components/CostChart'
import './App.css'

const BATTERY_DATA = {
  MegapackXL: { width: 40, depth: 10, energy: 4, cost: 120000, color: '#1a6b3c' },
  Megapack2: { width: 30, depth: 10, energy: 3, cost: 80000, color: '#2196F3' },
  Megapack: { width: 30, depth: 10, energy: 2, cost: 50000, color: '#9C27B0' },
  PowerPack: { width: 10, depth: 10, energy: 1, cost: 10000, color: '#FF9800' },
}

const DEFAULT_QUANTITIES = {
  MegapackXL: 0,
  Megapack2: 0,
  Megapack: 0,
  PowerPack: 0,
}

export default function App() {
  const [quantities, setQuantities] = useState(DEFAULT_QUANTITIES)

  const totalBatteries = Object.values(quantities).reduce((a, b) => a + b, 0)
  const transformers = Math.floor(totalBatteries / 2)

  const totalCost = Object.entries(quantities).reduce((sum, [name, qty]) => {
    return sum + qty * BATTERY_DATA[name].cost
  }, 0) + transformers * 10000

  const totalEnergy = Object.entries(quantities).reduce((sum, [name, qty]) => {
    return sum + qty * BATTERY_DATA[name].energy
  }, 0) - transformers * 0.5

  const totalArea = Object.entries(quantities).reduce((sum, [name, qty]) => {
    const b = BATTERY_DATA[name]
    return sum + qty * b.width * b.depth
  }, 0) + transformers * 100

  const handleReset = () => setQuantities(DEFAULT_QUANTITIES)

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚡ Tesla Energy Service Engineering</h1>
        <button className="btn-reset" onClick={handleReset}>🔄 Reset All</button>
      </header>
      <div className="app-body">
        <div className="left-panel">
          <SessionManager quantities={quantities} setQuantities={setQuantities} />
          <BatteryForm quantities={quantities} setQuantities={setQuantities} batteryData={BATTERY_DATA} />
        </div>
        <div className="right-panel">
          <SummaryPanel
            totalCost={totalCost}
            totalEnergy={totalEnergy}
            totalArea={totalArea}
            transformers={transformers}
            quantities={quantities}
            batteryData={BATTERY_DATA}
          />
          <CostChart quantities={quantities} batteryData={BATTERY_DATA} transformers={transformers} />
          <SiteLayout quantities={quantities} batteryData={BATTERY_DATA} transformers={transformers} />
        </div>
      </div>
    </div>
  )
}