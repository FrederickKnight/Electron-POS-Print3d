import React,{useState,useEffect} from "react";
import "@styles/forms.css"
import "@styles/menus.css"

import type { Theme } from "@ctypes/database_types";

import SubthemeMenu from "./subtheme_menu";
import { useSendForm } from "@hooks/useSendForm";

export interface Props {
  data: Theme;
  type_menu:string;
}


export default function ThemeMenu(props:Props){
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

function InnerMenu({data}:{data:Theme}){
    return (
        <>
            <h2>Theme Inner</h2>
            <div>
                <div>Theme ID: {data.id}</div>
                <div>Description: {data.description}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:Theme}){
    const [activeTab, setActiveTab] = useState("subthemes");
    return (
        <>
            <h2>Theme Menu</h2>
            <h4>Theme ID: {data?.id}</h4>
            <div className="tab-container">
                <div className="tab-menu">
                <button className={activeTab === `subthemes` ? `active` : ``}
                    onClick={() => setActiveTab(`subthemes`)}
                >
                    Subthemes
                </button>
                </div>
                <div className="tab-content">
                {activeTab === "subthemes" &&
                    <>
                        {data && data.subthemes ? (
                                Array.isArray(data.subthemes) ? (
                                    data.subthemes.map((subtheme, index) => (
                                        <div key={index}>
                                            <SubthemeMenu data={subtheme} type_menu="inner"/>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <SubthemeMenu data={data.subthemes} type_menu="inner" />
                                    </div>
                                )
                            ) : (
                                <>
                                    No data for Subthemes
                                </>
                            )}
                    </>
                }
                </div>
            </div>
        </>
    )
}


function Controll({data}:{data:Theme}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"theme",data,allowedFields:["id","name","description"]})

    return (
        <div className="form-container">
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
                    <label>Name:
                        <input name="name" type="text" onChange={handleChange} value={form?.name ?? ""}/>
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