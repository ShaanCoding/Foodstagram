import axios from "axios";
import { useMutation, useQuery } from "react-query";

import GetEndpoint from "./util/GetEndpoint";

export interface CreateNewBusinessPost {
  picture: string;
  caption: string;
  location: string;
  businessState: number;
  dateTime: string;
  account_id: number;
  categories: string;
}

export function UseCreateBusinessPostMutation() {
  return useMutation(
    ["createpost"],
    (variables: CreateNewBusinessPost) =>
      axios.post(`${GetEndpoint("api")}/businessPosts`, variables),
    { retry: false }
  );
}


export interface UpdateBusinessPost {
	post_id: number
	caption: string
	location: string
  businessState: number
  dateTime?: string
  categories?: string
}

export function UseUpdateBusinessPostMutation() {
	return useMutation(
		['updatepost'],
		(variables: UpdateBusinessPost) =>
			axios.put(`${GetEndpoint('api')}/businessPosts/${variables.post_id}`, variables),
		{ retry: false }
	)
}