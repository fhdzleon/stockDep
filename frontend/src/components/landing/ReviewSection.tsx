import Image from "next/image";

function ReviewSection() {
  return (

    <section id="reviews">
      <h2 className="text-4xl text-center text-primary font-bold mb-4">
        ¿Qué dicen nuestros clientes?
      </h2>

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-evenly w-full gap-4  p-4">
        <div className="flex flex-row items-center justify-between gap-8 w-[80%] md:w-[40%] p-4 rounded-lg border-2 border-primary">
          <div className="flex flex-col items-center justify-center gap-4 w-1/2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/testimonial-1.jpg"
              alt="Imagen cliente"
              className="object-cover aspect-square w-[150px] rounded-full"
            />

            <p className="text-center text-textPrimary font-bold">
              Mariela Herrera
            </p>
            <p className="text-center text-textPrimary">Alicorp Empresa</p>
          </div>

          <p className="w-1/2">
            Stockify me ha facilitado enormemente la gestión de mi inventario.
            Ahora puedo agregar productos, registrar salidas y consultar
            estadísticas en segundos. ¡Es una herramienta imprescindible para mi
            negocio!
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 w-[80%] md:w-[40%] p-4 rounded-lg border-2 border-primary">
          <div className="flex flex-col items-center justify-center w-1/2 gap-4">
            <Image
              width={900}
              height={900}
              src="/assets/landing/testimonial-2.jpg"
              alt="Imagen cliente"
              className="object-cover aspect-square w-[150px] rounded-full"
            />

            <p className="text-center text-textPrimary font-bold">
              Samuel Florez
            </p>
            <p className="text-center text-textPrimary">Emprendedor</p>
          </div>

          <p className="w-1/2">
            Me encanta lo fácil que es buscar productos en Stockify y llevar el
            control de las salidas. Desde que uso esta herramienta, he reducido
            errores en mi inventario y mejorado la satisfacción de mis clientes.
            ¡La recomiendo al 100%!
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 w-[80%] md:w-[40%] m-auto p-4 rounded-lg border-2 border-primary">
          <div className="flex flex-col items-center w-1/2 justify-center gap-4">
            <Image
              width={900}
              height={900}
              src="/assets/landing/testimonial-3.jpg"
              alt="Imagen cliente"
              className="object-cover aspect-square w-[150px] rounded-full"
            />

            <p className="text-center text-textPrimary font-bold">
              Andrea Figueroa
            </p>
            <p className="text-center text-textPrimary">Emprendedora</p>
          </div>

          <p className="w-1/2">
            La plataforma de Stockify es súper intuitiva y eficiente. Gracias a
            sus informes estadísticos, puedo tomar mejores decisiones y mantener
            mi inventario bajo control. Definitivamente una inversión que vale
            la pena.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
