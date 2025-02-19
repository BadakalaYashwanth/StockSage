
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MutualFund, FundAlert } from '../types';

interface AlertDialogProps {
  fund: MutualFund;
  onSubmit: (alert: Omit<FundAlert, 'id' | 'is_triggered'>) => void;
  onCancel: () => void;
}

export const AlertDialog = ({ fund, onSubmit, onCancel }: AlertDialogProps) => {
  const [alertType, setAlertType] = useState<FundAlert['alert_type']>('NAV_CHANGE');
  const [threshold, setThreshold] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fund_id: fund.id,
      alert_type: alertType,
      threshold: parseFloat(threshold),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Alert Type</label>
        <Select
          value={alertType}
          onValueChange={(value: FundAlert['alert_type']) => setAlertType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alert type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NAV_CHANGE">NAV Change</SelectItem>
            <SelectItem value="PERFORMANCE">Performance</SelectItem>
            <SelectItem value="RISK">Risk Level</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Threshold {alertType === 'NAV_CHANGE' ? '(₹)' : '(%)'}
        </label>
        <Input
          type="number"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          placeholder="Enter threshold value"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Alert</Button>
      </div>
    </form>
  );
};
