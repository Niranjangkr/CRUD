import React, { createContext, useState } from 'react'

export const addData = createContext()
export const deleteData = createContext()
export const updateData = createContext()
 
const ContextProvider = ({children}) => {
    const [ udata, setUdata ] = useState("")
    const [ delData, setDelData ] = useState("")
    const [ upData, setUpData ] = useState("")
  return (
    <>
        <addData.Provider value={{udata, setUdata}}>
            <deleteData.Provider value={{delData, setDelData}}>
                <updateData.Provider value={{upData, setUpData}}>
                    {children}
                </updateData.Provider>
            </deleteData.Provider>
        </addData.Provider>
    </>
  )
}

export default ContextProvider