import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi"
import type { Issue } from "../interfaces/issue"

const getIssues = async ():Promise<Issue[]> => {
  const {data} = await githubApi.get<Issue[]>('/issues');
  return data;
}

export const useIssues = () => {
  const issuesQuery = useQuery<Issue[]>({
    queryKey: ['issues'],
    queryFn: getIssues,
  });
  
  return {
    issuesQuery,
  }
}
