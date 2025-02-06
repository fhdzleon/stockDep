import Image from "next/image";

function FeaturesSection() {
  return (
    <section id="features">
      <h2 className="text-3xl text-primary font-bold text-center m-10">
        Funcionalidades de Stockify
      </h2>

      <div className="flex flex-col items-center justify-center w-full md:flex-row p-0 sm:p-20">
        <div className="flex flex-col items-start justify-center w-full md:w-1/2  p-4 sm:pb-32 gap-10">
          <div className="flex flex-row items-center justify-center w-full">
            <Image
              width={900}
              height={900}
              src="/assets/landing/feat-1.svg"
              alt="Imagen control stock"
              className="object-cover w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]"
            />
            <div className="flex flex-col items-center justify-center w-full md:p-0">
              <h3 className="text-center font-bold">Control de Stock</h3>
              <ul className="list-disc list-inside">
                <li className="text-textPrimary text-left">
                  Registro y seguimiento de productos.
                </li>
                <li className="text-textPrimary text-left">
                  Control de niveles mínimos y máximos de inventario.
                </li>
                <li className="text-textPrimary text-left">
                  Alerta de existencias bajas o caducidad.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full p-4 md:p-0">
              <h3 className="text-center font-bold">
                Seguimiento en tiempo real
              </h3>
              <ul className="list-disc list-inside">
                <li className="text-textPrimary text-left">
                  Monitoreo del inventario en múltiples ubicaciones.
                </li>
                <li className="text-textPrimary text-left">
                  Actualización automática con entradas y salidas de productos.
                </li>
              </ul>
            </div>
            <Image
              width={900}
              height={900}
              src="/assets/landing/feat-2.svg"
              alt="Imagen control stock"
              className="object-cover w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]"
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-center w-full md:w-1/2  p-4 sm:pt-32 gap-10">
          <div className="flex flex-row items-center justify-center w-full">
            <Image
              width={900}
              height={900}
              src="/assets/landing/feat-3.svg"
              alt="Imagen control stock"
              className="object-cover w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]"
            />
            <div className="flex flex-col items-center justify-center w-full p-4 md:p-0">
              <h3 className="text-center font-bold">Gestión de Productos</h3>
              <ul className="list-disc list-inside">
                <li className="text-textPrimary text-left">
                  Ingreso de productos, mediante categorias.
                </li>
                <li className="text-textPrimary text-left">
                  Visualizacion de los productos a detalle.
                </li>
                <li className="text-textPrimary text-left">
                  Se pueden agregar los campos requeridos a su empresa.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full p-4 md:p-0">
              <h3 className="text-center font-bold">Gestión de Informes</h3>
              <ul className="list-disc list-inside">
                <li className="text-textPrimary text-left">
                  Generación de reportes detallados sobre los movimientos de los
                  productos.
                </li>
                <li className="text-textPrimary text-left">
                  Análisis de productos más vendidos o menos rentables.
                </li>
              </ul>
            </div>
            <Image
              width={900}
              height={900}
              src="/assets/landing/feat-4.svg"
              alt="Imagen control stock"
              className="object-cover w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
