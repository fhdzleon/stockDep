import { AllProductsEndpoint, getAllProducts } from "@/app/api/product.api";
import { getAllCategories } from "@/app/api/categories.api";
import { QueryClient } from "@tanstack/react-query";
import { getAllMovements } from "@/app/api/movements.api";

export default async function prefetchTanstackData(queryClient: QueryClient) {

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infinityProducts"],
    queryFn: ({ pageParam = 1 }) => getAllProducts(Number(pageParam)),
    initialPageParam: 1,
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ["moves"],
    queryFn: getAllMovements,
  })

  await queryClient.prefetchQuery({
    queryKey: ["allProducts"],
    queryFn: AllProductsEndpoint,
  })


  // await queryClient.prefetchQuery({
  //   queryKey: ["topsoldproducts"],
  //   queryFn: getTopSoldProducts
  // })

}
