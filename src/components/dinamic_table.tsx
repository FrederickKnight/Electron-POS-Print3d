import React, { useEffect, useState } from 'react';
import { fetchData } from '@lib/fetch_data';
import type { Sale, ErrorSale, Ticket, GeneralPrice, Client} from '@database_types';

import styles from './dinamic_table.module.css';


// DICCIONARIO ESPECIAL PARA PODER PASAR UN TYPO COMO PROP
type TypeDict = {
    sale: Sale;
    error_sale: ErrorSale;
    ticket: Ticket;
    general_price: GeneralPrice;
    client: Client;
}

// Extends para que entienda que typeKey es para los typos del dict
export interface Props<K extends keyof TypeDict>{
    endpoint:string;
    typeKey: K;
}

function formatKey(key: string): string {
    return key
        .split('_')
        .map((part) => (part.charAt(0) + part.slice(1)).toUpperCase())
        .join(' ');
}

export default function DynamicTable<K extends keyof TypeDict>(props:Props<K>){
    const { endpoint, typeKey } = props;

    type SelectedType = TypeDict[typeof props.typeKey]
    const [data, setData] = useState<SelectedType[]>([]);

    useEffect(() => {
        console.log("useEffect se esta");
        const load = async () => {
            const result = await fetchData<SelectedType>(endpoint);
            setData(result ?? []);
          };
          load();
    },[endpoint])

    const handleClick = (event:React.MouseEvent) => {
        const row = (event.target as HTMLTableCellElement).parentElement;
        const firstCell = row?.querySelector("td");

        if (firstCell) {
            const content = firstCell.textContent;
            console.log(Number(content));
  }
    };

    return (
        <div>
            {data && data.length > 0 ? 
            (
                <table>
                    <thead>
                        <tr>
                        {["id",
                            ...Object.keys(data[0]).filter((key) => key !== "id")
                        ].map((key,index) => (
                            <th key={index} className={`header-${index}`}>{formatKey(key)}</th>
                        ))

                        } 
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item,rowIndex) => (
                            <tr onClick={(event) => handleClick(event)}>
                                {[
                                    "id",
                                    ...Object.keys(item).filter((key) => key !== "id"),
                                ].map((key,colIndex) => (
                                    <td
                                    key={colIndex} 
                                    id={`row-${rowIndex}-col-${colIndex}`}
                                    >
                                        {String(item[key as keyof SelectedType] )}
                                    </td>
                                ))
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            :
            (
                <p>Cargando datos....</p>
            )}
        </div>
    )
}