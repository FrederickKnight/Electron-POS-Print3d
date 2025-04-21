import React, { useState,useEffect } from 'react';
export default function UploadImage(){
    const [file,setFile] = useState<File | null>(null)
    const [uploadName,setUploadName] = useState<string | null>(null)

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length > 0){
            setFile(e.target.files[0]);
        }
    }

    async function handleClick(){
        if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/print-model/image/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadName(result.name);
        }

    } catch (error) {
      console.error("error al subir archivo")
    }
    }

    return (
        <div>
            <input type="file" onChange={handleChange}/>
            <button onClick={handleClick}>Upload</button>
            {uploadName}
            <br />
            <img src={`http://localhost:5000/api/print-model/image/${uploadName}`} alt="Image" />
        </div>
    )
}