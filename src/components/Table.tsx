import { AlertCircle, Loader2, SearchX } from "lucide-react";
import type React from "react";

export interface Column<T> {
	key: keyof T;
	label: string;
	className?: string;
	render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	onRowClick?: (row: T) => void;
	className?: string;
	isLoading?: boolean;
	isError?: boolean;
}

export function Table<T extends { id: string | number }>({
	columns,
	data,
	onRowClick,
	className = "",
	isLoading,
	isError,
}: TableProps<T>) {
	return (
		<div
			className={`overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ${className}`}
		>
			<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
				<thead className="bg-brand-500 text-white">
					<tr>
						{columns.map((col) => (
							<th
								key={String(col.key)}
								className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${col.className || ""}`}
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200 dark:divide-gray-800">
					{isError ? (
						<tr>
							<td
								colSpan={columns.length}
								className="h-full px-6 py-12 text-center text-danger-500 "
							>
								<div className="flex flex-col items-center justify-center gap-2">
									<AlertCircle className="w-8 h-8 text-red-500" />
									<span>Something went wrong. Please try again.</span>
								</div>
							</td>
						</tr>
					) : isLoading ? (
						Array.from({ length: 5 }).map((_, idx) => (
							<tr key={idx} className="animate-pulse">
								{columns.map((col, cIdx) => (
									<td key={cIdx} className="px-6 py-4">
										<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
									</td>
								))}
							</tr>
						))
					) : data.length === 0 ? (
						<tr>
							<td
								colSpan={columns.length}
								className="h-full px-6 py-12 text-center text-gray-400"
							>
								<div className="flex flex-col items-center justify-center gap-2">
									<SearchX className="w-8 h-8" />
									<span>No data found</span>
								</div>
							</td>
						</tr>
					) : (
						data.map((row) => (
							<tr
								key={row.id}
								className={`transition-colors ${
									onRowClick
										? "cursor-pointer hover:bg-brand-50 dark:hover:bg-gray-800"
										: ""
								}`}
								onClick={() => onRowClick?.(row)}
							>
								{columns.map((col) => (
									<td
										key={String(col.key)}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
									>
										{col.render ? col.render(row) : String(row[col.key])}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>

			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-900/60">
					<Loader2 className="w-6 h-6 animate-spin text-brand-500" />
				</div>
			)}
		</div>
	);
}
