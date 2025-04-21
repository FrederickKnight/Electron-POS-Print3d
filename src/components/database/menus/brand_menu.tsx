import React,{useState} from "react";
import "@styles/menus.css"

import type { BrandModel } from "@ctypes/database_types";

import PrintModelMenu from "./print_model_menu";

export interface Props {
  data: BrandModel;
  type_menu:string;
}


export default function BrandModelMenu(props:Props){
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

function InnerMenu({data}:{data:BrandModel}){
    return (
        <>
            <h2>Brand Inner</h2>
            <div>
                <div>Brand id: {data.id}</div>
                <div>Name {data.name}</div>
                <div>Description {data.description}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:BrandModel}){
    const [activeTab, setActiveTab] = useState("print_model");
    return (
        <>
            <h2>Brand Menu</h2>
            <h4>Brand id: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `print_model` ? `active` : ``}
                    onClick={() => setActiveTab(`print_model`)}
                >
                    Models
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "print_model" &&
                    <>
                        {data && data.print_models ? (
                                Array.isArray(data.print_models) ? (
                                    data.print_models.map((model, index) => (
                                        <div key={index}>
                                            <PrintModelMenu data={model} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <PrintModelMenu data={data.print_models} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Model
                                </>
                            )}
                    </>
                }
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:BrandModel}){
    return (
        <>
            <div>Add to Brand</div>
        </>
    )
}