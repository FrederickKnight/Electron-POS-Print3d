import React,{useEffect, useState} from "react";
import "@styles/menus.css"

import type { Subtheme } from "@ctypes/database_types";

import PrintModelMenu from "./print_model_menu";
import { useSendForm } from "@hooks/useSendForm";

export interface Props {
  data: Subtheme;
  type_menu:string;
}


export default function SubthemeMenu(props:Props){
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

function InnerMenu({data}:{data:Subtheme}){
    return (
        <>
            <h2>Subtheme Inner</h2>
            <div>
                <div>Subtheme ID: {data.id}</div>
                <div>Description: {data.description}</div>
                <div>Theme: {data.theme?.name}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:Subtheme}){
    const [activeTab, setActiveTab] = useState("print_model");
    return (
        <>
            <h2>Subtheme Menu</h2>
            <h4>Subtheme Number: {data?.id}</h4>
            <h4>Theme: {data?.theme?.name}</h4>
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
                                    data.print_models.map((print_model, index) => (
                                        <div key={index}>
                                            <PrintModelMenu data={print_model} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <PrintModelMenu data={data.print_models} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Models
                                </>
                            )}
                    </>
                }
                </div>
            </div>
        </>
    )
}

function Controll({data}:{data:Subtheme}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({endpoint:"subtheme",typeKey:"subtheme",data})

    return (
        <>
            <button onClick={resetForm}>Reset</button>
            <button onClick={() => {console.log(JSON.stringify(form))}}>??</button>
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
                <label>Name:
                    <input name="name" type="text" value={form?.name ?? ""} onChange={handleChange}/>
                </label>
                <label>Description:
                    <textarea name="description" onChange={handleChange} value={form?.description ?? ""}></textarea>
                </label>
                <label>ID Theme:
                    <input name="id_theme" type="number" onChange={handleChange} value={form?.id_theme !== undefined && form?.id_theme !== null ? form.id_theme : ""}/>
                </label>
                <button type="submit">
                    {form.id ? "Updatear" : "Crear"}
                </button>
            </form>
        </>
  );
}