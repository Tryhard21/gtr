
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    description?: string;
    error?: string;
};

const inputClassName = "bg-white text-slate-800 placeholder:text-gray-500";
const errorClassName = "text-red-400 text-sm mt-1";

export const FormInput = ({ name, label, placeholder, value, onChange, type = "text", description, error }: FormInputProps) => (
    <div className="space-y-1">
        <Label htmlFor={name} className="text-white">{label}</Label>
        <Input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${inputClassName} ${error ? 'border-2 border-red-500' : ''}`}
            required
        />
        {description && <p className="text-xs text-gray-200 mt-1">{description}</p>}
        {error && <p className={errorClassName}>{error}</p>}
    </div>
);
