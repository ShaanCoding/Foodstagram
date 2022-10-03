import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export interface ProfilePic {
    image: string;
}

export function UseProfilePicMutation(username: string) {
    return useMutation(['profilePic', username], (variables: ProfilePic) =>
        axios
            .post(`${GetEndpoint('api')}/profilePic/${username}`, variables)
            .then((res) => res),
        { retry: false }
    )
}