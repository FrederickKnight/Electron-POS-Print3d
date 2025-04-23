import React,{useState} from "react";
import "@styles/menus.css"

import type { Material } from "@ctypes/database_types";

import MaterialTypeMenu from "./material_type_menu";
import MaterialInventoryMenu from "./material_inventory";
import { useSendForm } from "@hooks/useSendForm";

export interface Props {
  data: Material;
  type_menu:string;
}


export default function MaterialMenu(props:Props){
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

function InnerMenu({data}:{data:Material}){
    return (
        <>
            <h2>Material Inner</h2>
            <div>
                <div>Material ID: {data.id}</div>
                <div>Name: {data.name}</div>
                <div>Brand: {data.brand}</div>
                <div>Measurement: {data.measurement_type}</div>
                <div>Color: {data.color}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:Material}){
    const [activeTab, setActiveTab] = useState("material_type");
    return (
        <>
            <h2>Material Menu</h2>
            <h4>Material id: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `material_type` ? `active` : ``}
                    onClick={() => setActiveTab(`material_type`)}
                >
                    Material Type
                </button>
                <button className={activeTab === `inventory` ? `active` : ``}
                    onClick={() => setActiveTab(`inventory`)}
                >
                    Inventory
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "material_type" &&
                    <>
                        {data && data.material_type ?
                        (
                            <div>
                                <MaterialTypeMenu data={data.material_type} type_menu="inner"/>
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
                {activeTab === "inventory" &&
                    <>
                        {data && data.inventory ?
                        (
                            <div>
                                <MaterialInventoryMenu data={data.inventory} type_menu="inner"/>
                            </div>
                        )
                        :
                        (
                            <>
                                No data for Inventory
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

function Controll({data}:{data:Material}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({endpoint:"material",typeKey:"material",data,allowedFields:["id","name","brand","measurement_type","color","id_material_type"]})
        
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
                <label>Quantity:
                        <input name="name" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                </label>
                <label>Brand:
                        <input name="brand" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                </label>
                <label>Measurement #selectable despues:
                        <input name="measurement_type" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                </label>
                <label>Color:
                        <input name="color" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                </label>
                <label>ID Material Type:
                    <input name="id_material_type" type="number" onChange={handleChange} value={form?.id_material_type !== undefined && form?.id_material_type !== null ? form.id_material_type : ""}/>
                </label>
                <button type="submit">
                    {form.id ? "Updatear" : "Crear"}
                </button>
            </form>
        </>
    );
}