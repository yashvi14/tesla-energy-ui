const ICONS = {
    MegapackXL: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="2" y="6" width="32" height="22" rx="3" fill="#1a6b3c" stroke="#2ecc71" strokeWidth="1.5" />
            <rect x="34" y="13" width="3" height="8" rx="1.5" fill="#2ecc71" />
            <rect x="6" y="10" width="6" height="14" rx="1" fill="#2ecc71" opacity="0.8" />
            <rect x="14" y="10" width="6" height="14" rx="1" fill="#2ecc71" opacity="0.8" />
            <rect x="22" y="10" width="6" height="14" rx="1" fill="#2ecc71" opacity="0.8" />
        </svg>
    ),
    Megapack2: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="2" y="7" width="30" height="20" rx="3" fill="#1565C0" stroke="#2196F3" strokeWidth="1.5" />
            <rect x="32" y="13" width="3" height="8" rx="1.5" fill="#2196F3" />
            <rect x="6" y="11" width="6" height="12" rx="1" fill="#2196F3" opacity="0.8" />
            <rect x="14" y="11" width="6" height="12" rx="1" fill="#2196F3" opacity="0.8" />
            <rect x="22" y="11" width="4" height="12" rx="1" fill="#2196F3" opacity="0.8" />
        </svg>
    ),
    Megapack: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="2" y="7" width="30" height="20" rx="3" fill="#6A1B9A" stroke="#9C27B0" strokeWidth="1.5" />
            <rect x="32" y="13" width="3" height="8" rx="1.5" fill="#9C27B0" />
            <rect x="6" y="11" width="7" height="12" rx="1" fill="#9C27B0" opacity="0.8" />
            <rect x="16" y="11" width="7" height="12" rx="1" fill="#9C27B0" opacity="0.8" />
        </svg>
    ),
    PowerPack: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="6" width="24" height="22" rx="3" fill="#E65100" stroke="#FF9800" strokeWidth="1.5" />
            <rect x="28" y="13" width="3" height="8" rx="1.5" fill="#FF9800" />
            <rect x="8" y="10" width="6" height="14" rx="1" fill="#FF9800" opacity="0.8" />
            <rect x="17" y="10" width="6" height="14" rx="1" fill="#FF9800" opacity="0.8" />
        </svg>
    ),
}

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
                        {ICONS[name]}
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