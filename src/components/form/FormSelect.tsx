import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Option = {
    value: string;
    label: string;
};

type FormSelectProps = {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
    options: Option[];
};

const selectClassName = "bg-white text-slate-800 placeholder:text-gray-500 min-h-[40px] h-10 flex items-center font-sans";

export const FormSelect = ({ name, label, placeholder, value, onValueChange, options }: FormSelectProps) => (
    <div className="space-y-1">
        <Label htmlFor={name} className="text-white flex items-center min-h-[48px]">{label}</Label>
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger id={name} className={selectClassName}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-800 font-sans">
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value} className="font-sans">{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);