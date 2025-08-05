import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Code2, Trophy, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function LeetCodeStats() {
  const { data: leetcodeStats, isLoading, error } = useQuery<LeetCodeStats>({
    queryKey: ["/api/leetcode", "ULLAS_S_A"],
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

  if (error || !leetcodeStats) {
    return (
      <Card className="glass-card p-6 border-orange-500/30">
        <div className="text-center text-orange-400">
          <Code2 className="mx-auto mb-2" size={32} />
          <p className="text-sm">LeetCode stats temporarily unavailable</p>
        </div>
      </Card>
    );
  }

  const difficultyColors = {
    Easy: "text-green-400 border-green-400",
    Medium: "text-yellow-400 border-yellow-400",
    Hard: "text-red-400 border-red-400",
  };

  const completionPercentage = Math.round((leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* Header with Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-orange-400 flex items-center gap-2" data-testid="leetcode-stats-title">
          <Code2 size={28} />
          LeetCode Progress
        </h3>
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 animate-pulse" data-testid="leetcode-badge">
          <Trophy size={16} className="mr-1" />
          {leetcodeStats.totalSolved} Solved
        </Badge>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-orange-400 mb-1" data-testid="leetcode-total-solved">
            {leetcodeStats.totalSolved}
          </div>
          <div className="text-gray-400 text-sm">Problems Solved</div>
          <div className="text-xs text-gray-500 mt-1">
            {completionPercentage}% Complete
          </div>
        </Card>
        
        <Card className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-1" data-testid="leetcode-acceptance-rate">
            {leetcodeStats.acceptanceRate}%
          </div>
          <div className="text-gray-400 text-sm">Acceptance Rate</div>
        </Card>
        
        <Card className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-1" data-testid="leetcode-ranking">
            #{leetcodeStats.ranking.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Global Ranking</div>
        </Card>
        
        <Card className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-1" data-testid="leetcode-reputation">
            {leetcodeStats.reputation}
          </div>
          <div className="text-gray-400 text-sm">Reputation</div>
        </Card>
      </div>

      {/* Difficulty Breakdown */}
      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target size={20} />
          Problem Difficulty Breakdown
        </h4>
        <div className="space-y-4">
          {/* Easy */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-medium">Easy</span>
              <span className="text-gray-400 text-sm">
                {leetcodeStats.easySolved} / {leetcodeStats.easyTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(leetcodeStats.easySolved / leetcodeStats.easyTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 font-medium">Medium</span>
              <span className="text-gray-400 text-sm">
                {leetcodeStats.mediumSolved} / {leetcodeStats.mediumTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(leetcodeStats.mediumSolved / leetcodeStats.mediumTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Hard */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-red-400 font-medium">Hard</span>
              <span className="text-gray-400 text-sm">
                {leetcodeStats.hardSolved} / {leetcodeStats.hardTotal}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(leetcodeStats.hardSolved / leetcodeStats.hardTotal) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Submissions */}
      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Recent Submissions
        </h4>
        <div className="space-y-3">
          {leetcodeStats.recentSubmissions.slice(0, 5).map((submission, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn("text-xs", difficultyColors[submission.difficulty])}
                >
                  {submission.difficulty}
                </Badge>
                <span className="text-gray-300 font-medium">{submission.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    submission.status === "Accepted"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  )}
                >
                  {submission.status}
                </span>
                <span className="text-gray-500 text-xs">{submission.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
