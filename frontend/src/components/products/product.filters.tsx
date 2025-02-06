"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useFilterProduct } from "@/store/product.store";
import { useDebounce } from "use-debounce";
import { useCategories } from "@/hooks/useCategories";

function ProductFilter() {
  const { categoriesData, categoriesError, isFetchingCategorie } =
    useCategories();

  const { setFilter, cleanFilter, filter } = useFilterProduct();
  const [selectValue, setSelectValue] = useState<string>(filter);
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue] = useDebounce(inputValue, 600);

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    setFilter(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClean = () => {
    cleanFilter();
    setInputValue("");
    setSelectValue("");
  };

  useEffect(() => {
    setFilter(debouncedInputValue);
  }, [debouncedInputValue, setFilter]);

  return (
    <div className="flex flex-col gap-5 my-5">
      <span className="self-center text-2xl font-semibold">
        Encuentra tus productos
      </span>
      <div className="self-center">
        <input
          className="input input-bordered w-96 input-primary join-item"
          placeholder="Buscar..."
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button className="btn btn-ghost">
            <span
              className="icon-[solar--tuning-bold-duotone]"
              role="img"
              aria-hidden="true"
            />
            <span>Filtros</span>
          </button>
          <select
            onChange={handleChangeSelect}
            value={selectValue}
            className="select select-bordered bg-primary text-white"
          >
            {isFetchingCategorie && (
              <option className="bg-white text-primary" value="" disabled>
                Cargando...
              </option>
            )}
            {categoriesError && (
              <option className="bg-white text-primary" value="" disabled>
                Error loading categories
              </option>
            )}
            {categoriesData && (
              <>
                <option className="bg-white text-primary" value="" disabled>
                  Categoria
                </option>
                {categoriesData?.map((categoria, index) => (
                  <option
                    className="bg-white text-primary"
                    value={categoria.id}
                    key={index}
                  >
                    {categoria.name}
                  </option>
                ))}
              </>
            )}
          </select>
          <button
            onClick={handleClean}
            className="btn btn-primary flex items-center gap-1"
          >
            <span>Limpiar</span>
            <span
              className="icon-[material-symbols--cleaning-services]"
              role="img"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
