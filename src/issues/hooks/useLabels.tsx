import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { Sleep } from "../../helpers/sleep";

const getLabels = async():Promise<Label[]> => {
  await Sleep(2);
  const {data} = await githubApi.get<Label[]>('/labels?per_page=100');
  // console.log(data)
  return data;
}

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60 * 24 * 30 // 30 days
    staleTime: 1000 * 60 *60,
    // initialData: [],
    placeholderData: [{
      color: "b60205",
      default:false,
      id: 725156255,
      name: "good first issue (taken)",
      node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
      url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)"
    }]
  });
  
  return {
    labelsQuery
  };
}
