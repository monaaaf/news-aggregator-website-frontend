import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {WithChildren} from "../models/General.ts";
import {getErrorPage} from "../helpers/Requests.ts";
import {getOptions} from "../requests/Options.ts";
import {Options} from "../models/Options.ts";

const DEFAULT_OPTIONS: Options = {
    authors: [], categories: [], sources: []
}

interface Props {
    options: Options
    setOptions: Dispatch<SetStateAction<Options>>
}

const defaultMasterContext = {
    options: DEFAULT_OPTIONS,
    setOptions: () => {
    },
}

export const MasterContext = createContext<Props>(defaultMasterContext)

export const useMaster = () => {
    return useContext(MasterContext)
}

export const MasterProvider: FC<WithChildren> = ({children}) => {
    const navigate = useNavigate()

    const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS)

    useEffect(() => {
        getOptions().then((response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setOptions(response)
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MasterContext.Provider
            value={{
                options,
                setOptions,
            }}
        >
            {children}
        </MasterContext.Provider>
    )
}
