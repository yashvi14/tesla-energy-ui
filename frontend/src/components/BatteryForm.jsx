export default function BatteryForm({ quantities, setQuantities, batteryData }) {
    const handleChange = (name, value) => {
        const num = Math.min(999, Math.max(0, parseInt(value) || 0))
        setQuantities(prev => ({ ...prev, [name]: num }))
    }

    const specs = {
        MegapackXL: { released: 2022 },
        Megapack2: { released: 2021 },
        Megapack: { released: 2005 },
        PowerPack: { released: 2000 },
    }

    return (
        <div className="card">
            <h2>🔋 Configure Batteries</h2>
            {Object.entries(batteryData).map(([name, data]) => (
                <div key={name} className="battery-row">
                    <div className="battery-info">
                        <span className="battery-dot" style={{ background: data.color }} />
                        <div>
                            <strong>{name}</strong>
                            <div className="battery-meta">
                                {data.width}ft × {data.depth}ft &nbsp;|&nbsp;
                                {data.energy} MWh &nbsp;|&nbsp;
                                ${data.cost.toLocaleString()} &nbsp;|&nbsp;
                                Released {specs[name].released}
                            </div>
                        </div>
                    </div>
                    <input
                        type="number"
                        min="0"
                        max="999"
                        value={quantities[name]}
                        onChange={e => handleChange(name, e.target.value)}
                        className="qty-input"
                    />
                </div>
            ))}
            <p className="max-note">* Max 999 units per battery type</p>
        </div>
    )
}