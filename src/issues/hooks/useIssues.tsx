import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi"
import type { Issue, State } from "../interfaces/issue"
import { Sleep } from "../../helpers/sleep";
import { useEffect, useState } from "react";

interface Props {
  state?: State;
  labels: string[] | [];
  page?: number;
}

const getIssues = async ({labels,state,page}:Props):Promise<Issue[]> => {
  await Sleep(2);
  const params = new URLSearchParams();
  if(state) params.append('state',state);
  if(labels.length > 0) params.append('labels',labels.join(','));
  params.append('page',page?.toString() || '1');
  params.append('per_page','5');
  const {data} = await githubApi.get<Issue[]>('/issues',{params});
  return data;
}

export const useIssues = ({state,labels}:Props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1)
  }, [state, labels])
  
  
  const issuesQuery = useQuery<Issue[]>({
    queryKey: ['issues', {state,labels,page}],
    queryFn: () => getIssues({labels,state,page}),
  });

  const nextPage = () => {
    if(issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  }

  const prevPage = () => {
    if(page > 1)  setPage(page - 1);
  }
  
  return {
    // Properties
    issuesQuery,
    // Getter
    page,
    // Methods
    prevPage,
    nextPage,
  }
}
