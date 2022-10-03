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
}

export function UseCreateBusinessPostMutation() {
  return useMutation(
    ["createpost"],
    (variables: CreateNewBusinessPost) =>
      axios.post(`${GetEndpoint("api")}/businessPosts`, variables),
    { retry: false }
  );
}
