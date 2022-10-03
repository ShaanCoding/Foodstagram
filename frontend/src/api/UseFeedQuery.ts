import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export default function UseFeedQuery() {
	return useQuery(['feed'], () =>
		axios.get<RootObject>(`${GetEndpoint('api')}/feed`).then((res) => res)
	)
}

interface RootObject {
	posts: Post[];
}

interface Post {
	post_id: number;
	account_id: number;
	username: string;
	profile_picture_url: string;
	location_name: string;
	location_lat: string;
	location_long: string;
	caption: string;
	created_at: string;
	updated_at: string;
	post_image: string;
}