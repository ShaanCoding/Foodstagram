import axios from "axios";

export let getGitHubProfile = async (user: string) => {
  let request = await axios.get(`https://api.github.com/users/${user}`);
  let response = request.data;

  // Do some sort of modification
  return response;
};
