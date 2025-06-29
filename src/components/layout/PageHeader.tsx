import React from 'react';
import { Separator } from "@/components/ui/separator";

export const PageHeader: React.FC = () => {
    return (
        <header className="text-center space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat-alt-bold drop-shadow-gold leading-tight">
                Danny Antonucci
                <span className="mt-1 block text-2xl font-montserrat-alt-bold sm:text-3xl md:text-4xl">
                    GLOBAL TRADING ROOM
                </span>
            </h1>
            <Separator className="bg-primary/50 max-w-sm mx-auto" />
        </header>
    );
};