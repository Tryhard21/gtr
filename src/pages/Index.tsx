import RegistrationForm from "@/components/RegistrationForm";
import { Separator } from "@/components/ui/separator";
import { Meteors } from "@/components/meteors";
import React from "react";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans overflow-hidden">
      {/* Meteor background (fijo, por debajo del main, visible siempre) */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          width: "100vw",
          height: "100vh"
        }}
      >
        <Meteors number={50} />
      </div>
      {/* Grid decorativo encima de meteoritos pero detrás de main */}
      <div className="absolute inset-0 h-full w-full z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>
      <main className="w-full max-w-4xl mx-auto space-y-8 z-20">
        <header className="text-center space-y-4 animate-fade-in">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat-alt-bold drop-shadow-gold leading-tight">
            Danny Antonucci
            <span className="mt-1 block text-2xl font-montserrat-alt-bold sm:text-3xl md:text-4xl">
              GLOBAL TRADING ROOM
            </span>
          </h1>
          <Separator className="bg-primary/50 max-w-sm mx-auto" />
        </header>

        <section className="text-center text-md sm:text-lg text-gray-300 space-y-4 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
          <p className="font-montserrat-alt-medium">
            Nos alegra mucho que estés aquí para unirte a nuestra sala operacional <strong className="text-primary font-montserrat-alt-bold">GRATUITA</strong>.
          </p>
          <p className="font-montserrat-alt-medium">
            Una vez completado esto, te daremos los accesos para que puedas unirte a nuestra increíble comunidad de traders. Si hay algún error o duda con lo solicitado en este formulario, te contactaremos personalmente.
          </p>
        </section>

        <div className="animate-fade-in [animation-delay:400ms]">
          <RegistrationForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
