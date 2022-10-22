import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
    username: string
}

export default function PasswordResetMutation() {
    return useMutation(['passwordreset'], (variables: MutationVariables) =>
        axios
            .post(`${GetEndpoint('api')}/passwordreset`, {
                username: variables.username,
            })
            .then((res) => res)
    )
}