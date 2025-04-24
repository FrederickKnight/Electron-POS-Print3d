import React,{useEffect, useState, type FormEvent} from "react";
import "@styles/menus.css"

import type { Sale } from "@ctypes/database_types";

import GeneralPriceMenu from "./general_price_menu";
import TicketMenu from "./ticket_menu";
import PrintModelMenu from "./print_model_menu";
import ErrorSaleMenu from "./error_sale_menu";
import { useSendForm } from "@hooks/useSendForm";

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
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"sale",data,
        allowedFields:["id","id_ticket","id_print_model","id_general_price","material_quantity","print_time","risk","discount"]})
                
        return (
            <>
                <button onClick={resetForm}>Reset</button>
                {form?.id ? 
                (
                    <div>Informacion Seleccionada de : #ID {form?.id}</div>
                )
                :
                (
                    <div>Sin Informacion Seleccionada</div>
                )
                }
                <form onSubmit={handleSubmit}>
                    <label>ID Ticket:
                            <input name="id_ticket" type="number" value={form?.id_ticket ?? ""} onChange={handleChange}/>
                    </label>
                    <label>ID Model:
                            <input name="id_print_model" type="number" value={form?.id_print_model ?? ""} onChange={handleChange}/>
                    </label>
                    <label>ID General Price:
                            <input name="id_general_price" type="number" value={form?.id_general_price ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Material Quantity:
                            <input name="material_quantity" type="number" value={form?.material_quantity ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Print Time:
                            <input name="print_time" type="number" value={form?.id_ticket ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Risk #selectable:
                            <input name="risk" type="text" value={form?.id_ticket ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Discount:
                            <input name="discount" type="number" value={form?.id_ticket ?? ""} onChange={handleChange}/>
                    </label>
                    <button type="submit">
                        {form.id ? "Updatear" : "Crear"}
                    </button>
                </form>
            </>
        );
}