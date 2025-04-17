import React from "react";
import type { Ticket } from "@ctypes/database_types";

export interface Props {
  data: Ticket;
  isInner:boolean;
}


export default function TicketMenu(props:Props){
    const {data,isInner} = props;
    console.log(data)
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
    return (
        <h2>Ticket Menu</h2>
    )
}