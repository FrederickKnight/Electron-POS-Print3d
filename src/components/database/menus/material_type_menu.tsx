import React,{useState} from "react";
import "@styles/menus.css"

import type { MaterialType } from "@ctypes/database_types";

import GeneralPriceMenu from "./general_price_menu";
import MaterialMenu from "./material_menu";

export interface Props {
  data: MaterialType;
  type_menu:string;
}


export default function MaterialTypeMenu(props:Props){
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

function InnerMenu({data}:{data:MaterialType}){
    return (
        <>
            <h2>Material Type Inner</h2>
            <div>
                <div>Material Type ID: {data.id}</div>
                <div>Material Type Name: {data.name}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:MaterialType}){
    const [activeTab, setActiveTab] = useState("material");
    return (
        <>
            <h2>Material Type Menu</h2>
            <h4>Material Type Number: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `material` ? `active` : ``}
                    onClick={() => setActiveTab(`material`)}
                >
                    Materials
                </button>
                <button className={activeTab === `general_price` ? `active` : ``}
                    onClick={() => setActiveTab(`general_price`)}
                >
                    General Price
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "material" &&
                    <>
                        {data && data.materials ? (
                                Array.isArray(data.materials) ? (
                                    data.materials.map((material, index) => (
                                        <div key={index}>
                                            <MaterialMenu data={material} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <MaterialMenu data={data.materials} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Material
                                </>
                            )}
                    </>
                }
                {activeTab === "general_price" &&
                    <>
                        {data && data.general_prices ? (
                                Array.isArray(data.general_prices) ? (
                                    data.general_prices.map((general_price, index) => (
                                        <div key={index}>
                                            <GeneralPriceMenu data={general_price} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <GeneralPriceMenu data={data.general_prices} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for General Price
                                </>
                            )}
                    </>
                }
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:MaterialType}){
    return (
        <>
            <div>Add to Material Type</div>
        </>
    )
}