import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi"
import type { Issue, State } from "../interfaces/issue"
import { Sleep } from "../../helpers/sleep";

interface Props {
  state?: string;
  labels?: string[];
}

const getIssues = async (labels:string[] = [],state?:string):Promise<Issue[]> => {
  await Sleep(2);
  const params = new URLSearchParams();
  if(state) params.append('state',state);
  if(labels.length > 0) params.append('labels',labels.join(','));
  params.append('page','1');
  params.append('per_page','5');
  const {data} = await githubApi.get<Issue[]>('/issues',{params});
  return data;
}

export const useIssues = ({state,labels}:Props) => {
  const issuesQuery = useQuery<Issue[]>({
    queryKey: ['issues', {state,labels}],
    queryFn: () => getIssues(labels,state),
  });
  
  return {
    issuesQuery,
  }
}
