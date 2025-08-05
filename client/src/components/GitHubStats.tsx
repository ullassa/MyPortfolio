import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Github, GitBranch, Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function GitHubStats() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  const { data: githubStats, isLoading, error } = useQuery<GitHubStats>({
    queryKey: ["/api/github", "ullassa"],
    enabled: true,
  });

  if (isLoading) {
    return (
      <Card className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error || !githubStats) {
    return (
      <Card className="glass-card p-6 border-red-500/30">
        <div className="text-center text-red-400">
          <Github className="mx-auto mb-2" size={32} />
          <p className="text-sm">GitHub stats temporarily unavailable</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2" data-testid="github-stats-title">
          <Github size={28} />
          GitHub Activity
        </h3>
        <div className="flex gap-2">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-3 py-1 rounded-full text-xs transition-all duration-300",
                timeRange === range
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-gray-700/50 text-gray-400 hover:bg-cyan-500/10"
              )}
              data-testid={`github-filter-${range}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400 mb-1" data-testid="github-repos">
            {githubStats.publicRepos}
          </div>
          <div className="text-gray-400 text-sm">Repositories</div>
        </Card>
        
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1" data-testid="github-commits">
            {githubStats.totalCommits}
          </div>
          <div className="text-gray-400 text-sm">Commits</div>
        </Card>
        
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1" data-testid="github-stars">
            {githubStats.totalStars}
          </div>
          <div className="text-gray-400 text-sm">Stars</div>
        </Card>
        
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1" data-testid="github-followers">
            {githubStats.followers}
          </div>
          <div className="text-gray-400 text-sm">Followers</div>
        </Card>
      </div>

      {/* Languages */}
      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <GitBranch size={20} />
          Most Used Languages
        </h4>
        <div className="space-y-3">
          {githubStats.mostUsedLanguages.slice(0, 5).map((lang, index) => (
            <div key={lang.language} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-gray-300">{lang.language}</span>
              </div>
              <span className="text-cyan-400 font-mono text-sm">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Contribution Graph */}
      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Contribution Graph
        </h4>
        <div className="grid grid-cols-12 gap-1 max-w-md">
          {githubStats.contributionCalendar.slice(-84).map((day, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-sm",
                day.level === 0 && "bg-gray-800",
                day.level === 1 && "bg-green-900",
                day.level === 2 && "bg-green-700",
                day.level === 3 && "bg-green-500",
                day.level === 4 && "bg-green-300"
              )}
              title={`${day.count} contributions on ${day.date}`}
            />
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {githubStats.recentActivity.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-400" />
                <span className="text-gray-300">
                  {activity.type} in <span className="text-cyan-400">{activity.repo}</span>
                </span>
              </div>
              <span className="text-gray-500">{activity.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
