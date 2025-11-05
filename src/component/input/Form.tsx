import React from "react";

interface formInputProps{
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
    icon: string;
    type?: string;
    placeholder: string;
    value? :string
}

function formInput({onChange,icon,type,placeholder,value}: formInputProps) {
    return <div className="w-2/3 flex justify-end items-center relative w-full">
          <input
            onChange={((e)=>onChange(e))}
            placeholder={placeholder}
            type={type || "text"}
            value={value || ""}
            className="border-black outline-none border-2 pl-12 text-md rounded-lg p-3 w-full"
          />
          <img
            src={icon}
            className="absolute left-0 ml-5 w-4"
            alt="password"
          />
        </div>
}

export default formInput;