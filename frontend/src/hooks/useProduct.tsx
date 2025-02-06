"use client";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  getAllProducts,
  putProduct,
  deleteProduct,
  postProduct,
  AllProductsEndpoint,
} from "@/app/api/product.api";
import { ProductsResponse, QueriesResponse } from "@/types/product.types";
import { useUserStore } from "@/store/user.store";
// import { getTopSoldProducts } from "@/app/api/movements.api";


interface AllProductsResponse {
  data: ProductsResponse[]
}

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

  const allProducts = useQuery<AllProductsResponse>({
    queryKey: ["allProducts"],
    queryFn: AllProductsEndpoint,
  })


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



  // const { } = useQuery({
  //   queryKey: ["topsoldproducts"],
  //   queryFn: getTopSoldProducts
  // })



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

    createResponse: addProductQuery.data,
    updateResponse: updateProductQuery.data,
    deleteResponse: deleteProductQuery.data,


    allProducts: allProducts?.data?.data.map((product) => {
      return { id: product.id, name: product.name }
    }) ?? [],
    isLoadingAllProducts: allProducts.isLoading,
    errorAllProducts: allProducts.error,

  };
}


