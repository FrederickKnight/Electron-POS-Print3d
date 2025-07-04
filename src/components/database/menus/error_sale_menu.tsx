import React,{useState} from "react";
import type { ErrorSale } from "@ctypes/database_types";
import "@styles/menus.css"
import "@styles/forms.css"

import SaleMenu from "./sale_menu";
import { useSendForm } from "@hooks/useSendForm";
import { useGetData } from "@hooks/useGetData";

export interface Props {
  data: ErrorSale | undefined;
  type_menu:string;
}


export default function ErrorSaleMenu(props:Props){
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

function InnerMenu({data}:{data:ErrorSale | undefined}){
    return (
        <>
            <h2>Error Sale Inner</h2>
            <div>ID Error: {data?.id}</div>
            <div>Waste: {data?.waste}</div>
            <div>Reajusted Price: {data?.reajusted_price}</div>
            <div>Description: {data?.description}</div>
        </>
    )
}

function Menu({data}:{data:ErrorSale | undefined}){
    const [activeTab, setActiveTab] = useState("sale");
    return (
        <>
            <h2>Error Sale Menu</h2>
            <h4>Error id: {data?.id}</h4>
            <div>Description: {data?.description}</div>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `sale` ? `active` : ``}
                    onClick={() => setActiveTab(`sale`)}
                >
                    Sales
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "sale" &&
                    <>
                        {data && data.sale ?
                        (
                            <div>
                                <SaleMenu data={data.sale} type_menu="inner"/>
                            </div>
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
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:ErrorSale | undefined}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"error_sale",data,allowedFields:["id","id_sale","waste","reajusted_price","description"]})
    const {data:sale_data} = useGetData("sale")
    
    return (
        <div className="form-container select-menu">
            <button onClick={resetForm}>Reset</button>
            {form?.id ?
                (
                    <div>ID Seleccionado {form?.id}</div>
                )
                :
                (
                    <div>Nada</div>
                )
                }
                
                <form onSubmit={handleSubmit}>
                    {sale_data &&
                        <label> Sale
                            <select name="id_sale" value={form.id_sale} onChange={handleChange}>
                                {sale_data.sort((a,b) => a.id - b.id).map((sale) => (
                                    <option key={`sale-${sale.id}`} value={sale.id}>{sale.uuid}</option>
                                ))
                                }
                            </select>
                        </label>
                    }
                    <label>Name:
                        <input name="waste" type="number" onChange={handleChange} value={form?.waste ?? ""}/>
                    </label>
                    <label>Reajusted Price:
                        <input name="reajusted_price" type="number" onChange={handleChange} value={form?.reajusted_price ?? ""}/>
                    </label>
                    <label>Description:
                        <textarea name="description" onChange={handleChange} value={form?.description ?? ""}></textarea>
                    </label>
                    <button type="submit">
                        {form.id ? "Updatear" : "Crear"}
                    </button>
                </form>
        </div>
    );
}