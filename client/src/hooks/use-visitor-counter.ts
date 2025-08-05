import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  onlineUsers: number;
  pageViews: number;
  uniqueVisitors: number;
  averageSessionTime: string;
  topCountries: Array<{
    country: string;
    flag: string;
    visitors: number;
  }>;
}

export function useVisitorCounter() {
  const queryClient = useQueryClient();

  const stats = useQuery<VisitorStats>({
    queryKey: ["/api/visitor-stats"],
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const incrementVisitor = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/visitor-increment", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/visitor-stats"] });
    },
  });

  return {
    stats: stats.data,
    isLoading: stats.isLoading,
    error: stats.error,
    incrementVisitor: incrementVisitor.mutate,
  };
}
