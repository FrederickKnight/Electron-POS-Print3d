import React,{useEffect, useState, type FormEvent} from "react";
import "@styles/menus.css"

import type { Sale } from "@ctypes/database_types";

import GeneralPriceMenu from "./general_price_menu";
import TicketMenu from "./ticket_menu";
import PrintModelMenu from "./print_model_menu";
import ErrorSaleMenu from "./error_sale_menu";

export interface Props {
  data: Sale | Sale;
  type_menu:string;
}


export default function SaleMenu(props:Props){
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

function InnerMenu({data}:{data:Sale}){
    return (
        <>
            <div>Sale ID: {data.id}</div>
            <div>Sale Total: {data.total}</div>
            <div>Sale Model: {data.id_print_model}</div>
        </>
    )
}

function Menu({data}:{data:Sale}){
    const [activeTab, setActiveTab] = useState("general_price");
    return (
        <>
            <h2>Sale Menu</h2>
            <h4>Sale Number: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                    <button className={activeTab === `general_price` ? `active` : ``}
                    onClick={() => setActiveTab(`general_price`)}
                    >
                        General Price
                    </button>
                    <button className={activeTab === `print_model` ? `active` : ``}
                    onClick={() => setActiveTab(`print_model`)}
                    >
                        Print Model
                    </button>
                    <button className={activeTab === `ticket` ? `active` : ``}
                    onClick={() => setActiveTab(`ticket`)}
                    >
                        Ticket
                    </button>
                    <button className={activeTab === `error_sale` ? `active` : ``}
                    onClick={() => setActiveTab(`error_sale`)}
                    >
                        Error Sale
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === "general_price" &&
                        <>
                            {data && data.general_price ? 
                            (
                                <div>
                                    <GeneralPriceMenu data={data.general_price} type_menu="menu"/>
                                </div>
                            )
                            :
                            (
                                <>
                                    No data for General Prices
                                </>
                            )
                            }
                        </>
                    }
                    {activeTab === "ticket" &&
                        <>
                            {data && data.ticket ? 
                            (
                                <div>
                                    <TicketMenu data={data.ticket} type_menu="inner"/>
                                </div>
                            )
                            :
                            (
                                <>
                                    No data for Ticket
                                </>
                            )
                            }
                        </>
                    }
                    {activeTab === "print_model" &&
                        <>
                            {data && data.ticket ? 
                            (
                                <div>
                                    <PrintModelMenu data={data.print_model} type_menu="inner"/>
                                </div>
                            )
                            :
                            (
                                <>
                                    No data for Ticket
                                </>
                            )
                            }
                        </>
                    }
                    {activeTab === "error_sale" &&
                        <>
                            {data && data.ticket ? 
                            (
                                <div>
                                    <ErrorSaleMenu data={data.error_sale} type_menu="inner"/>
                                </div>
                            )
                            :
                            (
                                <>
                                    No data for Errors
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

function Controll({data}:{data:Sale}){

    const [form,setForm] = useState<Partial<Sale>>({
        id_ticket:0,
        id_print_model:0,
        id_general_price:0,
        material_quantity:0,
        print_time:0,
        risk:"low",
        discount:0,
    })

    useEffect(() => {
        if(data !== undefined){
            console.log(`data: ${data}`)
        }
    },[data])

    return (
        <>
            {data ?
                (
                    <form>
                        <label>Modelo:
                            <input type="number" value={data.print_model.id}/>
                        </label>
                        <label>General Price:
                            <input type="text" value={data.general_price.id}/>
                        </label>
                        <label>Cantidad Material:
                            <input type="number" value={data.material_quantity}/>
                        </label>
                        <label>Tiempo Impresion:
                            <input type="number" value={data.print_time}/>
                        </label>
                        <label>Riesgo:
                            <input type="text" value={data.risk}/>
                        </label>
                        <label>Descuento:
                            <input type="number" value={data.discount}/>
                        </label>
                        <button type="submit">Updatear</button>
                    </form>
                )
                :
                (
                    <form>
                        <label>Modelo:
                            <input type="number" />
                        </label>
                        <label>General Price:
                            <input type="number" />
                        </label>
                        <label>Cantidad Material:
                            <input type="number" />
                        </label>
                        <label>Tiempo Impresion:
                            <input type="number" />
                        </label>
                        <label>Riesgo:
                            <input type="text" />
                        </label>
                        <label>Descuento:
                            <input type="number" />
                        </label>
                        <button type="submit">Crear</button>
                    </form>
                )
            }
        </>
  );
}