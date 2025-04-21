import React,{useState} from "react";
import "@styles/menus.css"

import type { MaterialInventory } from "@ctypes/database_types";

import MaterialMenu from "./material_menu";

export interface Props {
  data: MaterialInventory;
  type_menu:string;
}


export default function MaterialInventoryMenu(props:Props){
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

function InnerMenu({data}:{data:MaterialInventory}){
    return (
        <>
            <h2>Material Inventory Inner</h2>
            <div>
                <div>Material Inventory id: {data.id}</div>
                <div>Material id: {data.material?.id}</div>
                <div>Material name: {data.material?.name}</div>
                <div>Quantity: {data.quantity}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:MaterialInventory}){
    const [activeTab, setActiveTab] = useState("material");
    return (
        <>
            <h2>Material Inventory Menu</h2>
            <h4>Material Inventory Number: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `material` ? `active` : ``}
                    onClick={() => setActiveTab(`material`)}
                >
                    Material
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "material" &&
                    <>
                        {data && data.material ?
                        (
                            <div>
                                <MaterialMenu data={data.material} type_menu="inner"/>
                            </div>
                        )
                        :
                        (
                            <>
                                No data for Material
                            </>
                        )
                        }
                    </>
                }
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:MaterialInventory}){
    return (
        <>
            <div>Add to Material Inventory</div>
        </>
    )
}