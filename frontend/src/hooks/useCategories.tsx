"use client";
import { getAllCategories } from "@/app/api/categories.api";
import { useCategoriesStore } from "@/store/product.store";
import {
  /* Categorie, */ QueryCategoryResponse,
} from "@/types/categories.type";
import {
  /* useMutation, useQueryClient, */ useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";

export function useCategories() {
  /* const queryClient = useQueryClient(); */
  const { setData } = useCategoriesStore();

  const { data, error, isFetching } = useQuery<
    QueryCategoryResponse,
    AxiosError
  >({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // ejemplo de agregar categoria
  // const addCategoryQuery = useMutation({
  //   mutationFn: functionAddCategorieToApi,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["categories"] });
  //   },
  // });

  useEffect(() => {
    if (data?.data) {
      setData(data.data);
    }
  }, [data, setData]);

  return {
    categoriesData: data?.data ?? [],
    categoriesError: data?.error || error,
    isFetchingCategorie: isFetching,

    //ejemplo retorno de informacion
    // addProduct: addCategoryQuery.mutate // esta es una funcion que le pasas la nueva categoria
    // isAdding: addCategoryQuery.isPending // boolean
    // addingError: addCategoryQuery.data // string (siempre y cuando el try catch de la funcion retorne string)
  };
}
