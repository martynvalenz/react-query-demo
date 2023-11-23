import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces/issue";
import { Sleep } from "../../helpers/sleep";
import { githubApi } from "../../api/githubApi";

interface Props {
  state?: State;
  labels: string[] | [];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({pageParam = 1, queryKey}:QueryProps):Promise<Issue[]> => {
  const [,, args] = queryKey;
  const {state, labels} = args as Props;
  await Sleep(2);
  const params = new URLSearchParams();
  if(state) params.append('state',state);
  if(labels.length > 0) params.append('labels',labels.join(','));
  params.append('page',pageParam?.toString() || '1');
  params.append('per_page','5');
  const {data} = await githubApi.get<Issue[]>('/issues',{params});
  return data;
}

export const useIssuesInfinite = ({state, labels}:Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey:['issues','infinite',{state, labels}],
    queryFn:(data:QueryProps) => getIssues(data),
    initialPageParam:1,
    getNextPageParam:(lastPage, pages) => {
      if(lastPage.length === 0) return;
      return pages.length + 1;
    }
  });
  
  return {
    issuesQuery
  }
}
