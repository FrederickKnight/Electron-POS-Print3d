import React from "react";
import type { GeneralPrice } from "@ctypes/database_types";

export interface Props {
  data: GeneralPrice;
  isInner:boolean;
}


export default function GeneralPriceMenu(props:Props){
    const {data,isInner} = props;
    
    return (
        <>
            {isInner ?
            (
                <InnerMenu data={data} />
            )
            :
            (
                <Menu data={data} />
            )
            }
        </>
    )
}

function InnerMenu({data}:{data:GeneralPrice}){
    return (
        <>
            <h2>General Price Inner</h2>
            <div>ID Price: {data.id}</div>
            <div>Date {data.date}</div>
            <div>Electricity {data.electricity}</div>
            <div>
                Failure Risk
                <ul>
                    <li>Low {data.failure_risk?.low}</li>
                    <li>Medium {data.failure_risk?.medium}</li>
                    <li>High {data.failure_risk?.high}</li>
                </ul>
            </div>
            <div>Material Type {String(data.material_type)}</div>
            <div>Margin {data.margin}</div>
            <div>Wear {data.wear}</div>
            <br />
            <div>
                Formula
                <div>
                    {data.formula}
                </div>
            </div>
        </>
    )
}

function Menu({data}:{data:GeneralPrice}){
    return (
        <h2>General Price Menu</h2>
    )
}