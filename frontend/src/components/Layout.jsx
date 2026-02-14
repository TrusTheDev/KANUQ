import { NavLink, Link } from "react-router-dom";
import { Trophy, UserPlus } from "lucide-react";

const navItems = [
  { to: "/", label: "Ranking", icon: Trophy, testId: "nav-leaderboard-link" },
  { to: "/gestion", label: "Invocadores", icon: UserPlus, testId: "nav-manage-link" },
];

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-obsidian-800 text-gold-100 font-body relative overflow-hidden"
      data-testid="app-shell"
    >
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1647029734771-53e448994b08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGJsdWUlMjBnb2xkJTIwbWFnaWMlMjBwYXJ0aWNsZXMlMjB0ZXh0dXJlfGVufDB8fHx8MTc3MTA0NDg1NHww&ixlib=rb-4.1.0&q=85')] bg-cover bg-center opacity-20"
        data-testid="layout-hero-bg"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-obsidian-900/80 via-obsidian-800/80 to-obsidian-900"
        data-testid="layout-gradient-overlay"
      />
      <div
        className="absolute inset-0 hextech-noise opacity-40 pointer-events-none"
        data-testid="layout-noise-overlay"
      />
      <div className="relative z-10">
        <header
          className="sticky top-0 z-20 border-b border-gold-500/30 bg-obsidian-800/70 backdrop-blur-xl"
          data-testid="main-header"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
            <Link
              to="/"
              className="flex items-center gap-3 font-heading text-lg md:text-2xl tracking-[0.25em] uppercase text-gold-100"
              data-testid="main-logo-link"
            >
              <span
                className="h-2 w-2 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(200,155,60,0.8)]"
                data-testid="logo-dot"
              />
              KanuQ Challenge
            </Link>
            <nav className="flex items-center gap-3" data-testid="main-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.3em] border transition-all duration-300 ${
                        isActive
                          ? "border-gold-400 text-gold-100 bg-obsidian-700/70"
                          : "border-obsidian-600 text-gold-300/70 hover:border-gold-400/60 hover:text-gold-100"
                      }`
                    }
                    data-testid={item.testId}
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </header>
        <main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          data-testid="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
