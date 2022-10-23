import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
    email: string
    username: string
}

export default function UsePasswordResetMutation() {
    return useMutation(['passwordreset'], (variables: MutationVariables) =>
        axios
            .post(`${GetEndpoint('api')}/passwordreset`, {
                email: variables.email,
                username: variables.username,
            })
            .then((res) => res)
    )
}