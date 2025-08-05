import { useQuery } from "@tanstack/react-query";

interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  recentSubmissions: Array<{
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded";
    timestamp: string;
  }>;
}

export function useLeetCodeStats(username: string) {
  return useQuery<LeetCodeStats>({
    queryKey: ["/api/leetcode", username],
    enabled: !!username,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 30, // 30 minutes
  });
}
