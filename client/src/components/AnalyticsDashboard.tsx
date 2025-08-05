import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  TrendingUp, 
  Users, 
  Globe, 
  Calendar,
  Clock,
  BarChart3,
  Activity
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  pageViews: number;
  uniqueVisitors: number;
  avgSessionTime: string;
  topCountries: Array<{
    country: string;
    code: string;
    visitors: number;
  }>;
  onlineNow: number;
}

const mockStats: VisitorStats = {
  totalVisitors: 1249,
  todayVisitors: 25,
  pageViews: 4584,
  uniqueVisitors: 892,
  avgSessionTime: "3m 45s",
  onlineNow: 5,
  topCountries: [
    { country: "India", code: "IN", visitors: 456 },
    { country: "United States", code: "US", visitors: 234 },
    { country: "Canada", code: "CA", visitors: 123 },
    { country: "Germany", code: "DE", visitors: 89 },
    { country: "United Kingdom", code: "UK", visitors: 67 },
  ]
};

const timeRanges = [
  { label: "Today", value: "today" },
  { label: "7 Days", value: "week" },
  { label: "30 Days", value: "month" },
  { label: "All Time", value: "all" },
];

export function AnalyticsDashboard() {
  const [activeRange, setActiveRange] = useState("today");
  const [liveStats, setLiveStats] = useState(mockStats);

  const { data: visitorStats } = useQuery({
    queryKey: ["/api/visitor-stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    if (visitorStats && typeof visitorStats === 'object' && visitorStats !== null) {
      const stats = visitorStats as any;
      if (stats.totalVisitors && stats.todayVisitors) {
        setLiveStats(prev => ({
          ...prev,
          totalVisitors: stats.totalVisitors,
          todayVisitors: stats.todayVisitors,
        }));
      }
    }
  }, [visitorStats]);

  const statCards = [
    {
      title: "Total Visitors",
      value: liveStats.totalVisitors.toLocaleString(),
      icon: Eye,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Today",
      value: liveStats.todayVisitors.toString(),
      icon: Calendar,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      change: "+8%",
      isPositive: true,
    },
    {
      title: "Page Views",
      value: liveStats.pageViews.toLocaleString(),
      icon: BarChart3,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      change: "+15%",
      isPositive: true,
    },
    {
      title: "Online Now",
      value: liveStats.onlineNow.toString(),
      icon: Activity,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      change: "Live",
      isPositive: true,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="analytics-title">
            Live Analytics
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time insights into visitor engagement and portfolio performance.
          </p>
        </motion.div>

        {/* Time Range Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              onClick={() => setActiveRange(range.value)}
              variant={activeRange === range.value ? "default" : "outline"}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300",
                activeRange === range.value
                  ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                  : "bg-gray-700/50 text-gray-400 hover:bg-purple-500/10"
              )}
              data-testid={`analytics-filter-${range.value}`}
            >
              {range.label}
            </Button>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={cn(
                  "glass-card p-6 hover:scale-105 transition-all duration-300",
                  stat.borderColor
                )}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                      <Icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        stat.isPositive ? "text-green-400 border-green-500/30" : "text-red-400 border-red-500/30"
                      )}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1" data-testid={`stat-${stat.title.toLowerCase().replace(' ', '-')}`}>
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visitor Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Growing Audience</h3>
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Avg. Session</span>
                  <span className="text-cyan-400 font-semibold">{liveStats.avgSessionTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Unique Visitors</span>
                  <span className="text-purple-400 font-semibold">{liveStats.uniqueVisitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Bounce Rate</span>
                  <span className="text-green-400 font-semibold">32%</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Top Countries */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Top Visitors</h3>
                <Globe className="text-cyan-400" size={24} />
              </div>
              <div className="space-y-3">
                {liveStats.topCountries.map((country, index) => (
                  <div key={country.code} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-gray-500">{country.code}</span>
                      <span className="text-gray-300">{country.country}</span>
                    </div>
                    <span className="text-cyan-400 font-semibold">{country.visitors}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Real-time Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-orange-400" size={24} />
                Live Activity Feed
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">New visitor from India</span>
                <span className="text-gray-500">2 seconds ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Resume downloaded</span>
                <span className="text-gray-500">1 minute ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Project section viewed</span>
                <span className="text-gray-500">3 minutes ago</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}