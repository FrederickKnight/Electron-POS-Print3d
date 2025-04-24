import React,{useEffect, useState, type FormEvent} from "react";
import "@styles/menus.css"

import type { Sale } from "@ctypes/database_types";

import GeneralPriceMenu from "./general_price_menu";
import TicketMenu from "./ticket_menu";
import PrintModelMenu from "./print_model_menu";
import ErrorSaleMenu from "./error_sale_menu";
import { useSendForm } from "@hooks/useSendForm";
import { useGetData } from "@hooks/useGetData";

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
        const {data:ticket_data} = useGetData("ticket")
        const {data:print_model_data} = useGetData("print_model") 


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
                    {ticket_data &&
                        <label> Ticket
                            <select name="id_ticket" value={form?.id ?  form.id_ticket : ""} onChange={handleChange}>
                                {ticket_data.sort((a,b) => a.id - b.id).map((ticket) => (
                                    <option value={ticket.id}>{ticket.uuid}</option>
                                ))
                                }
                            </select>
                        </label>
                    }
                    {print_model_data &&
                        <label> Model
                            <select name="id_print_model" value={form?.id ?  form.id_print_model : ""} onChange={handleChange}>
                                {print_model_data.sort((a,b) => a.id - b.id).map((print_model) => (
                                    <option value={print_model.id}>{print_model.name}</option>
                                ))
                                }
                            </select>
                        </label>
                    }
                    <label>ID General Price #el mas reciente o seleccionar:
                            <input name="id_general_price" type="number" value={form?.id_general_price ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Material Quantity:
                            <input name="material_quantity" type="number" value={form?.material_quantity ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Print Time #make choice between seconds or hours:
                            <input name="print_time" type="number" value={form?.print_time ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Risk:
                        <select name="risk" value={form?.risk} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    <label>Discount:
                            <input name="discount" type="number" value={form?.discount ?? ""} onChange={handleChange}/>
                    </label>
                    <button type="submit">
                        {form.id ? "Updatear" : "Crear"}
                    </button>
                </form>
            </>
        );
}