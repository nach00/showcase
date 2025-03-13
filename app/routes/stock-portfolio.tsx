import { Label } from "~/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import NavBar from "@/components/NavBar";

interface Stock {
	name: string;
	shares_owned: number;
	cost_per_share: number;
	market_price: number;
}

export default function StocksPortfolio() {
	const [portfolio, setPortfolio] = useState<Stock[]>([
		{
			name: "Snapple",
			shares_owned: 200,
			cost_per_share: 10,
			market_price: 200,
		},
		{
			name: "Testy",
			shares_owned: 10,
			cost_per_share: 20,
			market_price: 2000,
		},
		{
			name: "Cold Harbor",
			shares_owned: 1000,
			cost_per_share: 10,
			market_price: 30,
		},
	]);

	const [form, setForm] = useState<Stock>({
		name: "",
		shares_owned: 0,
		cost_per_share: 0,
		market_price: 0,
	});

	const portfolio_market_value = portfolio.reduce(
		(sum, stock) => stock.shares_owned * stock.market_price + sum,
		0,
	);

	const portfolio_cost = portfolio.reduce(
		(sum, stock) => stock.shares_owned * stock.cost_per_share + sum,
		0,
	);

	const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

	const removeStock = (index: number) => {
		const updatedPortfolio = [...portfolio];
		updatedPortfolio.splice(index, 1);
		setPortfolio(updatedPortfolio);
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const { name, value } = event.target;
		const updatedPortfolio = [...portfolio];
		updatedPortfolio[index] = {
			...updatedPortfolio[index],
			[name]: Number(value),
		};
		setPortfolio(updatedPortfolio);
	};

	const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: name === "name" ? value : Number(value),
		});
	};

	const addStock = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPortfolio([...portfolio, form]);
		setForm({
			name: "",
			shares_owned: 0,
			cost_per_share: 0,
			market_price: 0,
		});
	};

	return (
		<>
			<NavBar />
			<div className="bg-gray-400 container p-4 flex flex-col items-center border-2 border-black min-h-screen justify-center min-w-screen relative before:content-['FINANCIAL'] before:absolute before:top-2 before:right-4 before:text-xs before:tracking-widest before:font-mono">
				<h1 className="text-center my-8 text-3xl md:text-5xl font-bold uppercase tracking-tight transform -rotate-1 relative after:content-['ANALYSIS'] after:absolute after:text-xs after:font-mono after:tracking-widest after:-top-4 after:right-0 after:text-gray-500">
					"STOCK PORTFOLIO"
				</h1>
				<div className="row w-full">
					<div className="col-12 relative">
						<div className="overflow-x-auto mb-12">
							<table className="w-full table-auto border-collapse border-2 border-black relative before:content-['DATA'] before:absolute before:-top-6 before:left-2 before:text-xs before:font-mono before:bg-white before:px-2 before:tracking-widest">
								<thead className="bg-black text-white uppercase font-mono tracking-wider">
									<tr className="transform rotate-[0.3deg]">
										<th className="p-3 border border-white text-left">Name</th>
										<th className="p-3 border border-white text-left">
											Shares Owned
										</th>
										<th className="p-3 border border-white text-left">
											Cost per share (\$)
										</th>
										<th className="p-3 border border-white text-left">
											Market Price (\$)
										</th>
										<th className="p-3 border border-white text-left">
											Market Value (\$)
										</th>
										<th className="p-3 border border-white text-left">
											Unrealized Gain/Loss (\$)
										</th>
										<th className="p-3 border border-white text-left"></th>
									</tr>
								</thead>
								<tbody>
									{portfolio.map((stock, index) => {
										const { name, shares_owned, cost_per_share, market_price } =
											stock;

										const market_value = shares_owned * market_price;
										const unrealized_gain_loss =
											market_value - shares_owned * cost_per_share;

										return (
											<tr
												key={index}
												className={`${
													index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
												} hover:bg-black hover:text-white transition-colors duration-300 ${
													index === 1 ? "-rotate-[0.0deg]" : ""
												}`}
											>
												<td className="p-3 border-b border-l border-black uppercase font-bold tracking-tight">
													{name}
												</td>
												<td className="p-3 border-b border-black">
													<input
														type="number"
														name="shares_owned"
														value={shares_owned}
														onChange={(e) => handleChange(e, index)}
														className="w-full p-2 border-2 border-black focus:outline-none focus:ring-0 focus:border-black bg-transparent"
													/>
												</td>
												<td className="p-3 border-b border-black">
													<input
														type="number"
														name="cost_per_share"
														value={cost_per_share}
														onChange={(e) => handleChange(e, index)}
														className="w-full p-2 border-2 border-black focus:outline-none focus:ring-0 focus:border-black bg-transparent"
													/>
												</td>
												<td className="p-3 border-b border-black">
													<input
														type="number"
														name="market_price"
														value={market_price}
														onChange={(e) => handleChange(e, index)}
														className="w-full p-2 border-2 border-black focus:outline-none focus:ring-0 focus:border-black bg-transparent"
													/>
												</td>
												<td className="p-3 border-b border-black text-right font-mono">
													{market_value.toFixed(2)}
												</td>
												<td
													className={`p-3 border-b border-black text-right font-mono ${
														unrealized_gain_loss >= 0
															? "before:content-['+'] bg-[#CCFFCC] hover:bg-green-600"
															: "bg-[#FFCCCC] hover:bg-red-600"
													} relative`}
												>
													<span
														className={`${
															unrealized_gain_loss >= 0
																? "after:content-['\"PROFIT\"'] after:absolute after:-top-2 after:right-0 after:text-[8px] after:font-mono after:bg-lime-300 after:px-1 after:py-0 after:tracking-widest"
																: "after:content-['\"LOSS\"'] after:absolute after:-top-2 after:right-0 after:text-[8px] after:font-mono after:bg-red-300 after:px-1 after:py-0 after:tracking-widest"
														}`}
													>
														{unrealized_gain_loss.toFixed(2)}
													</span>
												</td>
												<td className="p-3 border-b border-r border-black">
													<button
														className="px-4 py-2 border-2 border-black uppercase font-mono text-xs tracking-widest hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 hover:translate-x-1"
														onClick={() => removeStock(index)}
													>
														"remove"
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>

					<div className="col-12 mt-8 relative before:content-['ADD'] before:absolute before:-top-3 before:z-50 before:left-2 before:text-xs before:font-mono before:bg-white before:px-2 before:tracking-widest">
						<form
							className="flex flex-row gap-4 mb-8 border-2 border-dashed border-black p-6 rotate-[0.3deg] items-end"
							onSubmit={addStock}
						>
							<div className="flex flex-col w-full">
								<Label>STOCK NAME</Label>
								<Input
									className="p-3 border-b-2 border-black bg-transparent font-mono uppercase focus:outline-none focus:ring-0 focus:border-black placeholder:text-gray-400 placeholder:font-mono placeholder:text-sm placeholder:tracking-wider"
									name="name"
									type="text"
									placeholder="NAME"
									onChange={handleFormChange}
									value={form.name}
									required
								/>
							</div>
							<div className="flex flex-col w-full">
								<Label>NUMBER OF SHARES</Label>
								<Input
									className="p-3 border-b-2 border-black bg-transparent font-mono uppercase focus:outline-none focus:ring-0 focus:border-black placeholder:text-gray-400 placeholder:font-mono placeholder:text-sm placeholder:tracking-wider"
									name="shares_owned"
									type="number"
									placeholder="SHARES"
									value={form.shares_owned}
									onChange={handleFormChange}
								/>
							</div>
							<div className="flex flex-col w-full">
								<Label>COST</Label>
								<Input
									className="p-3 border-b-2 border-black bg-transparent font-mono uppercase focus:outline-none focus:ring-0 focus:border-black placeholder:text-gray-400 placeholder:font-mono placeholder:text-sm placeholder:tracking-wider"
									name="cost_per_share"
									type="number"
									placeholder="COST"
									value={form.cost_per_share}
									onChange={handleFormChange}
								/>
							</div>
							<div className="flex flex-col w-full">
								<Label>CURRENT PRICE</Label>
								<Input
									className="p-3 border-b-2 border-black bg-transparent font-mono uppercase focus:outline-none focus:ring-0 focus:border-black placeholder:text-gray-400 placeholder:font-mono placeholder:text-sm placeholder:tracking-wider"
									name="market_price"
									type="number"
									placeholder="PRICE"
									value={form.market_price}
									onChange={handleFormChange}
								/>
							</div>
							<Button className="min-w-max px-6 py-3 bg-black text-white uppercase font-mono text-xs tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all transform hover:-translate-y-1 hover:translate-x-1 ml-auto">
								"Add Stock"
							</Button>
						</form>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 border-t-2 border-black pt-8 relative before:content-['SUMMARY'] before:absolute before:-top-3 before:left-8 before:text-xs before:font-mono before:bg-white before:px-2 before:tracking-widest">
						<div className="col-span-1 transform rotate-[0.5deg]">
							<h4 className="text-xl font-mono uppercase tracking-wider mb-3 border-b border-black pb-2">
								Portfolio value
							</h4>
							<p className="text-3xl font-bold">
								${portfolio_market_value.toFixed(2)}
							</p>
						</div>
						<div className="col-span-1 transform -rotate-[0.5deg]">
							<h4
								className={`text-xl font-mono uppercase tracking-wider mb-3 border-b border-black pb-2 ${
									portfolio_gain_loss >= 0
										? "after:content-['\"UP\"'] after:text-xs after:font-bold after:bg-lime-300 after:px-1 after:ml-2"
										: "after:content-['\"DOWN\"'] after:text-xs after:font-bold after:bg-red-300 after:px-1 after:ml-2"
								}`}
							>
								Portfolio gain/loss
							</h4>
							<p
								className={`text-3xl font-bold relative ${
									portfolio_gain_loss >= 0
										? "text-black before:content-['+'] bg-[#CCFFCC] inline-block px-4 -mx-4 border-2 border-green-600"
										: "text-black bg-[#FFCCCC] inline-block px-4 -mx-4 border-2 border-red-600"
								}`}
							>
								${portfolio_gain_loss.toFixed(2)}
								<span
									className={`absolute -top-3 -right-1 text-xs font-mono tracking-widest px-1 transform rotate-[5deg] ${
										portfolio_gain_loss >= 0 ? "bg-lime-300" : "bg-red-300"
									}`}
								>
									{portfolio_gain_loss >= 0 ? '"PROFIT"' : '"LOSS"'}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div className="w-full text-right mt-16 font-mono text-xs tracking-wider uppercase">
					"FINANCIAL MARKETS DATA"
				</div>
			</div>
		</>
	);
}
