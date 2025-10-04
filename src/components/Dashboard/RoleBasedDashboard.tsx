import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface DashboardStat {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function RoleBasedDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/requests/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  const userRole = session?.user?.role || "member";

  // Role-specific stats and actions
  const getRoleConfig = () => {
    switch (userRole) {
      case "member":
        return {
          title: "Member Dashboard",
          subtitle: "Welcome back! Track your projects and activities.",
          stats: [
            { title: "Active Projects", value: "3", icon: "📊", color: "bg-blue-100" },
            { title: "Completed Tasks", value: "12", icon: "✅", color: "bg-green-100" },
            { title: "Team Members", value: "8", icon: "👥", color: "bg-purple-100" },
            { title: "Hours Contributed", value: "45", icon: "⏰", color: "bg-yellow-100" },
          ] as DashboardStat[],
          quickActions: [
            {
              title: "View Projects",
              description: "See all your active and past projects",
              icon: "📁",
              href: "/dashboard/projects",
            },
            {
              title: "Submit Request",
              description: "Request a new project or service",
              icon: "📝",
              href: "/dashboard/request",
            },
            {
              title: "My Profile",
              description: "Update your profile information",
              icon: "👤",
              href: "/dashboard/profile",
            },
            {
              title: "Learning Resources",
              description: "Access tutorials and guides",
              icon: "📚",
              href: "/dashboard/guide",
            },
          ] as QuickAction[],
        };

      case "lecturer":
        return {
          title: "Lecturer Dashboard",
          subtitle: "Manage your students and academic projects.",
          stats: [
            { title: "Students Supervised", value: "24", icon: "👨‍🎓", color: "bg-blue-100" },
            { title: "Active Projects", value: "6", icon: "📊", color: "bg-green-100" },
            { title: "Pending Reviews", value: "5", icon: "📋", color: "bg-red-100" },
            { title: "This Semester", value: "3", icon: "📅", color: "bg-purple-100" },
          ] as DashboardStat[],
          quickActions: [
            {
              title: "Student Projects",
              description: "Review and manage student projects",
              icon: "📊",
              href: "/dashboard/projects",
            },
            {
              title: "Supervisions",
              description: "View your supervision schedule",
              icon: "📅",
              href: "/dashboard/supervisions",
            },
            {
              title: "Resources",
              description: "Share resources with students",
              icon: "📚",
              href: "/dashboard/resources",
            },
            {
              title: "Reports",
              description: "Generate academic reports",
              icon: "📄",
              href: "/dashboard/reports",
            },
          ] as QuickAction[],
        };

      case "admin":
        return {
          title: "Admin Dashboard",
          subtitle: "Manage organization operations and members.",
          stats: [
            { title: "Total Members", value: "156", icon: "👥", color: "bg-blue-100" },
            { title: "Active Projects", value: "18", icon: "📊", color: "bg-green-100" },
            { title: "Pending Requests", value: "7", icon: "⏳", color: "bg-yellow-100" },
            { title: "Completed This Month", value: "12", icon: "✅", color: "bg-purple-100" },
          ] as DashboardStat[],
          quickActions: [
            {
              title: "Manage Members",
              description: "Add, remove, or edit member information",
              icon: "👥",
              href: "/dashboard/members",
            },
            {
              title: "Project Requests",
              description: "Review and approve project requests",
              icon: "📋",
              href: "/dashboard/requests",
            },
            {
              title: "System Settings",
              description: "Configure organization settings",
              icon: "⚙️",
              href: "/dashboard/settings",
            },
            {
              title: "Analytics",
              description: "View organization analytics",
              icon: "📈",
              href: "/dashboard/analytics",
            },
          ] as QuickAction[],
        };

      case "leader":
        return {
          title: "Leader Dashboard",
          subtitle: "Strategic overview and organizational management.",
          stats: [
            { title: "Total Revenue", value: "$45K", icon: "💰", color: "bg-green-100" },
            { title: "Active Projects", value: "18", icon: "📊", color: "bg-blue-100" },
            { title: "Team Members", value: "156", icon: "👥", color: "bg-purple-100" },
            { title: "Client Satisfaction", value: "98%", icon: "⭐", color: "bg-yellow-100" },
          ] as DashboardStat[],
          quickActions: [
            {
              title: "Strategic Overview",
              description: "View high-level organizational metrics",
              icon: "📊",
              href: "/dashboard/overview",
            },
            {
              title: "Financial Reports",
              description: "Access financial statements and reports",
              icon: "💼",
              href: "/dashboard/finance",
            },
            {
              title: "Team Management",
              description: "Manage teams and allocate resources",
              icon: "👥",
              href: "/dashboard/teams",
            },
            {
              title: "Decision Portal",
              description: "Review and make strategic decisions",
              icon: "🎯",
              href: "/dashboard/decisions",
            },
          ] as QuickAction[],
        };

      case "client":
        return {
          title: "Client Dashboard",
          subtitle: "Track your projects and communicate with the team.",
          stats: [
            { title: "Active Projects", value: "2", icon: "📊", color: "bg-blue-100" },
            { title: "Completed Projects", value: "5", icon: "✅", color: "bg-green-100" },
            { title: "Pending Requests", value: "1", icon: "⏳", color: "bg-yellow-100" },
            { title: "Support Tickets", value: "0", icon: "🎫", color: "bg-purple-100" },
          ] as DashboardStat[],
          quickActions: [
            {
              title: "My Projects",
              description: "View and track your project progress",
              icon: "📁",
              href: "/dashboard/projects",
            },
            {
              title: "New Request",
              description: "Submit a new project request",
              icon: "➕",
              href: "/dashboard/request",
            },
            {
              title: "Messages",
              description: "Communicate with the project team",
              icon: "💬",
              href: "/dashboard/messages",
            },
            {
              title: "Invoices",
              description: "View and pay invoices",
              icon: "💳",
              href: "/dashboard/invoices",
            },
          ] as QuickAction[],
        };

      default:
        return {
          title: "Dashboard",
          subtitle: "Welcome!",
          stats: [] as DashboardStat[],
          quickActions: [] as QuickAction[],
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-gray-600 mt-1">{config.subtitle}</p>
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red/10 text-red">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`text-4xl ${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-red hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl">📋</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Welcome to Night Login!</p>
                <p className="text-sm text-gray-600 mt-1">
                  Complete your profile and start exploring the platform.
                </p>
                <p className="text-xs text-gray-500 mt-2">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
