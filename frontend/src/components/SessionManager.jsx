import { useState, useEffect } from 'react'

const API = 'https://tesla-energy-backend.onrender.com'

export default function SessionManager({ quantities, setQuantities }) {
    const [sessions, setSessions] = useState({})
    const [sessionName, setSessionName] = useState('')
    const [message, setMessage] = useState('')

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${API}/sessions`)
            const data = await res.json()
            setSessions(data)
        } catch {
            setMessage('⚠️ Backend not connected')
        }
    }

    useEffect(() => { fetchSessions() }, [])

    const saveSession = async () => {
        if (!sessionName.trim()) return setMessage('Please enter a session name')
        await fetch(`${API}/sessions/${sessionName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quantities)
        })
        setMessage(`✅ Session "${sessionName}" saved!`)
        fetchSessions()
    }

    const loadSession = (name) => {
        setQuantities(sessions[name])
        setMessage(`📂 Loaded "${name}"`)
    }

    const deleteSession = async (name) => {
        await fetch(`${API}/sessions/${name}`, { method: 'DELETE' })
        setMessage(`🗑️ Deleted "${name}"`)
        fetchSessions()
    }

    return (
        <div className="card">
            <h2>💾 Sessions</h2>
            <div className="session-save">
                <input
                    type="text"
                    placeholder="Session name..."
                    value={sessionName}
                    onChange={e => setSessionName(e.target.value)}
                    className="session-input"
                />
                <button onClick={saveSession} className="btn-save">Save</button>
            </div>
            {message && <div className="session-msg">{message}</div>}
            {Object.keys(sessions).length > 0 && (
                <div className="session-list">
                    <strong>Saved Sessions:</strong>
                    {Object.keys(sessions).map(name => (
                        <div key={name} className="session-item">
                            <span>{name}</span>
                            <div>
                                <button onClick={() => loadSession(name)} className="btn-load">Load</button>
                                <button onClick={() => deleteSession(name)} className="btn-delete">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}