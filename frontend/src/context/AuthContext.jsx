import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axiosInstance.js'
import { setAccessToken } from '../api/tokenStore.js'
import { getErrorMessage } from '../utils/errorHandler.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // ─── Silent auth on page load ─────────────────────────────────────────────
    // runs once when the app first mounts
    // tries to get a new access token using the httpOnly cookie
    // if it works — user is still logged in, fetch their profile
    // if it fails — cookie is expired or missing, user needs to log in

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const refreshResponse = await api.post('/refresh')
                const newToken = refreshResponse.data.data.accessToken
                setAccessToken(newToken)

                // now fetch the user's profile with the new token
                const meResponse = await api.get('/me')
                setUser(meResponse.data.data)
            } catch {
                // refresh failed — no active session, that's fine
                setUser(null)
                setAccessToken(null)
            } finally {
                // whether it worked or not, we now know the auth state
                setIsLoading(false)
            }
        }

        restoreSession()
    }, [])

    // ─── Login ────────────────────────────────────────────────────────────────
    // called by the login page after a successful POST /login
    // receives the data from the login response and stores it

    const login = (accessToken, userData) => {
        setAccessToken(accessToken)
        setUser(userData)
    }

    // ─── Logout ───────────────────────────────────────────────────────────────

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch {
            // even if the backend call fails, clear the frontend state
            // the user should always be able to log out locally
        } finally {
            setAccessToken(null)
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return context
}