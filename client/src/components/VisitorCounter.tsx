import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Eye, Users, Globe, TrendingUp } from "lucide-react";

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

export function VisitorCounter() {
  const [animatedCount, setAnimatedCount] = useState(0);

  const { data: stats, isLoading } = useQuery<VisitorStats>({
    queryKey: ["/api/visitor-stats"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Animate the main visitor count
  useEffect(() => {
    if (stats?.totalVisitors) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stats.totalVisitors / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stats.totalVisitors) {
          setAnimatedCount(stats.totalVisitors);
          clearInterval(timer);
        } else {
          setAnimatedCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [stats?.totalVisitors]);

  if (isLoading || !stats) {
    return (
      <Card className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="fixed bottom-24 left-6 z-40 space-y-3">
      {/* Main Visitor Counter */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="glass-card p-4 w-64">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
              <Eye className="text-cyan-400 animate-pulse" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400 font-mono" data-testid="visitor-total-count">
                {animatedCount.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Total Visitors</div>
            </div>
          </div>
          
          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-green-400 font-bold" data-testid="visitor-today-count">
                {stats.todayVisitors}
              </div>
              <div className="text-gray-500 text-xs">Today</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold flex items-center justify-center gap-1" data-testid="visitor-online-count">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {stats.onlineUsers}
              </div>
              <div className="text-gray-500 text-xs">Online</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold" data-testid="visitor-pageviews-count">
                {stats.pageViews.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">Page Views</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 font-bold" data-testid="visitor-unique-count">
                {stats.uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">Unique</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="glass-card p-3 w-64">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="text-green-400" size={16} />
              <span className="text-green-400 text-sm font-medium">Growing Audience</span>
            </div>
            <div className="text-gray-400 text-xs">
              Avg. Session: {stats.averageSessionTime}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Top Countries */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="glass-card p-3 w-64">
          <div className="flex items-center space-x-2 mb-3">
            <Globe className="text-blue-400" size={16} />
            <span className="text-blue-400 text-sm font-medium">Top Visitors</span>
          </div>
          <div className="space-y-2">
            {stats.topCountries.slice(0, 3).map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-gray-300 text-sm">{country.country}</span>
                </div>
                <span className="text-cyan-400 text-sm font-mono">
                  {country.visitors}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
