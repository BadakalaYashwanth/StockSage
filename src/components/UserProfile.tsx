
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Settings, User, Bell, PieChart } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { useToast } from './ui/use-toast';

export const UserProfile = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [defaultChartType, setDefaultChartType] = React.useState('area');

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your dashboard preferences have been updated.",
      duration: 2000,
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <User className="w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold">User Profile</h3>
          <p className="text-sm text-slate-400">Manage your preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Default Chart Type</label>
          <Select value={defaultChartType} onValueChange={setDefaultChartType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="candlestick">Candlestick</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Push Notifications</label>
            <p className="text-sm text-slate-400">
              Receive alerts for price changes
            </p>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Alert Threshold (%)</label>
          <Input type="number" placeholder="5" className="max-w-[200px]" />
        </div>

        <Button onClick={handleSavePreferences} className="w-full">
          Save Preferences
        </Button>
      </div>
    </Card>
  );
};
