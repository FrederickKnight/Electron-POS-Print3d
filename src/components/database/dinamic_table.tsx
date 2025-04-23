import React, { useEffect, useState } from 'react';

import type {TypeDict} from "src/types/database_types"

import { useGetData } from '@hooks/useGetData';

export interface Props<K extends keyof TypeDict>{
    endpoint:string;
    typeKey:K;
    setSelectedRow?: React.Dispatch<React.SetStateAction<number | null>>
    menuOpener?: () => void;
}

function formatKey(key: string): string {
    return key
        .split('_')
        .map((part) => (part.charAt(0) + part.slice(1)).toUpperCase())
        .join(' ');
}

export default function DynamicTable<K extends keyof TypeDict>(props:Props<K>){
    const { endpoint,typeKey,setSelectedRow,menuOpener } = props;
    const {data,refetch} = useGetData(endpoint,typeKey)

    type SelectedType = TypeDict[K]
    
    let keys: (keyof SelectedType)[] = [];
    if(data && data.length > 0){
        keys = ["id", ...Object.keys(data[0]).filter((k) => k !== "id")] as (keyof SelectedType)[];
    }

    const handleClick = (event:React.MouseEvent) => {
        const row = (event.target as HTMLTableCellElement).parentElement;
        const firstCell = row?.querySelector("td");

        if (firstCell && setSelectedRow !== undefined) {
            const content = firstCell.textContent;
            setSelectedRow(Number(content))
            if(menuOpener !== undefined){
                menuOpener()
            }
        }
    };

    return (
        <>
            <div>
                <button onClick={refetch}>Recargar</button>
            </div>
            {data && data.length > 0 ? 
            (
                <table>
                    <thead>
                        <tr>
                        {keys.map((key,index) => (
                            <th key={index}>{formatKey(String(key))}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.sort((a,b) => a.id - b.id).map((item,rowIndex) => (
                            <tr key={`row-${rowIndex}`} onClick={(event) => handleClick(event)}>
                                {keys.map((key,colIndex) => (
                                    <td key={`row-${rowIndex}-col-${colIndex}`}>
                                        {String(item[key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            :
            (
                <p>Cargando datos....</p>
            )}
        </>
    )
}