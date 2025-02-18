
import React from 'react';
import { Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface Feature {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface FeatureSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: Feature[];
  index: number;
}

export const FeatureSection = ({ title, icon, description, features, index }: FeatureSectionProps) => {
  return (
    <Card className="p-6 glass-card animate-fade-in" style={{
      animationDelay: `${index * 100}ms`
    }}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-slate-400">{description}</p>
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h3 className="font-medium">{feature.name}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
