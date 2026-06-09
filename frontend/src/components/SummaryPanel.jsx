import jsPDF from 'jspdf'

export default function SummaryPanel({ totalCost, totalEnergy, totalArea, transformers, quantities, batteryData }) {

    const exportPDF = () => {
        const doc = new jsPDF()

        doc.setFontSize(20)
        doc.setTextColor(227, 25, 55)
        doc.text('Tesla Energy - Site Layout Report', 20, 20)

        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0)
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 32)

        doc.setFontSize(14)
        doc.setTextColor(50, 50, 50)
        doc.text('Site Summary', 20, 48)

        doc.setFontSize(12)
        doc.text(`Total Budget:     $${totalCost.toLocaleString()}`, 20, 60)
        doc.text(`Land Required:    ${totalArea.toLocaleString()} ft²`, 20, 72)
        doc.text(`Net Energy:       ${totalEnergy.toFixed(1)} MWh`, 20, 84)
        doc.text(`Transformers:     ${transformers} (auto-added)`, 20, 96)

        doc.setFontSize(14)
        doc.setTextColor(50, 50, 50)
        doc.text('Battery Configuration', 20, 114)

        doc.setFontSize(12)
        let y = 126
        Object.entries(quantities).forEach(([name, qty]) => {
            if (qty > 0) {
                const cost = qty * batteryData[name].cost
                doc.text(`${name}: ${qty} units  |  $${cost.toLocaleString()}  |  ${qty * batteryData[name].energy} MWh`, 20, y)
                y += 12
            }
        })

        doc.save('tesla-energy-site-report.pdf')
    }

    return (
        <div className="card summary">
            <div className="summary-header">
                <h2>📊 Site Summary</h2>
                <button className="btn-export" onClick={exportPDF}>⬇️ Export PDF</button>
            </div>
            <div className="summary-grid">
                <div className="summary-item">
                    <span className="summary-label">💰 Total Budget</span>
                    <span className="summary-value">${totalCost.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">📐 Land Required</span>
                    <span className="summary-value">{totalArea.toLocaleString()} ft²</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">⚡ Net Energy</span>
                    <span className="summary-value">{totalEnergy.toFixed(1)} MWh</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">🔌 Transformers</span>
                    <span className="summary-value">{transformers} (auto-added)</span>
                </div>
            </div>
        </div>
    )
}