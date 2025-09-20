import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import type { Lead } from "../types/lead";
import type { Opportunity } from "../types/opportunity";

interface LeadDetailPanelProps {
	lead: Lead | null;
	onClose: () => void;
	onSave: (updatedLead: Lead) => void;
}

export function LeadDetailPanel({
	lead,
	onClose,
	onSave,
}: LeadDetailPanelProps) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [visible, setVisible] = useState(false);
	const [convertModal, setConvertModal] = useState(false);

	const queryClient = useQueryClient();

	const convertMutation = useMutation({
		mutationFn: (newOpportunity: Opportunity) => {
			return new Promise<Opportunity>((resolve) =>
				setTimeout(() => resolve(newOpportunity), 500),
			);
		},
		onSuccess: (data) => {
			queryClient.setQueryData<Opportunity[]>(["opportunities"], (old) => {
				const current =
					old ??
					queryClient.getQueryData<Opportunity[]>(["opportunities"]) ??
					[];
				return [...current, data];
			});
			setConvertModal(false);
			onClose();
		},

		onError: (error: any) => alert(error.message || "Failed to convert lead"),
	});

	useEffect(() => {
		if (lead) {
			setVisible(true);
			setEmail(lead.email);
			setStatus(lead.status);
			setError("");
			setTimeout(() => setIsOpen(true), 10);
		} else {
			setIsOpen(false);
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
		<>
			<div
				className={`fixed inset-0 bg-black/40 flex justify-end z-50 transition-opacity duration-300 ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
			>
				<div
					className={`bg-white dark:bg-gray-900 w-full max-w-md p-6 h-full overflow-y-auto shadow-2xl rounded-l-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
				>
					<button
						onClick={onClose}
						className="mb-4 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-brand-500 dark:hover:text-brand-400 transition"
						type="button"
					>
						<ChevronLeft className="w-5 h-5" /> Back
					</button>

					<h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
						Lead Detail
					</h1>

					<div className="mb-4 ">
						<p className="text-l font-bold  text-gray-900 dark:text-gray-100">
							Name
						</p>
						<p>{lead?.name || ""}</p>
					</div>

					<div className="mb-4 ">
						<p className="text-l font-bold  text-gray-900 dark:text-gray-100">
							Company
						</p>
						<p>{lead?.company || ""}</p>
					</div>

					<div className="mb-4 relative">
						<p className=" left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-brand-500 dark:peer-focus:text-brand-400">
							E-mail
						</p>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="peer w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 transition"
						/>
					</div>

					<div className="mb-4 relative">
						<p className=" left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all pointer-events-none">
							Status
						</p>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="peer w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 transition"
						>
							<option value="new">New</option>
							<option value="contacted">Contacted</option>
							<option value="qualified">Qualified</option>
							<option value="converted">Converted</option>
						</select>
					</div>

					{error && <p className="text-red-500 mb-4">{error}</p>}

					{/* Botões */}
					<div className="flex justify-end gap-3 mt-6">
						<button
							className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition active:scale-95"
							onClick={onClose}
							type="button"
						>
							Cancel
						</button>
						<button
							className="px-4 py-2 rounded-md bg-accent-500 hover:bg-green-600 text-white transition active:scale-95"
							onClick={() => setConvertModal(true)}
							type="button"
						>
							Convert Lead
						</button>
						<button
							className="px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white transition active:scale-95"
							onClick={handleSave}
							type="button"
						>
							Save
						</button>
					</div>
				</div>
			</div>

			{/* Modal Convert Lead */}
			{convertModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 transition-opacity">
					<div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-sm shadow-2xl transition-transform transform scale-100">
						<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
							Confirm Conversion
						</h2>
						<p className="text-gray-700 dark:text-gray-300 mb-6">
							Are you sure you want to convert <strong>{lead?.name}</strong>{" "}
							into an opportunity?
						</p>
						<div className="flex justify-end gap-3">
							<button
								className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition active:scale-95"
								onClick={() => setConvertModal(false)}
								type="button"
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 rounded-md bg-accent-500 hover:bg-green-600 text-white transition active:scale-95"
								onClick={handleConvert}
								type="button"
							>
								{convertMutation.isPending ? "Converting..." : "Convert"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
