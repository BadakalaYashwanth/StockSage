
import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const stocks = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "MSFT", label: "Microsoft Corporation" },
  { value: "GOOGL", label: "Alphabet Inc." },
  { value: "AMZN", label: "Amazon.com Inc." },
  { value: "META", label: "Meta Platforms Inc." },
  { value: "TSLA", label: "Tesla Inc." },
  { value: "NVDA", label: "NVIDIA Corporation" },
  { value: "JPM", label: "JPMorgan Chase & Co." },
];

interface StockSearchProps {
  onSelect: (value: string) => void;
}

export function StockSearch({ onSelect }: StockSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = React.useCallback((currentValue: string) => {
    setValue(currentValue);
    onSelect(currentValue);
    setOpen(false);
  }, [onSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[250px] justify-between bg-slate-900/50 border-slate-800 text-slate-200 hover:bg-slate-800/50"
        >
          <Search className="mr-2 h-4 w-4" />
          {value
            ? stocks.find((stock) => stock.value === value)?.label
            : "Search stocks..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[250px] p-0 bg-slate-900/95 border-slate-800 text-slate-200 backdrop-blur-xl">
        <Command>
          <CommandInput placeholder="Search stocks..." className="h-9 border-none bg-transparent" />
          <CommandEmpty>No stock found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {stocks.map((stock) => (
              <CommandItem
                key={stock.value}
                value={stock.value}
                onSelect={handleSelect}
                className="hover:bg-slate-800/50"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === stock.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="font-medium">{stock.value}</span>
                <span className="ml-2 text-slate-400">{stock.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
