import React, {useEffect,useState} from "react"
import type { TypeDict } from "@ctypes/database_types";
import { useGetData } from "@hooks/useGetData";
import MenuSelector from "./menus/db_menu_selector";

export interface Props<K extends keyof TypeDict>{
    endpoint:string;
    typeKey: K;
    selectedRow: number | null
}

export default function DatabaseMenu<K extends keyof TypeDict>(props:Props<K>){
    const { endpoint, typeKey, selectedRow } = props;
    const data = useGetData(`${endpoint}?relations=true&filter_field=id&filter_value=${selectedRow}`,typeKey)
    
    useEffect(() => {
        console.log(`Type selected ${typeKey}`)
        console.log(`endpoint ${endpoint}`)
    },[endpoint,typeKey,selectedRow ])

    return (
        <>
            <MenuSelector data={data[0]} typeKey={typeKey} isInner={false}/>
        </>
    )
}