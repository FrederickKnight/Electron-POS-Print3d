export interface Options<T>{
    formData: Partial<T>;
    endpoint:string;
    method?:string;
}

const API_URL = import.meta.env.PUBLIC_API_URL;


export async function handleForm<T>(options:Options<T>){
    const {formData,endpoint,method} = options

    console.log(JSON.stringify(formData))
    
    if(method === "POST"){
        delete(formData as any).id
    }

    try{
        const res = await fetch(API_URL+endpoint,{
            method,
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        
        if(!res.ok) throw new Error("error en la solicitud")
            
        const data = await res.json()
    }
    catch (error){
        console.error("handle form error:",error);
        alert("error en el formulario");
    }
}