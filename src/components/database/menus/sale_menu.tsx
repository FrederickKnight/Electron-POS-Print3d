import React,{useState} from "react";
import "@styles/menus.css"

import type { Sale } from "@ctypes/database_types";

import GeneralPriceMenu from "./general_price_menu";
import TicketMenu from "./ticket_menu";
import PrintModelMenu from "./print_model_menu";

export interface Props {
  data: Sale;
  isInner:boolean
}


export default function SaleMenu(props:Props){
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

function InnerMenu({data}:{data:Sale}){
    return (
        <>
            <h2>Sale Inner</h2>
        </>
    )
}

function Menu({data}:{data:Sale}){
    const [activeTab, setActiveTab] = useState("general_price");
    return (
        <>
            <h2>Sale Menu</h2>
            <h3>Sale Number: {data?.id}</h3>
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
                </div>
                <div className="tab-content">
                    {activeTab === "general_price" &&
                        <>
                            {data && data.general_price ? 
                            (
                                <div>
                                    <GeneralPriceMenu data={data.general_price} isInner={true}/>
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
                                    <TicketMenu data={data.ticket} isInner={true}/>
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
                                    <PrintModelMenu data={data.print_model} isInner={true}/>
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

                </div>
            </div>
        </>
    )
}