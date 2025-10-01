import { useState } from 'react';
import { projectAPI } from './projectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Project } from './Project';

export function useProjects() {
  const [page, setPage] = useState(0);
  const queryInfo = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectAPI.get(page + 1),
    placeholderData: (previousData) => previousData,
  });
 
  return { ...queryInfo, page, setPage };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => projectAPI.put(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}