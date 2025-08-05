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

// LeetCode doesn't have an official public API, so we'll use a mock implementation
// In a real application, you might use web scraping or third-party APIs
export async function getLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data based on typical LeetCode stats
    const mockStats: LeetCodeStats = {
      username,
      totalSolved: 127,
      totalQuestions: 2500,
      easySolved: 45,
      easyTotal: 800,
      mediumSolved: 62,
      mediumTotal: 1200,
      hardSolved: 20,
      hardTotal: 500,
      acceptanceRate: 78.5,
      ranking: 245689,
      contributionPoints: 1250,
      reputation: 890,
      recentSubmissions: [
        {
          title: "Two Sum",
          difficulty: "Easy",
          status: "Accepted",
          timestamp: "2 hours ago",
        },
        {
          title: "Binary Tree Inorder Traversal",
          difficulty: "Easy",
          status: "Accepted",
          timestamp: "1 day ago",
        },
        {
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          status: "Accepted",
          timestamp: "2 days ago",
        },
        {
          title: "Median of Two Sorted Arrays",
          difficulty: "Hard",
          status: "Wrong Answer",
          timestamp: "3 days ago",
        },
        {
          title: "Add Two Numbers",
          difficulty: "Medium",
          status: "Accepted",
          timestamp: "4 days ago",
        },
      ],
    };

    return mockStats;
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    throw error;
  }
}
