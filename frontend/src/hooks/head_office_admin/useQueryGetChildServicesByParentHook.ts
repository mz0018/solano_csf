import { useQuery } from "@tanstack/react-query"
import { getChildServicesByParentService } from "../../services/HeadOfficeAdminService"

export const useQueryGetChildServicesByParentHook = () => {
  return useQuery({
        queryKey: ["office-child-services"],
        queryFn: getChildServicesByParentService,
        staleTime: 1000 * 60 * 60,
  });
};