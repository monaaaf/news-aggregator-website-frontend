/* eslint-disable react-refresh/only-export-components */
import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {AuthModel} from "../models/Auth.ts";
import {User} from "../models/User.ts";
import * as authHelper from '../helpers/AuthHelpers.ts'
import {WithChildren} from "../models/General.ts";
import {getUserByToken} from "../requests/Auth.ts";

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: User | undefined
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>
    logout: () => void
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => {
    },
    currentUser: undefined,
    setCurrentUser: () => {
    },
    logout: () => {
    }
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

    const logout = () => {
        saveAuth(undefined)
        setCurrentUser(undefined)
    }

    return (
        <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth, currentUser, logout, setCurrentUser} = useAuth()

    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!currentUser) {
                    const {data} = await getUserByToken(apiToken)
                    if (data) {
                        setCurrentUser(data)
                    }
                }
            } catch (error) {
                if (currentUser) {
                    logout()
                }
            }
        }

        if (auth && auth.token) {
            requestUser(auth.token)
        } else {
            logout()
        }
        // eslint-disable-next-line
    }, [])

    return <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
