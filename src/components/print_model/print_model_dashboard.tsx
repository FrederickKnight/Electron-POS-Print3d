import React,{useState, useEffect} from "react"

import DynamicTable from "@components/database/dinamic_table"
import DatabaseMenu from "@components/database/database_menu";

import "@styles/database_dashboard.css"


export default function PrintModelDashboard(){
    const [selectedRow,setSelectedRow] = useState<number | null>(null);
    const [menuReady, setMenuReady] = useState(false);

    const menuOpener = () => {
        setMenuReady(!menuReady)
    }

    return(
        <div className={`grid-container ${menuReady ? `menu-ready` : ""}`}>
            <div className="card-container header tab-menu flex-row flex-between">
                <div>
                    Custom Header
                </div>
                <div>
                    <button className={menuReady ? `active` : ""} onClick={menuOpener}>
                        {menuReady ? `Close` : "Open Menu"}
                    </button>
                </div>
            </div>

            <div className="card-container body">
                <DynamicTable endpoint="print-model" typeKey="print_model" setSelectedRow={setSelectedRow} menuOpener={() => {setMenuReady(true)}}/>
            </div>
            {menuReady && 
                <div className="card-container menu">
                    <DatabaseMenu endpoint="print-model" typeKey="print_model" selectedRow={selectedRow}/>
                </div>
            }
        </div>
    )
}