
import * as React from "react";
import { Check, ChevronsUpDown, Search, Building2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface StockSearchProps {
  onSelect: (value: string) => void;
}

interface Stock {
  id: number;
  symbol: string;
  company_name: string;
  sector: string;
}

export function StockSearch({ onSelect }: StockSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data: stocks, isLoading } = useQuery({
    queryKey: ['stocks', searchTerm],
    queryFn: async () => {
      if (!searchTerm) {
        const { data, error } = await supabase
          .from('stocks')
          .select('*')
          .limit(10);
        
        if (error) throw error;
        return data as Stock[];
      }

      const { data, error } = await supabase
        .from('stocks')
        .select('*')
        .or(`company_name.ilike.%${searchTerm}%,symbol.ilike.%${searchTerm}%`)
        .limit(20);
      
      if (error) throw error;
      return data as Stock[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

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
          className="w-full md:w-[300px] justify-between bg-slate-900/50 border-slate-800 text-slate-200 hover:bg-slate-800/50"
        >
          <Search className="mr-2 h-4 w-4" />
          {value
            ? stocks?.find((stock) => stock.symbol === value)?.company_name
            : "Search stocks..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[300px] p-0 bg-slate-900/95 border-slate-800 text-slate-200 backdrop-blur-xl">
        <Command>
          <CommandInput 
            placeholder="Search stocks..." 
            onValueChange={(search) => setSearchTerm(search)}
          />
          <CommandList>
            <CommandEmpty>No stock found.</CommandEmpty>
            {isLoading && (
              <div className="flex items-center justify-center py-4 text-sm text-slate-400">
                Searching stocks...
              </div>
            )}
            <CommandGroup>
              {stocks?.map((stock) => (
                <CommandItem
                  key={stock.symbol}
                  value={stock.symbol}
                  onSelect={handleSelect}
                  className="hover:bg-slate-800/50"
                >
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === stock.symbol ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stock.symbol}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {stock.sector}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">{stock.company_name}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
