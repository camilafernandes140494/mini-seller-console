// src/components/Header.tsx
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
	const [darkMode, setDarkMode] = useState(false);
	const location = useLocation();

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.documentElement.classList.toggle("dark");
	};

	const linkClass = (path: string) =>
		`px-3 py-2 rounded-md text-sm font-medium ${
			location.pathname === path
				? "bg-brand-700 text-white"
				: "text-white hover:bg-brand-600 transition"
		}`;

	return (
		<header className="bg-brand-500 shadow-md">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center font-bold">
						MS
					</div>
					<span className="text-lg font-semibold">Mini Seller Console</span>
				</div>

				<nav className="flex gap-2">
					<Link to="/" className={linkClass("/")}>
						Leads
					</Link>
					<Link to="/opportunities" className={linkClass("/opportunities")}>
						Opportunities
					</Link>
				</nav>

				<button
					onClick={toggleDarkMode}
					className="p-2 rounded-md hover:bg-white/10 transition ml-4"
					type="button"
				>
					{darkMode ? <Sun size={18} /> : <Moon size={18} />}
				</button>
			</div>
		</header>
	);
}
