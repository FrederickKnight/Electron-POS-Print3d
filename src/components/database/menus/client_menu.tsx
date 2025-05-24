import React,{useState} from "react";
import "@styles/menus.css"
import "@styles/forms.css"


import type { Client } from "@ctypes/database_types";

import TicketMenu from "./ticket_menu";
import { useSendForm } from "@hooks/useSendForm";

export interface Props {
  data: Client;
  type_menu:string;
}


export default function ClientMenu(props:Props){
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

function InnerMenu({data}:{data:Client}){
    return (
        <>
            <h2>Client Inner</h2>
            <div>
                <div>Client ID: {data.id}</div>
                <div>Client Email: {data.email}</div>
                <div>Client Telephone: {data.telephone}</div>
                <div>Client Number: {data.address}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:Client}){
    const [activeTab, setActiveTab] = useState("ticket");
    return (
        <>
            <h2>Client Menu</h2>
            <h4>Client ID: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `ticket` ? `active` : ``}
                    onClick={() => setActiveTab(`ticket`)}
                >
                    Tickets
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "ticket" &&
                    <>
                        {data && data.tickets ? (
                                Array.isArray(data.tickets) ? (
                                    data.tickets.map((ticket, index) => (
                                        <div key={index}>
                                            <TicketMenu data={ticket} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <TicketMenu data={data.tickets} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Ticket
                                </>
                            )}
                    </>
                }
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:Client}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"client",data,allowedFields:["id","name","email","telephone","address"]})
    
        return (
            <div className="form-container">
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
                    <label>Name:
                        <input name="name" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Email:
                        <input name="email" type="text" value={form?.email ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Tel:
                        <input name="telephone" type="text" value={form?.telephone ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Address:
                        <input name="address" type="text" value={form?.address ?? ""} onChange={handleChange}/>
                    </label>
                    <button type="submit">
                        {form.id ? "Updatear" : "Crear"}
                    </button>
                </form>
            </div>
      )
}