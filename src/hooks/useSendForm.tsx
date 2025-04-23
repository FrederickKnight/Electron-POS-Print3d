import React,{ useState, useEffect } from "react";
import type {TypeDict} from "src/types/database_types"
import { handleForm } from "@lib/handle_form";


export interface Props<K extends keyof TypeDict>{
    endpoint:string;
    typeKey: K;
    data: TypeDict[K] | undefined;
    allowedFields: string[];
}


export function useSendForm<K extends keyof TypeDict>(props:Props<K>){
    const {endpoint,typeKey,data,allowedFields} = props
    type SelectedType = TypeDict[typeof typeKey];

    const [form,setForm] = useState<Partial<SelectedType>>({})
    const [method,setMethod] = useState<"POST" | "PUT">("POST")

    function resetForm(){
        setForm({})
        setMethod("POST")
    }
    
    useEffect(() => {
        if(data !== undefined){
            setForm((data))
            setMethod("PUT")
        }
        else{
            resetForm()
        }
    },[data])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target;
        if (allowedFields && !allowedFields.includes(name)) return;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        
        const allowed_values = Object.fromEntries(Object.entries(form).filter(([Key,_]) => allowedFields.includes(Key)))
        console.log(`allowed : ${JSON.stringify(allowed_values)}`)
        if (form){
            handleForm({
                formData:allowed_values,
                endpoint: endpoint,
                method,
            })
        }  
    }

    return {form,resetForm,handleSubmit,handleChange}

}