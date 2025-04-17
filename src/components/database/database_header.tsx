import React,{act, useEffect, useState} from "react"
import "@styles/menus.css"
import type { TypeDict } from "@ctypes/database_types"

export interface Props{
    setEndpoint: React.Dispatch<React.SetStateAction<string>>
    setTypeKey: React.Dispatch<React.SetStateAction<keyof TypeDict>>
}

function formatKey(key: string): string {
    return key.replace(/-/g, "_");
}


export default function DatabaseHeader(props:Props){
    const {setEndpoint,setTypeKey} = props;
    const [activeTab, setActiveTab] = useState("sale");

    useEffect(() => {
        if(setEndpoint !== undefined && setTypeKey !== undefined){
            setEndpoint(activeTab)
            setTypeKey(formatKey(activeTab) as keyof TypeDict)
            setActiveTab(activeTab)
            console.log(`Active Tab ${activeTab}`)
        }
    },[activeTab])
    
    return (
        <div className="tab-container">
            <div className="tab-menu">
                <button className={activeTab === `sale` ? `active` : ``}
                onClick={() => setActiveTab(`sale`)}
                >
                    Sale
                </button>
                <button className={activeTab === `general-price` ? `active` : ``}
                onClick={() => setActiveTab(`general-price`)}
                >
                    General Price
                </button>
                <button className={activeTab === `ticket` ? `active` : ``}
                onClick={() => setActiveTab(`ticket`)}
                >
                    Ticket
                </button>
            </div>
        </div>
    )
}