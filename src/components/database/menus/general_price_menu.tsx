import React,{useState} from "react";
import type { GeneralPrice } from "@ctypes/database_types";
import "@styles/menus.css"

import SaleMenu from "./sale_menu";

export interface Props {
  data: GeneralPrice;
  type_menu:string;
}


export default function GeneralPriceMenu(props:Props){
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
    const [activeTab, setActiveTab] = useState("material_type");
    return (
        <>
            <h2>General Price Menu</h2>
            <h4>General Price id: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `material_type` ? `active` : ``}
                    onClick={() => setActiveTab(`material_type`)}
                >
                    Material Type
                </button>
                <button className={activeTab === `sale` ? `active` : ``}
                    onClick={() => setActiveTab(`sale`)}
                >
                    Sales
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "sale" &&
                    <>
                        {data && data.sales ?
                        (
                            Array.isArray(data.sales) ? (
                                data.sales.map((sale,index) => (
                                    <div key={index}>
                                        <SaleMenu data={sale} type_menu="inner" />
                                    </div>
                                ))
                            ) :(
                                <div>
                                    <SaleMenu data={data.sales} type_menu="inner" />
                                </div>
                            )
                        )
                        :
                        (
                            <>
                                No data for Sale
                            </>
                        )
                        }
                    </>
                }
                {activeTab === "material_type" &&
                    <>
                        {data && data.material_type ?
                        (
                            <div>
                                Material Type
                            </div>
                        )
                        :
                        (
                            <>
                                No data for Material Type
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

function Controll({data}:{data:GeneralPrice}){
    return (
        <>
            <div>Add to General Price #Arreglar parte de los riesgos de fallo</div>
            <div>Formula igual</div>
        </>
    )
}