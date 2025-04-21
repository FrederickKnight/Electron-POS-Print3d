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

    useEffect(() => {
        console.log(selectedRow)
        setSelectedRow(null)
    },[endpoint,typeKey])

    return (
        <div className="grid-container">
            <div className="card-container header">
                <DatabaseHeader setEndpoint={setEndPoint} setTypeKey={setTypeKey}/>
            </div>

            <div className="card-container body">
                <DynamicTable endpoint={endpoint} typeKey={typeKey} setSelectedRow={setSelectedRow}/>
            </div>
            
            <div className="card-container menu">
                <DatabaseMenu endpoint={endpoint} typeKey={typeKey} selectedRow={selectedRow}/>
            </div>
        </div>
    )
}