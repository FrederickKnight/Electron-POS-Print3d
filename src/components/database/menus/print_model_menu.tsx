import React from "react";
import type { PrintModel } from "@ctypes/database_types";

export interface Props {
  data: PrintModel;
  type_menu:string;
}


export default function PrintModelMenu(props:Props){
    const {data,type_menu} = props;
    const renderMenu = () => {
        switch (type_menu) {
            case "inner":
                return <InnerMenu data={data} />;

            case "menu":
                return <Menu data={data} />;

            case "controll":
                return <Controll data={data} />;
        }
      };

    return (
        <>{renderMenu()}</>
    )
}


function InnerMenu({data}:{data:PrintModel}){
    return (
        <>
            <h2>Print Model Inner</h2>
            <div>
                <div>ID Model: {data.id}</div>
                <div>Name: {data.name}</div>
                <div>Subtheme: {data.subtheme?.name}</div>
                <div>Theme: {data.subtheme?.theme?.name}</div>
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

function Controll({data}:{data:PrintModel}){
    return (
        <>
            <div>Add to PrintModel</div>
        </>
    )
}