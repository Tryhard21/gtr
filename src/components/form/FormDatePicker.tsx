
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

type FormDatePickerProps = {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ label = "Fecha", value, onChange }) => {
    return (
        <div className="space-y-1">
            <Label className="text-white">{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full pl-3 text-left font-normal bg-white text-slate-800",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? format(value, "dd/MM/yyyy", { locale: es }) : <span>Selecciona una fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value ?? undefined}
                        onSelect={onChange}
                        initialFocus
                        locale={es}
                        className={cn("p-3 pointer-events-auto")}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
