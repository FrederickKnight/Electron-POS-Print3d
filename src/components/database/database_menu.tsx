import React, {useEffect,useState} from "react"
import type { TypeDict } from "@ctypes/database_types";
import { useGetData } from "@hooks/useGetData";
import { useSendForm } from "@hooks/useSendForm";
import MenuSelector from "./menus/db_menu_selector";
import "@styles/menus.css"

export interface Props<K extends keyof TypeDict>{
    endpoint:string;
    typeKey: K;
    selectedRow: number | null
}

export default function DatabaseMenu<K extends keyof TypeDict>(props:Props<K>){
    const { endpoint, typeKey, selectedRow } = props;
    const {data} = useGetData(`${endpoint}?relations=true&filter_field=id&filter_value=${selectedRow}`,typeKey)
    const [activeTab, setActiveTab] = useState("info"); 

    const {form,resetForm,handleSubmit,handleChange} = useSendForm({endpoint,typeKey,data: data ? data[0]: undefined})

    const menuKey = `${typeKey}-${activeTab}-${selectedRow ?? "none"}`;

    return (
        <div className="tab-container">
            <div className="tab-menu">
                <button className={activeTab === `info` ? `active` : ``}
                onClick={() => setActiveTab(`info`)}
                >
                    Information
                </button>
                <button className={activeTab === `add` ? `active` : ``}
                onClick={() => setActiveTab(`add`)}
                >
                    Add/Update
                </button>
            </div>
            <div className="tab-content">
                <div>
                    <MenuSelector
                        key={menuKey}
                        data={data[0]}
                        typeKey={typeKey}
                        type_menu={activeTab === "add" ? "controll" : "menu"}
                    />
                </div>
            </div>
        </div>
    )
}