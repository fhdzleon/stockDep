import Image from "next/image";


function HeroSection() {
  return (
    <section
      id="hero"
      className="flex scroll-mt-40 flex-col md:flex-row justify-between items-center"
    >
      <Image
        width={900}
        height={900}
        src="/assets/landing/hero-img.jpg"
        alt="Imagen encabezado"
        className="object-cover w-full md:w-1/2 h-100"
      />

      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <div className="flex flex-col items-center justify-center w-full md:w-4/5 lg:w-1/2 p-4 md:p-0">
          <h1 className="text-4xl text-center text-primary font-bold mb-4">
            Stockify: Simplifica tu inventario, optimiza tu negocio
          </h1>

          <p className="text-center text-textPrimary">
            Aumente sus ventas y realice un seguimiento de cada unidad con
            nuestro software de gestión de stock y control de inventario.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
