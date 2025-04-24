import React,{useState} from "react";
import type { GeneralPrice } from "@ctypes/database_types";
import "@styles/menus.css"

import SaleMenu from "./sale_menu";
import { useSendForm } from "@hooks/useSendForm";
import { useGetData } from "@hooks/useGetData";

export interface Props {
  data: GeneralPrice;
  type_menu:string;
}


export default function GeneralPriceMenu(props:Props){
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

function InnerMenu({data}:{data:GeneralPrice}){
    return (
        <>
            <h2>General Price Inner</h2>
            <div>ID Price: {data.id}</div>
            <div>Date {data.date}</div>
            <div>Electricity {data.electricity}</div>
            <div>
                Failure Risk
                <ul>
                    <li>Low {data.failure_risk?.low}</li>
                    <li>Medium {data.failure_risk?.medium}</li>
                    <li>High {data.failure_risk?.high}</li>
                </ul>
            </div>
            <div>Material Type {String(data.material_type)}</div>
            <div>Margin {data.margin}</div>
            <div>Wear {data.wear}</div>
            <br />
            <div>
                Formula
                <div>
                    {data.formula}
                </div>
            </div>
        </>
    )
}

function Menu({data}:{data:GeneralPrice}){
    const [activeTab, setActiveTab] = useState("material_type");
    return (
        <>
            <h2>General Price Menu</h2>
            <h4>General Price id: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `material_type` ? `active` : ``}
                    onClick={() => setActiveTab(`material_type`)}
                >
                    Material Type
                </button>
                <button className={activeTab === `sale` ? `active` : ``}
                    onClick={() => setActiveTab(`sale`)}
                >
                    Sales
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "sale" &&
                    <>
                        {data && data.sales ?
                        (
                            Array.isArray(data.sales) ? (
                                data.sales.map((sale,index) => (
                                    <div key={index}>
                                        <SaleMenu data={sale} type_menu="inner" />
                                    </div>
                                ))
                            ) :(
                                <div>
                                    <SaleMenu data={data.sales} type_menu="inner" />
                                </div>
                            )
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
                {activeTab === "material_type" &&
                    <>
                        {data && data.material_type ?
                        (
                            <div>
                                Material Type
                            </div>
                        )
                        :
                        (
                            <>
                                No data for Material Type
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

function Controll({data}:{data:GeneralPrice}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"general_price",data,allowedFields:["id","id_material_type","date","wear","electricity","margin","failure_risk","formula"]})
        const {data:material_type_data} = useGetData("material_type")
    
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
                    {material_type_data &&
                            <label> Material Type
                                <select name="id_material_type" value={form.id_material_type} onChange={handleChange}>
                                    {material_type_data.sort((a,b) => a.id - b.id).map((material_type) => (
                                        <option key={`material_type-${material_type.id}`} value={material_type.id}>{material_type.name}</option>
                                    ))
                                    }
                                </select>
                            </label>
                        }
                    <label>Date:
                            <input name="date" type="text" value={form?.date ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Wear:
                            <input name="wear" type="number" value={form?.wear ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Electricity:
                            <input name="electricity" type="number" value={form?.electricity ?? ""} onChange={handleChange}/>
                    </label>
                    <label>Margin:
                            <input name="margin" type="number" value={form?.margin ?? ""} onChange={handleChange}/>
                    </label>
                    <div>
                        #failure risk
                    </div>
                    <div>
                        #formula
                    </div>
                    <button type="submit">
                        {form.id ? "Updatear" : "Crear"}
                    </button>
                </form>
            </>
        );
}