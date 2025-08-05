import { useQuery } from "@tanstack/react-query";

interface GitHubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalCommits: number;
  mostUsedLanguages: Array<{
    language: string;
    percentage: number;
    color: string;
  }>;
  contributionCalendar: Array<{
    date: string;
    count: number;
    level: number;
  }>;
  recentActivity: Array<{
    type: string;
    repo: string;
    date: string;
  }>;
}

export function useGitHubStats(username: string) {
  return useQuery<GitHubStats>({
    queryKey: ["/api/github", username],
    enabled: !!username,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 15, // 15 minutes
  });
}
