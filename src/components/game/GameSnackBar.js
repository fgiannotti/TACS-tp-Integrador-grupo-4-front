import React, {createContext} from 'react'

export const SnackBarContext = createContext()

export function SnackBarProvider({ children }) {
    const [alerts, setAlerts] = useState([])

    return (
        <SnackBarContext.Provider value={{ setAlerts }}>
            {children}
            {alerts.map((alert) => <SnackBar key={alert}>{alert}</SnackBar>)}
        </SnackBarContext.Provider>
    )
}