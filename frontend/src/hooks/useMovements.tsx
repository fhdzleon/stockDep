"use client";

import { getAllMovements, postOneMovement } from "@/app/api/movements.api";
import { useUserStore } from "@/store/user.store";
import { QuerieMovementResponse } from "@/types/movements.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMovements() {
  const queryClient = useQueryClient();
  const { data: userData } = useUserStore();
  const { data, error, isFetching } = useQuery<
    QuerieMovementResponse,
    AxiosError
  >({
    queryKey: ["moves"],
    queryFn: getAllMovements,
  });

  const addMovementQuery = useMutation({
    mutationFn: postOneMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["moves", "allProducts"],
        refetchType: "active",
      });
      if (userData?.id) {
        queryClient.invalidateQueries({
          queryKey: ["infinityProducts", userData.id],
          refetchType: "active",
        });
      }
      queryClient.refetchQueries({
        queryKey: ["moves"],
      });
    },
  });

  return {
    movements: data?.data ?? [],
    movementError: error,
    isFetchingMovement: isFetching,

    createMovement: addMovementQuery.mutateAsync,
    isCreatinMovement: addMovementQuery.isPending,
    createMovementResponse: addMovementQuery.data,
  };
}
