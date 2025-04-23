import React,{useState, useEffect} from "react"

import DynamicTable from "./dinamic_table"
import DatabaseMenu from "./database_menu";
import DatabaseHeader from "./database_header";

import type {TypeDict} from "@ctypes/database_types"

import "@styles/database_dashboard.css"

export default function DatabaseDashboard(){

    const [selectedRow,setSelectedRow] = useState<number | null>(null);
    const [endpoint,setEndPoint] = useState<string>("sale");
    const [typeKey,setTypeKey] = useState<keyof TypeDict>("sale");

    const [menuReady, setMenuReady] = useState(false);

    useEffect(() => {
        setSelectedRow(null);
        setMenuReady(false);

    }, [endpoint, typeKey]);

    const menuOpener = () => {
        setMenuReady(!menuReady)
    }
    
    return (
        <div className={`grid-container ${menuReady ? `menu-ready` : ""}`}>
            <div className="card-container header tab-menu flex-row flex-between">
                <div>
                    <DatabaseHeader setEndpoint={setEndPoint} setTypeKey={setTypeKey}/>
                </div>
                <div>
                    <button className={menuReady ? `active` : ""} onClick={menuOpener}>
                        {menuReady ? `Close` : "Open Menu"}
                    </button>
                </div>
            </div>

            <div className="card-container body">
                <DynamicTable endpoint={endpoint} typeKey={typeKey} setSelectedRow={setSelectedRow} menuOpener={() => {setMenuReady(true)}}/>
            </div>
            
            {menuReady &&
                <div className="card-container menu">
                    <DatabaseMenu endpoint={endpoint} typeKey={typeKey} selectedRow={selectedRow}/>
                </div>
            }
        </div>
    )
}