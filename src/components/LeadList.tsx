import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getLeads } from "../api/leads.api";
import type { Lead } from "../types/lead";
import { type Column, Table } from "./Table";

interface LeadListProps {
	onSelectLead: (lead: Lead) => void; // callback para retornar a linha selecionada
}

export function LeadList({ onSelectLead }: LeadListProps) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sortDesc, setSortDesc] = useState(true);

	const {
		data: leads,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["leads"],
		queryFn: getLeads,
	});

	const columns: Column<Lead>[] = [
		{ key: "name", label: "Name" },
		{ key: "company", label: "Company" },
		{ key: "email", label: "Email" },
		{ key: "score", label: "Score" },
		{
			key: "status",
			label: "Status",
			render: (lead) => <span className="capitalize">{lead.status}</span>,
		},
	];
	const filteredLeads = useMemo(() => {
		if (!leads) return []; // se leads ainda não carregou, retorna array vazio

		let filtered = [...leads]; // copia para não alterar o original

		if (search) {
			filtered = filtered.filter(
				(lead) =>
					lead.name.toLowerCase().includes(search.toLowerCase()) ||
					lead.company.toLowerCase().includes(search.toLowerCase()),
			);
		}

		if (statusFilter) {
			filtered = filtered.filter((lead) => lead.status === statusFilter);
		}

		filtered.sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

		return filtered;
	}, [leads, search, statusFilter, sortDesc]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Leads List</h1>

			{/* Filters */}
			<div className="flex flex-wrap gap-4 mb-4">
				<input
					type="text"
					placeholder="Search by name or company"
					className="border rounded px-3 py-2 flex-1 min-w-[200px]"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<select
					className="border rounded px-3 py-2"
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
				>
					<option value="">All Status</option>
					<option value="new">New</option>
					<option value="contacted">Contacted</option>
					<option value="qualified">Qualified</option>
					<option value="converted">Converted</option>
				</select>

				<button
					className="bg-blue-500 text-white px-3 py-2 rounded"
					onClick={() => setSortDesc(!sortDesc)}
				>
					Sort by Score {sortDesc ? "⬇" : "⬆"}
				</button>
			</div>

			<Table
				columns={columns}
				data={leads || []}
				onRowClick={onSelectLead}
				isLoading={isLoading}
				isError={isError}
			/>
		</div>
	);
}
