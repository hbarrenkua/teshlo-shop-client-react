import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import { createUpdateProductAction } from "../actions/create-update-product.action"

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, //5 minutos

    })

    //todo: manejar mutación

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product) => {
            console.log('todo super', product)
            //invalidar cacheb
            queryClient.invalidateQueries({ queryKey: ['productos'] })

            //actualizar
            queryClient.setQueryData(['product', { id: product.id }], product)
        }
    })






    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike)
    // }



    return {
        ...query,
        mutation
    }

}
