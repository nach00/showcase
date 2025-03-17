import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";

interface Rate {
  [key: string]: number;
}

interface CurrencyConverterProps {
  rates: Rate | null;
}

export default function CurrencyConverter({ rates }: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number | string>(100);
  const [convertedAmount, setConvertedAmount] = useState<number | string>(0);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

  useEffect(() => {
    if (rates) {
      const currencies = Object.keys(rates);
      setAvailableCurrencies([
        "USD",
        ...currencies.filter((curr) => curr !== "USD"),
      ]);
    }
  }, [rates]);

  useEffect(() => {
    if (rates && typeof amount === "number") {
      let result: number;

      if (fromCurrency === "USD") {
        result = amount * (rates[toCurrency] || 1);
      } else if (toCurrency === "USD") {
        result = amount / (rates[fromCurrency] || 1);
      } else {
        const fromRate = rates[fromCurrency] || 1;
        const toRate = rates[toCurrency] || 1;
        result = (amount / fromRate) * toRate;
      }

      setConvertedAmount(parseFloat(result.toFixed(2)));
    }
  }, [fromCurrency, toCurrency, amount, rates]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setAmount(value === "" ? "" : parseFloat(value));
    }
  };

  const handleConvertedAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setConvertedAmount(value === "" ? "" : parseFloat(value));

      // Calculate the original amount based on the converted amount
      if (value !== "" && rates) {
        let newAmount: number;
        if (fromCurrency === "USD") {
          newAmount = parseFloat(value) / (rates[toCurrency] || 1);
        } else if (toCurrency === "USD") {
          newAmount = parseFloat(value) * (rates[fromCurrency] || 1);
        } else {
          const fromRate = rates[fromCurrency] || 1;
          const toRate = rates[toCurrency] || 1;
          newAmount = (parseFloat(value) * fromRate) / toRate;
        }
        setAmount(parseFloat(newAmount.toFixed(2)));
      }
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getRateDisplay = (): string => {
    if (!rates) return "—";

    if (fromCurrency === "USD") {
      return rates[toCurrency]?.toFixed(6) || "—";
    } else if (toCurrency === "USD") {
      return (1 / (rates[fromCurrency] || 1)).toFixed(6) || "—";
    } else {
      return (
        ((rates[toCurrency] || 1) / (rates[fromCurrency] || 1)).toFixed(6) ||
        "—"
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-screen-md mx-auto font-['Helvetica'] tracking-tight">
      <div className="relative flex items-center border-[3px] border-black p-7 min-h-[150px] transform rotate-[-1deg] hover:rotate-0 transition-transform">
        <div className="flex justify-center items-center w-[70px] h-[70px] rounded-full border-[3px] border-[#00CC00] font-bold text-2xl mr-5 aspect-square bg-black text-white">
          {getCurrencySymbol(fromCurrency)}
        </div>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          className="flex-1 text-6xl font-black border-none bg-transparent outline-none tracking-tighter uppercase"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="absolute top-5 right-5 p-2 bg-transparent border-[3px] border-black text-base font-black uppercase transform rotate-[2deg]"
        >
          {availableCurrencies.map((currency) => (
            <option key={`from-${currency}`} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div
        className="cursor-pointer self-center w-full max-w-[350px] transition-all hover:scale-105 group relative py-3 my-2"
        onClick={swapCurrencies}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 text-sm uppercase font-black tracking-wide text-[#00CC00] border-2 border-black group-hover:bg-[#00CC00] group-hover:text-black transition-colors">
          SWAP CURRENCIES
        </div>

        <svg className="w-full relative" height="60" viewBox="0 0 300 60">
          {/* Down arrow */}
          <line
            x1="30"
            y1="15"
            x2="30"
            y2="45"
            stroke="#00CC00"
            strokeWidth="4"
          />
          <polygon points="20,35 30,45 40,35" fill="#00CC00" />

          {/* Horizontal line */}
          <line
            x1="30"
            y1="30"
            x2="270"
            y2="30"
            stroke="#00CC00"
            strokeWidth="6"
            strokeDasharray="15,10"
          />

          {/* Up arrow */}
          <line
            x1="270"
            y1="45"
            x2="270"
            y2="15"
            stroke="#00CC00"
            strokeWidth="4"
          />
          <polygon points="260,25 270,15 280,25" fill="#00CC00" />

          {/* Animated circles on hover */}
          {/* <circle */}
          {/* 	cx="150" */}
          {/* 	cy="30" */}
          {/* 	r="8" */}
          {/* 	fill="none" */}
          {/* 	stroke="#000" */}
          {/* 	strokeWidth="2" */}
          {/* 	className="group-hover:animate-ping opacity-75" */}
          {/* /> */}
        </svg>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 py-1 px-4 bg-black text-white text-xs uppercase font-black tracking-wider group-hover:bg-[#00CC00] transition-colors">
          CLICK TO SWAP
        </div>

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          ↑
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          ↓
        </div>
      </div>

      <div className="relative flex items-center border-[3px] border-black p-7 min-h-[150px] transform rotate-[1deg] hover:rotate-0 transition-transform">
        <div className="flex justify-center items-center w-[70px] h-[70px] rounded-full border-[3px] border-[#00CC00] font-bold text-2xl mr-5 aspect-square bg-black text-white">
          {getCurrencySymbol(toCurrency)}
        </div>
        <input
          type="text"
          value={convertedAmount}
          onChange={handleConvertedAmountChange}
          className="flex-1 text-6xl font-black border-none bg-transparent outline-none tracking-tighter uppercase"
        />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="absolute top-5 right-5 p-2 bg-transparent border-[3px] border-black text-base font-black uppercase transform rotate-[-2deg]"
        >
          {availableCurrencies.map((currency) => (
            <option key={`to-${currency}`} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="self-start mt-4 transform -rotate-3">
        <div className="bg-[#00CC00] text-black font-black py-4 px-8 text-3xl uppercase tracking-tighter border-[3px] border-black">
          {`${fromCurrency} • ${toCurrency}`}
        </div>
      </div>

      <div className="mt-8 transform rotate-1">
        <div className="text-lg opacity-70 mb-1 uppercase font-bold tracking-widest">
          CURRENT RATE
        </div>
        <div className="text-5xl font-black tracking-tight border-b-[3px] border-black pb-2 inline-block uppercase">
          {`1 ${fromCurrency} = ${getRateDisplay()} ${toCurrency}`}
        </div>
      </div>

      {/* <Button className="bg-black text-white border-[3px] border-[#00CC00] py-6 text-3xl font-black tracking-tighter cursor-pointer mt-10 transition-all hover:bg-[#00CC00] hover:text-black hover:scale-[1.02] uppercase transform -rotate-1 rounded-none"> */}
      {/* 	COMPLETE TRANSACTION */}
      {/* </Button> */}
    </div>
  );
}

const getCurrencySymbol = (currencyCode: string): string => {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    CHF: "Fr",
    CNY: "¥",
    HKD: "HK$",
    NZD: "NZ$",
    INR: "₹",
    KRW: "₩",
    MXN: "$",
    SGD: "S$",
    ZAR: "R",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    BRL: "R$",
    RUB: "₽",
    PLN: "zł",
    THB: "฿",
    IDR: "Rp",
    // Add more currency symbols as needed
  };

  return currencySymbols[currencyCode] || currencyCode;
};
