import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    description?: string;
    error?: string;
    className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ 
    name, 
    label, 
    placeholder, 
    value, 
    onChange, 
    type = "text", 
    description, 
    error,
    className = ""
}) => (
    <div className="space-y-1">
        <Label htmlFor={name} className="text-white font-sans">{label}</Label>
        <Input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`bg-white text-slate-800 placeholder:text-gray-500 font-sans ${error ? 'border-2 border-red-500' : ''} ${className}`}
            required
        />
        {description && <p className="text-xs text-gray-200 mt-1 font-sans">{description}</p>}
        {error && <p className="text-red-400 text-sm mt-1 font-sans">{error}</p>}
    </div>
);