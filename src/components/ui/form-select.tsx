import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectOption } from '@/types/form';

interface FormSelectProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ 
    name, 
    label, 
    placeholder, 
    value, 
    onValueChange, 
    options,
    className = ""
}) => (
    <div className="space-y-1">
        <Label htmlFor={name} className="text-white flex items-center min-h-[48px] font-sans">{label}</Label>
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger id={name} className={`bg-white text-slate-800 placeholder:text-gray-500 min-h-[40px] h-10 flex items-center font-sans ${className}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-800 font-sans">
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value} className="font-sans">
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);