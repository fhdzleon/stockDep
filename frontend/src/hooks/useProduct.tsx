"use client";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getAllProducts,
  putProduct,
  deleteProduct,
  postProduct,
} from "@/app/api/product.api";
import { QueriesResponse } from "@/types/product.types";
import { useUserStore } from "@/store/user.store";

export function useProducts() {
  const queryClient = useQueryClient();
  const { data } = useUserStore();


  const {
    data: productsQuery,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    error,
    isFetching,
  } = useInfiniteQuery<QueriesResponse>({
    queryKey: ["infinityProducts", data?.id],
    queryFn: ({ pageParam = 1 }) => getAllProducts(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined;
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const addProductQuery = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["infinityProducts", data?.id],
        refetchType: "active"
      });
    },
  });

  const updateProductQuery = useMutation({
    mutationFn: putProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["infinityProducts", data?.id],
        refetchType: "active"
      });
    },
  });

  const deleteProductQuery = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["infinityProducts", data?.id],
        refetchType: "active"
      });
    },
  });

  return {
    products: productsQuery,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,

    createProduct: addProductQuery.mutateAsync,
    updateProduct: updateProductQuery.mutateAsync,
    deleteProduct: deleteProductQuery.mutateAsync,


    isCreating: addProductQuery.isPending,
    isUpdating: updateProductQuery.isPending,
    isDeleting: deleteProductQuery.isPending,

    createError: addProductQuery.error,
    updateError: updateProductQuery.error,
    deleteError: deleteProductQuery.error,
  };
}