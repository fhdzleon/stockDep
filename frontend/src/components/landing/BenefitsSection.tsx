import Image from "next/image";

function BenefitsSection() {


  return (
    <section
      id="benefits"
      className="flex flex-col md:flex-row justify-between items-center"
    >
      <div className="flex flex-col items-start justify-center w-full md:w-1/2  p-12 sm:pb-32 gap-10">
        <h3 className="text-3xl text-primary font-bold text-center m-4">
          Beneficios de la gestión de stock y precios de Stockify{" "}
        </h3>
        <p className="text-center text-textPrimary">
          Con Stockify, toda la información sobre tus productos está organizada
          en una única plataforma accesible, lo que reduce el desorden y mejora
          la eficiencia operativa.
        </p>

        <ul className="list-none">
          <li className="flex items-start mb-2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/check-list.png"
              alt="Imagen Beneficios"
              className="object-cover w-[20px] h-[20px] mr-2"
            />
            <span>
              Agregar productos fácilmente: Permite añadir nuevos productos a tu
              inventario con rapidez, asegurando datos actualizados.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/check-list.png"
              alt="Imagen Beneficios"
              className="object-cover w-[20px] h-[20px] mr-2"
            />
            <span>
              Registro de salida de productos: Mantiene un control detallado de
              los movimientos del inventario, reduciendo errores y pérdidas.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/check-list.png"
              alt="Imagen Beneficios"
              className="object-cover w-[20px] h-[20px] mr-2"
            />
            <span>
              Localiza cualquier producto en tu inventario mediante un sistema
              de búsqueda optimizado.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/check-list.png"
              alt="Imagen Beneficios"
              className="object-cover w-[20px] h-[20px] mr-2"
            />
            <span>
              Ahorra tiempo al evitar la búsqueda manual en listados extensos.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/check-list.png"
              alt="Imagen Beneficios"
              className="object-cover w-[20px] h-[20px] mr-2"
            />
            <span>
              Permite prever necesidades de reposición y gestionar existencias
              adecuadamente.
            </span>
          </li>
          <li className="flex items-start mb-2">
            <Image
              width={900}
              height={900}
              src="/assets/landing/check-list.png"
              alt="Imagen Beneficios"
              className="object-cover w-[20px] h-[20px] mr-2"
            />
            <span>
              Evita sobrestock y desabastecimiento, optimizando costos y espacio
              de almacenamiento.
            </span>
          </li>
        </ul>
      </div>

      <div className="w-full h-auto relative md:w-[500px] md:h-[600px]">
        <Image
          width={900}
          height={900}
          src="/assets/landing/benefits-img.jpg"
          alt="Imagen Beneficios"
          className="object-cover w-full h-full rounded-bl-3xl rounded-tl-3xl"
        />
      </div>
    </section>
  );
}

export default BenefitsSection;
