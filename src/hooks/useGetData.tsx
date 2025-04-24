import { useState, useEffect } from "react";
import {type TypeDict,ENDPOINT} from "src/types/database_types"

export function useGetData<K extends keyof TypeDict>(typeKey:K,querys?:string){

    type SelectedType = TypeDict[typeof typeKey];

    const [data,setData] = useState<SelectedType[]>([]);
    let endpoint = ENDPOINT[typeKey]
    if(querys){
        endpoint = endpoint + querys
    }

    const apiUrl = import.meta.env.PUBLIC_API_URL  + endpoint

    const fetchData = async () => {
        try{
            if(!apiUrl.includes("null")){
                const response = await fetch(apiUrl);
                if(response.ok){
                    const json = await response.json();
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

    useEffect(() => {
        fetchData()
    },[apiUrl,typeKey]);

    const resetData = () => {
        setData([])
    }

    return {data,refetch:fetchData,resetData};
}