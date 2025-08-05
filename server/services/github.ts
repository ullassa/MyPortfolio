interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
}

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

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_API_KEY;

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Vue: "#2c3e50",
  React: "#61dafb",
};

async function fetchGitHubAPI(endpoint: string) {
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-App",
  };

  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  try {
    // Fetch user data
    const user: GitHubUser = await fetchGitHubAPI(`/users/${username}`);
    
    // Fetch repositories
    const repos: GitHubRepo[] = await fetchGitHubAPI(`/users/${username}/repos?per_page=100&sort=updated`);
    
    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    // Calculate language statistics
    const languageStats: Record<string, number> = {};
    let totalRepos = 0;
    
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        totalRepos++;
      }
    });
    
    const mostUsedLanguages = Object.entries(languageStats)
      .map(([language, count]) => ({
        language,
        percentage: Math.round((count / totalRepos) * 100),
        color: languageColors[language] || "#8cc8ff",
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // Generate mock contribution calendar (in a real app, you'd fetch from GitHub's GraphQL API)
    const contributionCalendar = Array.from({ length: 365 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 10);
      return {
        date: date.toISOString().split('T')[0],
        count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4,
      };
    }).reverse();

    // Generate recent activity from repos
    const recentActivity = repos.slice(0, 10).map(repo => ({
      type: "pushed to",
      repo: repo.name,
      date: new Date(repo.updated_at).toLocaleDateString(),
    }));

    // Mock total commits (in a real app, you'd sum commits across repositories)
    const totalCommits = Math.floor(Math.random() * 500) + 200;

    return {
      username: user.login,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalCommits,
      mostUsedLanguages,
      contributionCalendar,
      recentActivity,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw error;
  }
}
