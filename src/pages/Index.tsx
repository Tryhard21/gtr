import React from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageDescription } from "@/components/layout/PageDescription";
import { MeteorEffect } from "@/components/effects/MeteorEffect";

const Index: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans overflow-hidden">
            {/* Meteor background effect */}
            <div
                aria-hidden
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <MeteorEffect number={50} />
            </div>
            
            {/* Grid decorativo */}
            <div className="absolute inset-0 h-full w-full z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>
            
            <main className="w-full max-w-4xl mx-auto space-y-8 z-20">
                <PageHeader />
                <PageDescription />
                <div className="animate-fade-in [animation-delay:400ms]">
                    <RegistrationForm />
                </div>
            </main>
        </div>
    );
};

export default Index;