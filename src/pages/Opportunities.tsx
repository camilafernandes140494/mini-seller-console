import { useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../api/leads.api";
import { Table, type Column } from "../components/Table";
import type { Opportunity } from "../types/opportunity";

export function Opportunities() {
	const columns: Column<Opportunity>[] = [
		{ key: "name", label: "Name" },
		{ key: "id", label: "ID" },
		{ key: "stage", label: "Stage" },
		{ key: "amount", label: "Amount" },
		{
			key: "accountName",
			label: "AccountName",
		},
	];

	const {
		data: opportunitiesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["opportunities"],
		queryFn: getOpportunities,
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Opportunities</h1>

			<Table
				columns={columns}
				data={opportunitiesData || []}
				isLoading={isLoading}
				isError={isError}
			/>
		</div>
	);
}
