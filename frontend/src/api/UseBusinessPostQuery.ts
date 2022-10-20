import axios from "axios";
import { useMutation, useQuery } from "react-query";
import GetEndpoint from "./util/GetEndpoint";

export default function UseBusinessPostQuery() {
  return useQuery(["viewposts"], () =>
    axios.get(`${GetEndpoint("api")}/viewBusinessPosts`).then((res) => res)
  );
}
