import React, { useEffect, useState } from "react";
import type { PrintModel, Subtheme } from "@ctypes/database_types";
import { useSendForm } from "@hooks/useSendForm";
import { useGetData } from "@hooks/useGetData";

import "@styles/forms.css"
import "@styles/menus.css"

export interface Props {
  data: PrintModel;
  type_menu:string;
}


export default function PrintModelMenu(props:Props){
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


function InnerMenu({data}:{data:PrintModel}){
    return (
        <>
            <h2>Print Model Inner</h2>
            <div>
                <div>ID Model: {data.id}</div>
                <div>Name: {data.name}</div>
                <div>Subtheme: {data.subtheme?.name}</div>
                <div>Theme: {data.subtheme?.theme?.name}</div>
                <img src={data.url_image} alt={`Imagen de ${data.name}`} />
                <div>description: {data.description}</div>
            </div>
        </>
    )
}

function Menu({data}:{data:PrintModel}){
    return (
        <h2>Print Model Menu</h2>
    )
}

function Controll({data}:{data:PrintModel}){
    const {form,resetForm,handleSubmit,handleChange} = useSendForm({typeKey:"print_model",data,allowedFields:["id","id_subtheme","name","description","url_image"]})
    const {data:theme_data} = useGetData("theme")
    const {data:subtheme_data} = useGetData("subtheme");
    
    const [filteredSubthemes, setFilteredSubthemes] = useState<Subtheme[]>([]);

    function handleThemeChange(e:React.ChangeEvent<HTMLSelectElement>){
        const selectedTheme = parseInt(e.target.value,10);
        console.log("Selected Theme:", selectedTheme);

        if (subtheme_data){
            setFilteredSubthemes(subtheme_data.filter((subtheme) => subtheme.id_theme === selectedTheme));
            console.log("Filtered Subthemes:", filteredSubthemes);
        }
        handleChange(e);
    }
    
    useEffect(() => {
        const selectedTheme = form.subtheme?.id_theme && subtheme_data ? form.subtheme.id_theme : 1;
        setFilteredSubthemes(subtheme_data.filter((subtheme) => subtheme.id_theme === selectedTheme));
    },[form.subtheme?.id_theme,subtheme_data]);

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
                        {theme_data && 
                            <label> Theme
                                <select name="id_theme" value={form.subtheme?.id_theme} onChange={handleThemeChange}>
                                    {theme_data.sort((a,b) => a.id - b.id).map((theme) => (
                                        <option key={`theme-${theme.id}`} value={theme.id}>{theme.name}</option>
                                    ))
                                }
                                </select>
                            </label>
                        }
                        {filteredSubthemes && 
                            <label> Subtheme
                                <select name="id_subtheme" value={form.id_subtheme} onChange={handleChange}>
                                    {filteredSubthemes.sort((a,b) => a.id - b.id).map((subtheme) => (
                                        <option key={`theme-${subtheme.id}`} value={subtheme.id}>{subtheme.name}</option>
                                    ))
                                }
                                </select>
                            </label>
                        }
                        <label>Name:
                            <input name="name" type="text" onChange={handleChange} value={form?.name ?? ""}/>
                        </label>
                        <label>Description:
                            <textarea name="description" onChange={handleChange} value={form?.description ?? ""}></textarea>
                        </label>
                        <label>Image #por crear:
                            <textarea name="url_image" onChange={handleChange} value={form?.description ?? ""}></textarea>
                        </label>
                        <button type="submit">
                            {form.id ? "Updatear" : "Crear"}
                        </button>
                    </form>
            </div>
      );
}