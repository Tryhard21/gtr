import React from 'react';

export const PageDescription: React.FC = () => {
    return (
        <section className="text-center text-md sm:text-lg text-gray-300 space-y-4 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
            <p className="font-montserrat-alt-medium">
                Nos alegra mucho que estés aquí para unirte a nuestra sala operacional{" "}
                <strong className="text-primary font-montserrat-alt-bold">GRATUITA</strong>.
            </p>
            <p className="font-montserrat-alt-medium">
                Una vez completado esto, te daremos los accesos para que puedas unirte a nuestra increíble 
                comunidad de traders. Si hay algún error o duda con lo solicitado en este formulario, 
                te contactaremos personalmente.
            </p>
        </section>
    );
};