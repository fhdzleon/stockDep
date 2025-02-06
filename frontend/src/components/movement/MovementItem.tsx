import { MovementItem } from "@/types/movements.type"
import { formatFecha } from "@/utils/formatFullDate";
import clsx from "clsx";

interface ItemProps {
  mov: MovementItem,
}

function MovementItemx({ mov }: ItemProps) {
  const clax = clsx("px-2 items-center flex rounded-full font-bold w-fit uppercase", {
    "text-teal-800 bg-teal-200": mov.type === "Salida",
    "text-yellow-800 bg-yellow-200": mov.type === "Entrada"
  })

  const iconClass = mov.type === "Entrada" ? "icon-[mdi--arrow-bottom-left-thick]" : "icon-[mdi--arrow-top-right-thick]"

  const motive = clsx("px-2 gap-1 flex rounded-full items-center font-bold w-fit uppercase", {
    "text-rose-800 bg-rose-200": mov.motive === "devolución",
    "text-sky-800 bg-sky-200": mov.motive === "reabastecimiento",
    "text-green-800 bg-green-200": mov.motive === "venta",
    "text-violet-800 bg-violet-200": mov.motive === "caducidad",
    "text-orange-800 bg-orange-200": mov.motive === "dañado",
  })


  type MotiveType = 'devolución' | 'reabastecimiento' | 'venta' | 'caducidad' | 'dañado';

  const motiveIcon: Record<MotiveType, string> = {
    "devolución": "icon-[mdi--cash-minus]",
    "reabastecimiento": "icon-[material-symbols--inventory-rounded]",
    "venta": "icon-[mdi--cash-plus]",
    "caducidad": "icon-[mdi--clock-alert-outline]",
    "dañado": "icon-[hugeicons--broken-bone]",
  }


  const motiveIconSelected = motiveIcon[mov.motive as MotiveType]

  const createdAt = formatFecha(mov.createdAt).split(',')

  const date = createdAt[0]
  const hour = createdAt[1].trim()


  return (
    <>
      <td data-label="Producto">{mov.Product.name}</td>
      <td data-label="Cantidad">{mov.movQuantity}</td>
      <td data-label="Tipo" >
        <div className="flex justify-end md:justify-start">
          <div className={clax}>
            <span className={iconClass} role="img" aria-hidden="true" />
            <small>{mov.type}</small>
          </div>
        </div>
      </td>
      <td data-label="Motivo">
        <div className="flex justify-end md:justify-start">
          <div className={motive}>
            <span className={motiveIconSelected} role="img" aria-hidden="true" />
            <small>{mov.motive}</small>
          </div>
        </div>
      </td>
      <td data-label="Fecha">
        <div className="flex justify-end md:justify-start">
          <div className="flex items-center gap-1  border-zinc-500 border rounded-full px-2">
            <span className="icon-[lets-icons--date-range-light]" role="img" aria-hidden="true" />
            <span>{date}</span>
          </div>
        </div>
      </td>
      <td data-label="Hora">
        <div className="flex justify-end md:justify-start">
          <div className="flex items-center gap-1  border-zinc-500 border rounded-full px-2">
            <span className="icon-[tabler--clock-hour-9]" role="img" aria-hidden="true" />
            <span>{hour}</span>
          </div>
        </div>
      </td>

    </>
  )
}

export default MovementItemx