
import React from 'react';
import { Card } from './ui/card';
import { TrendingUp } from 'lucide-react';

interface EconomicEvent {
  date: string;
  time: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  forecast: string;
  previous: string;
}

export const EconomicCalendar = () => {
  const events: EconomicEvent[] = [
    {
      date: '2024-03-20',
      time: '14:00',
      event: 'Fed Interest Rate Decision',
      impact: 'High',
      forecast: '5.50%',
      previous: '5.50%'
    },
    {
      date: '2024-03-21',
      time: '08:30',
      event: 'Initial Jobless Claims',
      impact: 'Medium',
      forecast: '215K',
      previous: '209K'
    },
    {
      date: '2024-03-22',
      time: '09:45',
      event: 'Manufacturing PMI',
      impact: 'High',
      forecast: '52.1',
      previous: '51.8'
    }
  ];

  const getImpactColor = (impact: EconomicEvent['impact']) => {
    switch (impact) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <TrendingUp className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Economic Calendar</h3>
          <p className="text-sm text-slate-400">Upcoming Market Events</p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="p-4 rounded-lg bg-slate-800/50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{event.event}</div>
                <div className="text-sm text-slate-400">
                  {event.date} {event.time}
                </div>
              </div>
              <span className={`text-sm font-medium ${getImpactColor(event.impact)}`}>
                {event.impact}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-slate-400">Forecast: </span>
                <span>{event.forecast}</span>
              </div>
              <div>
                <span className="text-slate-400">Previous: </span>
                <span>{event.previous}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
