'use client'
import { useProducts } from "@/hooks/useProduct"
import { IncomeMotive, MovementSchema, MovementType, SaleMotive } from "@/lib/schemas/movement.schema"
import InputGroup from "@/ui/input.group"
import SelectGroup from "@/ui/SelectGroup"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import MovementAddSkeleton from "./MovementAddSkeleton"
import { useMovements } from "@/hooks/useMovements"
import { useEffect, useState } from "react"
import { Toast } from "../toast"
import { useUserStore } from "@/store/user.store"
import Modal from "../modal"


function MovementAdd() {
  const { register, formState: { errors }, handleSubmit, reset, watch } = useForm<MovementSchema>({
    resolver: zodResolver(MovementSchema)
  })

  const { allProducts, isLoadingAllProducts } = useProducts()
  const { createMovement, createMovementResponse, isCreatinMovement } = useMovements()
  const { data: userData } = useUserStore()

  const handleSubmitForm: SubmitHandler<MovementSchema> = async (data) => {
    const newMovement = ({ ...data, userId: userData?.id })
    await createMovement(newMovement)
  }

  const typeValidation = watch('type')

  const movementTypes = Object.values(MovementType).map((type) => ({
    id: type,
    name: type,
  }));

  const saleMotives = Object.values(SaleMotive).map((type) => ({
    id: type,
    name: type
  }))

  const incomeMotives = Object.values(IncomeMotive).map((type) => ({
    id: type,
    name: type
  }))

  const typeData = typeValidation?.toString() === "Entrada" ? incomeMotives : saleMotives



  useEffect(() => {
    if (!createMovementResponse) return
    if (createMovementResponse.success) {
      reset()
      closeAdd()
      Toast.fire({
        title: "Movimiento agregado!",
        icon: "success"
      })
    } else {
      Toast.fire({
        title: createMovementResponse.error || "Error al crear movimiento",
        icon: "error"
      })
    }
  }, [createMovementResponse, reset])

  const [add, setAdd] = useState(false)
  const openAdd = () => setAdd(true)
  const closeAdd = () => setAdd(false)

  if (isLoadingAllProducts) return <MovementAddSkeleton />

  return (
    <>
      <button onClick={openAdd} className="btn btn-primary" type="submit">
        <span>Agregar</span>
        <span className="icon-[ooui--add]" role="img" aria-hidden="true" />
      </button>


      <Modal close={closeAdd} show={add} >
        <div className="bg-white flex flex-col items-center p-5 rounded gap-10">
          <span className="text-2xl text-primary font-semibold">Agregar Movimiento</span>
          <form className="grid grid-cols-6 gap-3 px-5" onSubmit={handleSubmit(handleSubmitForm)} >

            <SelectGroup disabled={isCreatinMovement} extendClass="col-span-2" {...register('productId')} data={allProducts} label="Producto" errors={errors.productId} />
            <SelectGroup disabled={isCreatinMovement} extendClass="col-span-2" {...register('type')} data={movementTypes} label="Tipo movimiento" errors={errors.type} />
            <SelectGroup disabled={!typeValidation || isCreatinMovement} extendClass="col-span-2" {...register('motive')} data={typeData} label="Motivo" errors={errors.motive} />
            <InputGroup disabled={isCreatinMovement}
              extendClass="col-span-4"
              {...register('name')}
              label="Descripción"
              id="name"
              errors={errors.name}
            />
            <InputGroup disabled={isCreatinMovement}
              extendClass="col-span-2"
              {...register('movQuantity')}
              label="Cantidad"
              id="movQuantity"
              type="number"
              errors={errors.movQuantity}
            />

            <div className="col-span-6 grid place-content-center">
              <button disabled={isCreatinMovement} className="btn btn-primary" type="submit">
                <span>Guardar</span>
                <span
                  className="icon-[lets-icons--save-duotone]"
                  role="img"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
        </div>
      </Modal>

    </>
  )
}

export default MovementAdd


