export default function SiteLayout({ quantities, batteryData, transformers }) {
    const MAX_WIDTH = 100
    const MAX_BLOCKS_DISPLAY = 200

    const blocks = []

    Object.entries(quantities).forEach(([name, qty]) => {
        for (let i = 0; i < qty; i++) {
            blocks.push({ type: name, color: batteryData[name].color, width: batteryData[name].width, depth: batteryData[name].depth })
        }
    })

    for (let i = 0; i < transformers; i++) {
        blocks.push({ type: 'Transformer', color: '#607D8B', width: 10, depth: 10 })
    }

    const totalBlocks = blocks.length
    const displayBlocks = blocks.slice(0, MAX_BLOCKS_DISPLAY)
    const isTruncated = totalBlocks > MAX_BLOCKS_DISPLAY

    const rows = []
    let currentRow = []
    let currentWidth = 0

    displayBlocks.forEach(block => {
        if (currentWidth + block.width > MAX_WIDTH) {
            rows.push(currentRow)
            currentRow = [block]
            currentWidth = block.width
        } else {
            currentRow.push(block)
            currentWidth += block.width
        }
    })
    if (currentRow.length > 0) rows.push(currentRow)

    if (blocks.length === 0) {
        return (
            <div className="card">
                <h2>🗺️ Site Layout</h2>
                <div className="empty-layout">Add batteries to see the site layout</div>
            </div>
        )
    }

    return (
        <div className="card">
            <h2>🗺️ Site Layout <span className="layout-note">(max 100ft wide)</span></h2>
            <div className="layout-container">
                {rows.map((row, rowIdx) => (
                    <div key={rowIdx} className="layout-row">
                        {row.map((block, blockIdx) => (
                            <div
                                key={blockIdx}
                                className="layout-block"
                                style={{
                                    backgroundColor: block.color,
                                    width: `${block.width}%`,
                                    minHeight: `${block.depth * 4}px`,
                                }}
                                title={`${block.type} (${block.width}ft × ${block.depth}ft)`}
                            >
                                <span className="block-label">{block.type === 'Transformer' ? '🔌' : '🔋'}</span>
                                <span className="block-name">{block.type}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="layout-legend">
                {Object.entries(batteryData).map(([name, data]) => (
                    <span key={name} className="legend-item">
                        <span className="legend-dot" style={{ background: data.color }} />{name}
                    </span>
                ))}
                <span className="legend-item">
                    <span className="legend-dot" style={{ background: '#607D8B' }} />Transformer
                </span>
            </div>
        </div>
    )
}