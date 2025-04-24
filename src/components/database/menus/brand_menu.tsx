import React,{useState} from "react";
import "@styles/menus.css"

import type { BrandModel } from "@ctypes/database_types";

import { useSendForm } from "@hooks/useSendForm";

import PrintModelMenu from "./print_model_menu";

export interface Props {
  data: BrandModel;
  type_menu:string;
}


export default function BrandModelMenu(props:Props){
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

function InnerMenu({data}:{data:BrandModel}){
    return (
        <>
            <h2>Brand Inner</h2>
            <div>
                <div>Brand id: {data.id}</div>
                <div>Name {data.name}</div>
                <div>Description {data.description}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:BrandModel}){
    const [activeTab, setActiveTab] = useState("print_model");
    return (
        <>
            <h2>Brand Menu</h2>
            <h4>Brand id: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `print_model` ? `active` : ``}
                    onClick={() => setActiveTab(`print_model`)}
                >
                    Models
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "print_model" &&
                    <>
                        {data && data.print_models ? (
                                Array.isArray(data.print_models) ? (
                                    data.print_models.map((model, index) => (
                                        <div key={index}>
                                            <PrintModelMenu data={model} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <PrintModelMenu data={data.print_models} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Model
                                </>
                            )}
                    </>
                }
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:BrandModel}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"brand_model",data,allowedFields:["id","name","description"]})

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
                <label>Name:
                    <input name="name" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                </label>
                <label>Description:
                    <textarea name="description" onChange={handleChange} value={form?.description ?? ""}></textarea>
                </label>
                <button type="submit">
                    {form.id ? "Updatear" : "Crear"}
                </button>
            </form>
        </>
  )
}