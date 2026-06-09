import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function CostChart({ quantities, batteryData, transformers }) {
    const data = Object.entries(quantities)
        .filter(([, qty]) => qty > 0)
        .map(([name, qty]) => ({
            name,
            cost: qty * batteryData[name].cost,
            color: batteryData[name].color,
        }))

    if (transformers > 0) {
        data.push({ name: 'Transformer', cost: transformers * 10000, color: '#607D8B' })
    }

    if (data.length === 0) {
        return null
    }

    return (
        <div className="card">
            <h2>📈 Cost Breakdown</h2>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: '#aaa', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#aaa', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
                        contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8 }}
                        labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}