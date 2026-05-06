"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const adminNavItems = [
  { icon: "⚡", label: "Overview", id: "overview" },
  { icon: "👥", label: "All Users", id: "users" },
  { icon: "🎯", label: "All Events", id: "events" },
  { icon: "💰", label: "Payments", id: "payments" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const allUsers = [
  { id: 1, name: "Shivansh Sharma", email: "rahul@college.edu", role: "organizer" as const, status: "active", joined: "Jan 2025" },
  { id: 2, name: "Priya Singh", email: "priya@college.edu", role: "participant" as const, status: "active", joined: "Feb 2025" },
  { id: 3, name: "Amit Verma", email: "amit@college.edu", role: "vendor" as const, status: "banned", joined: "Mar 2025" },
  { id: 4, name: "Neha Gupta", email: "neha@college.edu", role: "participant" as const, status: "active", joined: "Mar 2025" },
  { id: 5, name: "Karan Patel", email: "karan@college.edu", role: "organizer" as const, status: "active", joined: "Apr 2025" },
];

const escrowPayments = [
  { event: "Rendezvous 2025", organizer: "Rahul Sharma", amount: 106786, status: "held" as const, date: "Oct 15" },
  { event: "OASIS Music Festival", organizer: "Karan Patel", amount: 350162, status: "held" as const, date: "Oct 25" },
  { event: "TechSummit 2025", organizer: "Priya Singh", amount: 90000, status: "disbursed" as const, date: "Sep 5" },
  { event: "BuildSpace 48", organizer: "Amit Verma", amount: 17800, status: "held" as const, date: "Nov 4" },
];

const recentActivity = [
  { text: "New organizer registered", name: "Karan Patel", time: "2 min ago", icon: "👤" },
  { text: "Event created", name: "Rendezvous 2025", time: "15 min ago", icon: "🎯" },
  { text: "Payment received", name: "₹499 from Priya", time: "30 min ago", icon: "💰" },
  { text: "Vendor hired", name: "Photography service", time: "1 hr ago", icon: "🏪" },
  { text: "Event closed", name: "TechSummit 2025", time: "2 hr ago", icon: "🔒" },
];

type UserRole = "organizer" | "participant" | "vendor";
type PaymentStatus = "held" | "disbursed";

function RoleBadge({ role }: { role: UserRole }) {
  const map = {
    organizer: "bg-accent/10 text-accent border-accent/20",
    participant: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    vendor: "bg-gold/10 text-yellow-400 border-gold/20",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wider border ${map[role]}`}>
      {role}
    </span>
  );
}

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold uppercase tracking-wider border ${
      status === "held"
        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        : "bg-green-500/10 text-green-400 border-green-500/20"
    }`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const totalEscrow = escrowPayments
    .filter(p => p.status === "held")
    .reduce((s, p) => s + p.amount, 0);
  const totalDisbursed = escrowPayments
    .filter(p => p.status === "disbursed")
    .reduce((s, p) => s + p.amount, 0);
  const totalUsers = allUsers.length;
  const totalEvents = escrowPayments.length;

  return (
    <div className="min-h-screen bg-bg flex font-dm text-[var(--text)]">

      <Sidebar
        navItems={adminNavItems}
        role="admin"
        username="Admin"
      />

      <main className="flex-1 ml-64 transition-all duration-300 min-h-screen">

        <Header
          username="Admin"
          role="admin"
          showNewEventButton={false}
        />

        <div className="p-8 space-y-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: totalUsers, change: "+3 this week", icon: "👥", color: "from-cyan-500/10 to-transparent", border: "border-cyan-500/20" },
              { label: "Total Events", value: totalEvents, change: "All time", icon: "🎯", color: "from-accent/10 to-transparent", border: "border-accent/20" },
              { label: "Escrow Balance", value: `₹${(totalEscrow / 100000).toFixed(1)}L`, change: "Pending release", icon: "🔒", color: "from-yellow-500/10 to-transparent", border: "border-yellow-500/20" },
              { label: "Total Disbursed", value: `₹${(totalDisbursed / 1000).toFixed(0)}K`, change: "This month", icon: "✅", color: "from-green-500/10 to-transparent", border: "border-green-500/20" },
            ].map((stat) => (
              <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-5`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-[0.7rem] text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="font-syne font-extrabold text-2xl tracking-tight mb-1">{stat.value}</div>
                <div className="text-muted text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Payments Table + Recent Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Escrow Payments */}
            <div className="xl:col-span-2 bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                <h2 className="font-syne font-bold text-base">Escrow Payments</h2>
                <button className="text-accent text-xs hover:text-accent2 transition-colors font-medium">View all →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.05]">
                      {["Event", "Organizer", "Amount", "Date", "Status", "Action"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-[0.7rem] font-semibold text-muted uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {escrowPayments.map((pay, i) => (
                      <tr key={i} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i === escrowPayments.length - 1 ? "border-none" : ""}`}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm">{pay.event}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">{pay.organizer}</td>
                        <td className="px-6 py-4 font-syne font-bold text-sm">
                          ₹{(pay.amount / 1000).toFixed(1)}K
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">{pay.date}</td>
                        <td className="px-6 py-4">
                          <PaymentStatusBadge status={pay.status} />
                        </td>
                        <td className="px-6 py-4">
                          {pay.status === "held" ? (
                            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-accent to-accent2 text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,77,28,0.3)] transition-all duration-200">
                              Disburse
                            </button>
                          ) : (
                            <span className="text-muted text-xs">Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                <h2 className="font-syne font-bold text-base">Recent Activity</h2>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="divide-y divide-white/[0.04]">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-accent2/20 flex items-center justify-center flex-shrink-0 text-sm">
                      {act.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{act.text}</div>
                      <div className="text-muted text-xs truncate">{act.name}</div>
                    </div>
                    <div className="text-muted text-[0.65rem] flex-shrink-0">{act.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Users Table + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* All Users */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                <h2 className="font-syne font-bold text-base">All Users</h2>
                <button className="text-accent text-xs hover:text-accent2 transition-colors font-medium">View all →</button>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {allUsers.map((user, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-accent2/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-accent2">
                      {user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{user.name}</div>
                      <div className="text-muted text-xs truncate">{user.email}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <RoleBadge role={user.role} />
                      <button className={`text-[0.65rem] font-semibold ${
                        user.status === "banned"
                          ? "text-green-400 hover:text-green-300"
                          : "text-red-400 hover:text-red-300"
                      } transition-colors`}>
                        {user.status === "banned" ? "Unban" : "Ban"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
              <h2 className="font-syne font-bold text-base mb-5">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "👥", label: "Manage Users", desc: "View all users", color: "hover:border-cyan/30" },
                  { icon: "🎯", label: "Manage Events", desc: "View all events", color: "hover:border-accent/30" },
                  { icon: "💰", label: "Disburse All", desc: "Release all funds", color: "hover:border-gold/30" },
                  { icon: "📊", label: "Analytics", desc: "Platform stats", color: "hover:border-green-500/30" },
                  { icon: "📄", label: "Download Report", desc: "Export data", color: "hover:border-accent/30" },
                  { icon: "⚙️", label: "Settings", desc: "Platform config", color: "hover:border-cyan/30" },
                ].map((action) => (
                  <button key={action.label} className={`flex items-start gap-3 p-4 bg-bg rounded-xl border border-white/[0.07] ${action.color} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-left`}>
                    <span className="text-xl flex-shrink-0">{action.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{action.label}</div>
                      <div className="text-muted text-xs mt-0.5">{action.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Disburse All Card */}
              <div className="mt-4 p-4 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <div className="text-sm font-semibold text-yellow-400">₹{(totalEscrow / 100000).toFixed(1)}L in escrow</div>
                  <div className="text-muted text-xs mt-0.5">3 events pending disbursement</div>
                </div>
                <button className="ml-auto px-3 py-1.5 bg-gradient-to-r from-accent to-accent2 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity flex-shrink-0">
                  Disburse All
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}