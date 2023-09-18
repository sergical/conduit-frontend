"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddAutomationForm from "./add-automation-form";

export default function AutomationCard() {
  const [addingAutomation, setAddingAutomation] = React.useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>⚡ Automation</CardTitle>
        <CardDescription>
          These automations will run once this position is created.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {addingAutomation ? (
          <AddAutomationForm
            removeAutomation={() => setAddingAutomation(false)}
          />
        ) : (
          <Button
            className="rounded-full"
            size="sm"
            onClick={() => setAddingAutomation(true)}
          >
            ➕ Add automation
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
