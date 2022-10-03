import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export interface ProfilePic {
    image: string;
}

export function UseProfilePicMutation(profileID: string) {
    return useMutation(['profilePic', profileID], (variables: ProfilePic) =>
        axios
            .post(`${GetEndpoint('api')}/profilePic/${profileID}`, variables)
            .then((res) => res),
        { retry: false }
    )
}