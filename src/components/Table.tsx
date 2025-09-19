import type React from "react";

export interface Column<T> {
	key: keyof T;
	label: string;
	className?: string; // classes adicionais
	render?: (item: T) => React.ReactNode; // render customizado da célula
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	onRowClick?: (row: T) => void;
	className?: string;
	isLoading?: boolean;
	isError?: boolean; // novo prop para erro
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
			className={`overflow-x-auto bg-white shadow-md rounded-lg ${className}`}
		>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-100">
					<tr>
						{columns.map((col) => (
							<th
								key={String(col.key)}
								className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className || ""}`}
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200">
					{isError ? (
						<tr>
							<td
								colSpan={columns.length}
								className="px-6 py-4 text-center text-red-500"
							>
								Something went wrong. Please try again.
							</td>
						</tr>
					) : isLoading ? (
						// Skeleton loading
						Array.from({ length: 5 }).map((_, idx) => (
							<tr key={idx} className="animate-pulse">
								{columns.map((col, cIdx) => (
									<td key={cIdx} className="px-6 py-4">
										<div className="h-4 bg-gray-300 rounded w-3/4"></div>
									</td>
								))}
							</tr>
						))
					) : data.length === 0 ? (
						<tr>
							<td
								colSpan={columns.length}
								className="px-6 py-4 text-center text-gray-400"
							>
								No data found
							</td>
						</tr>
					) : (
						data.map((row) => (
							<tr
								key={row.id}
								className={`hover:bg-gray-50 cursor-pointer transition-colors ${
									onRowClick ? "hover:bg-gray-100" : ""
								}`}
								onClick={() => onRowClick?.(row)}
							>
								{columns.map((col) => (
									<td
										key={String(col.key)}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
									>
										{col.render ? col.render(row) : String(row[col.key])}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
