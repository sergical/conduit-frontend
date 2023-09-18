"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface ToggleProps {
  options: Option[];
  selected: string;
  onChange: (option: string) => void;
}

interface Option {
  label: string;
  icon?: LucideIcon;
  value: string;
}

export default function Toggle({ options, selected, onChange }: ToggleProps) {
  return (
    <div className="flex border rounded-full p-1">
      {options.map(({ label, icon: Icon, value }) => (
        <Button
          key={value}
          className={`flex items-center justify-center px-4 py-2 rounded-full ${
            selected === value ? "bg-muted" : null
          }`}
          onClick={() => onChange(value)}
          size="sm"
          variant={"ghost"}
        >
          {Icon && <Icon className={`h-4 w-4 mr-2`} />}
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
}
