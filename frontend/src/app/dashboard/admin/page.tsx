"use client";

import { useState } from "react";
import { useUserStore } from "@/store/user.store";

const Page = () => {
  const { data } = useUserStore();

  type Category = string;

  interface FieldState {
    field: string;
  }

  const defaultCategories: Category[] = ["Categoría 1", "Categoría 2"];

  const [customFields, setCustomFields] = useState<string[]>(defaultCategories);
  const [newField, setNewField] = useState<FieldState>({ field: "" });

  const addField = () => {
    if (newField.field.trim() && customFields.length < 10) {
      setCustomFields([...customFields, newField.field.trim()]);
      setNewField({ field: "" });
    }
  };

  const removeField = (field: string) => {
    setCustomFields(customFields.filter((f) => f !== field));
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2 text-primary"
          htmlFor="nombre"
        >
          Nombre de la Empresa
        </label>
        <input
          id="nombre"
          type="text"
          disabled
          className="input input-ghost input-primary placeholder:text-gray-700 w-full sm:w-96 md:w-[500px] lg:w-[600px] max-w-full px-4 py-2 bg-background"
          placeholder={data?.nameCompany}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2 text-primary"
          htmlFor="rubro"
        >
          Rubro de la Empresa
        </label>
        <input
          id="rubro"
          type="text"
          disabled
          className="input  input-ghost input-primary w-full sm:w-96 md:w-[500px] lg:w-[600px] max-w-full px-4 py-2 bg-background"
          placeholder={data?.businessArea}
        />
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-primary">Creación de campos</h3>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="fieldType"
              className="radio mr-2 input-primary"
            />
            <span className="text-sm">
              Automático (Código, Nombre del Producto, Categoría, Caducidad,
              Precio Inicial, Precio Venta, Cantidad, Estado)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="fieldType"
              className="radio mr-2 border-primary"
            />
            <span className="text-sm">Personalizado (Máximo 10 campos)</span>
          </label>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            className="input   input-ghost input-primary w-full sm:w-96 md:w-[500px] lg:w-[600px] max-w-full px-4 py-2 bg-background"
            placeholder="Agregar campo personalizado"
            value={newField.field}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewField({ field: e.target.value })
            }
          />
          <button
            className="btn btn-circle size-10 btn-outline btn-sm border-2 border-primary text-primary hover:bg-primary hover:text-white"
            onClick={addField}
            disabled={!newField.field.trim() || customFields.length >= 10}
          >
            +
          </button>
        </div>
      </div>
      <hr className="h-px my-4 border-primary border-2" />
      <div className="p-4 bg-background shadow-md rounded-lg flex flex-col items-start">
        {/* Título de la sección */}
        <h3 className="text-lg font-semibold mb-4 text-primary">
          Campos creados
        </h3>
        {/* Lista de campos creados */}
        <div className="flex flex-wrap gap-4 mb-8">
          {customFields.map((field, index) => (
            <div
              key={index}
              className="flex items-center bg-primary text-white py-2 px-4 rounded-lg"
            >
              <span>{field}</span>
              <button
                className="btn btn-sm btn-circle btn-ghost ml-2 text-white hover:text-gray-300"
                onClick={() => removeField(field)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Botón Guardar Cambios */}
        <div className="flex justify-end w-full">
          <button className="btn bg-primary text-white">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
