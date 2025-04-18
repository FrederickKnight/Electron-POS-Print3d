import { useState, useEffect } from "react";
import type {TypeDict} from "src/types/database_types"

export function useGetData<K extends keyof TypeDict>(endpoint:string,typeKey:K){

    type SelectedType = TypeDict[typeof typeKey];

    const [data,setData] = useState<SelectedType[]>([]);
    const apiUrl = import.meta.env.PUBLIC_API_URL + endpoint;

    useEffect(() => {
        const fetchData = async () => {
            try{
                if(!apiUrl.includes("null")){
                    const response = await fetch(apiUrl);
                    if(response.ok){
                        const json = await response.json();
                        console.log(json.response)
                        setData(json.response)
                    }
                    else{
                        console.error("Error al obtener los datos:", response.statusText);
                        setData([])
                    }
                }
            }
            catch(error){
                setData([])
            }
        }
        fetchData()
    },[endpoint,typeKey]);

    return data;
}