import React,{useState} from "react";
import "@styles/menus.css"

import type { Ticket } from "@ctypes/database_types";

import SaleMenu from "./sale_menu";
import ClientMenu from "./client_menu";

export interface Props {
  data: Ticket;
  type_menu:string;
}


export default function TicketMenu(props:Props){
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

function InnerMenu({data}:{data:Ticket}){
    return (
        <>
            <h2>Ticket Inner</h2>
            <div>
                <div>Ticket Number: {data.uuid}</div>
                <div>Date {data.date}</div>
                <div>Client {data.id_client}</div>
                <div>User {data.id_user}</div>
                <div>Subject {data.subject}</div>
                <div>Total {data.total}</div>

            </div>
        </>
    )
}

function Menu({data}:{data:Ticket}){
    const [activeTab, setActiveTab] = useState("sale");
    return (
        <>
            <h2>Ticket Menu</h2>
            <h4>Ticked Number: {data?.uuid}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `sale` ? `active` : ``}
                    onClick={() => setActiveTab(`sale`)}
                >
                    Sales
                </button>
                <button className={activeTab === `client` ? `active` : ``}
                    onClick={() => setActiveTab(`client`)}
                >
                    Client
                </button>
                <button className={activeTab === `user` ? `active` : ``}
                    onClick={() => setActiveTab(`user`)}
                >
                    User
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "sale" &&
                    <>
                        {data && data.sales ? (
                                Array.isArray(data.sales) ? (
                                    data.sales.map((sale, index) => (
                                        <div key={index}>
                                            <SaleMenu data={sale} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <SaleMenu data={data.sales} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Sale
                                </>
                            )}
                    </>
                }
                {activeTab === "client" &&
                    <>
                        {data && data.client ?
                        (
                            <div>
                                <ClientMenu data={data.client} type_menu="inner"/>
                            </div>
                        )
                        :
                        (
                            <>
                                No data for Client
                            </>
                        )
                        }
                    </>
                }
                {activeTab === "user" &&
                    <>
                        {data && data.user ?
                        (
                            <div>
                                User
                            </div>
                        )
                        :
                        (
                            <>
                                No data for User
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

function Controll({data}:{data:Ticket}){
    return (
        <>
            <div>Add to Ticket</div>
        </>
    )
}