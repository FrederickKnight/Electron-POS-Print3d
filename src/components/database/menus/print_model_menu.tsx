import React from "react";
import type { PrintModel } from "@ctypes/database_types";

export interface Props {
  data: PrintModel;
  isInner:boolean;
}


export default function PrintModelMenu(props:Props){
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

function InnerMenu({data}:{data:PrintModel}){
    return (
        <>
            <h2>Print Model Inner</h2>
            <div>
                <div>ID Model: {data.id}</div>
                <div>Name: {data.name}</div>
                <div>Subtheme: {data.id_subtheme}</div>
                <img src={data.url_image} alt={`Imagen de ${data.name}`} />
                <div>description: {data.description}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:PrintModel}){
    return (
        <h2>Print Model Menu</h2>
    )
}