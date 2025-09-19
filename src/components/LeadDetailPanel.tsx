import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Lead } from "../types/lead";
import type { Opportunity } from "../types/opportunity";

interface LeadDetailPanelProps {
	lead: Lead | null;
	onClose: () => void;
	onSave: (updatedLead: Lead) => void;
	onConvert?: (lead: Lead) => void;
}

export function LeadDetailPanel({
	lead,
	onClose,
	onSave,
	onConvert,
}: LeadDetailPanelProps) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");
	const [isOpen, setIsOpen] = useState(false); // animação de entrada/saída
	const [visible, setVisible] = useState(false); // controla renderização
	const queryClient = useQueryClient();

	// mutation para criar a oportunidade
	const convertMutation = useMutation({
		mutationFn: (newOpportunity: Opportunity) => {
			return new Promise<Opportunity>((resolve, reject) => {
				setTimeout(() => {
					// simulando sucesso
					resolve(newOpportunity);
					// ou para simular erro: reject(new Error("Failed to convert"));
				}, 500);
			});
		},
		onSuccess: (data) => {
			// atualiza a lista de oportunidades no cache
			queryClient.setQueryData<Opportunity[]>(["opportunities"], (old = []) => [
				...old,
				data,
			]);
			onClose();
		},
		onError: (error: any) => {
			alert(error.message || "Failed to convert lead");
		},
	});

	useEffect(() => {
		if (lead) {
			setVisible(true); // renderiza o painel
			setEmail(lead.email);
			setStatus(lead.status);
			setError("");
			setTimeout(() => setIsOpen(true), 10); // animação de entrada
		} else {
			setIsOpen(false); // inicia saída
			// espera a animação antes de desmontar
			const timer = setTimeout(() => setVisible(false), 300);
			return () => clearTimeout(timer);
		}
	}, [lead]);

	if (!visible) return null;

	const handleSave = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("Invalid email format");
			return;
		}

		onSave({ ...lead!, email, status });
		onClose();
	};

	const handleConvert = () => {
		if (!lead) return;
		const opportunity: Opportunity = {
			id: Date.now(),
			name: lead.name,
			stage: "New",
			accountName: lead.company,
			amount: 10,
		};
		convertMutation.mutate(opportunity);
	};
	return (
		<div
			className={`fixed inset-0 bg-black/30 flex justify-end z-50 
      transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
		>
			<div
				className={`bg-white w-full max-w-md p-6 h-full overflow-y-auto shadow-lg 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<h1 className="text-2xl font-bold mb-4">Lead Detail</h1>

				<div className="mb-4">
					<label className="block font-semibold mb-1">Name</label>
					<p>{lead?.name}</p>
				</div>

				<div className="mb-4">
					<label className="block font-semibold mb-1">Company</label>
					<p>{lead?.company}</p>
				</div>

				<div className="mb-4">
					<label className="block font-semibold mb-1">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border rounded px-3 py-2 w-full"
					/>
				</div>

				<div className="mb-4">
					<label className="block font-semibold mb-1">Status</label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="border rounded px-3 py-2 w-full"
					>
						<option value="new">New</option>
						<option value="contacted">Contacted</option>
						<option value="qualified">Qualified</option>
						<option value="converted">Converted</option>
					</select>
				</div>

				{error && <p className="text-red-500 mb-4">{error}</p>}

				<div className="flex justify-end gap-3 mt-6">
					<button className="px-4 py-2 rounded border" onClick={onClose}>
						Cancel
					</button>
					<button
						className="px-4 py-2 rounded bg-green-500 text-white"
						onClick={handleConvert}
						disabled={convertMutation.isPending}
					>
						{convertMutation.isPending ? "Converting..." : "Convert Lead"}
					</button>
					<button
						className="px-4 py-2 rounded bg-blue-500 text-white"
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
