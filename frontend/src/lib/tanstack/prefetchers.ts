import { getAllProducts } from "@/app/api/product.api";
import { getAllCategories } from "@/app/api/categories.api";
import { QueryClient } from "@tanstack/react-query";

export async function prefetchProducts(queryClient: QueryClient) {

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => getAllProducts(Number(pageParam)),
    initialPageParam: 1,
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}
