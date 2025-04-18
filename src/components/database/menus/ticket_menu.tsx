import React,{useState} from "react";
import "@styles/menus.css"

import type { Ticket } from "@ctypes/database_types";

import SaleMenu from "./sale_menu";

export interface Props {
  data: Ticket;
  isInner:boolean;
}


export default function TicketMenu(props:Props){
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
                                            <SaleMenu data={sale} isInner={true} />
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <SaleMenu data={data.sales} isInner={true} />
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
                                Client
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