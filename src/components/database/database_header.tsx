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
        }
    },[activeTab])
    
    return (
        <div className="tab-container">
            <div className="tab-menu select-menu">
                <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="tab-selector"
                >
                    <option value="sale" className={activeTab === 'sale' ? 'active' : ''}>
                        Sale
                    </option>
                    <option value="error-sale" className={activeTab === 'error-sale' ? 'active' : ''}>
                        Error Sale
                    </option>
                    <option value="general-price" className={activeTab === 'general-price' ? 'active' : ''}>
                        General Price
                    </option>
                    <option value="ticket" className={activeTab === 'ticket' ? 'active' : ''}>
                        Ticket
                    </option>
                    <option value="client" className={activeTab === 'client' ? 'active' : ''}>
                        Client
                    </option>
                    <option value="theme" className={activeTab === 'theme' ? 'active' : ''}>
                        Theme
                    </option>
                    <option value="subtheme" className={activeTab === 'subtheme' ? 'active' : ''}>
                        Subtheme
                    </option>
                    <option value="material-type" className={activeTab === 'material-type' ? 'active' : ''}>
                        Material Type
                    </option>
                    <option value="material" className={activeTab === 'material' ? 'active' : ''}>
                        Material
                    </option>
                    <option value="material-inventory" className={activeTab === 'material-inventory' ? 'active' : ''}>
                        Material Inventory
                    </option>
                    <option value="brand-model" className={activeTab === 'brand-model' ? 'active' : ''}>
                        Brand Model
                    </option>
                    <option value="set-model" className={activeTab === 'set-model' ? 'active' : ''}>
                        Set Model
                    </option>
                </select>
            </div>
        </div>
    )
}