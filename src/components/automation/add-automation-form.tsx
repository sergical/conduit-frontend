import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Toggle from "@/components/ui/toggle";
import { Repeat, Repeat1 } from "lucide-react";

interface AddAutomationFormProps {
  removeAutomation: () => void;
}

export enum AutomationType {
  Loop = "Loop",
  RunOnce = "RunOnce",
}

export default function AddAutomationForm({
  removeAutomation,
}: AddAutomationFormProps) {
  const [selected, setSelected] = React.useState("Loop");
  return (
    <Card className="p-0">
      <CardHeader className="p-3 border-b">
        <div className="flex justify-between items-center">
          <Toggle
            options={[
              {
                label: "Loop",
                icon: Repeat,
                value: AutomationType.Loop,
              },
              {
                label: "Run Once",
                icon: Repeat1,
                value: AutomationType.RunOnce,
              },
            ]}
            selected={selected}
            onChange={(option) => setSelected(option)}
          />

          <Button
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={removeAutomation}
          >
            ❌ Remove automation
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 border-b">
        <h3 className="text-muted-foreground text-sm uppercase">Conditions</h3>
        {}
      </CardContent>
      <CardFooter className="p-3">
        <Button className="rounded-full" size="sm">
          ➕ Add Action
        </Button>
      </CardFooter>
    </Card>
  );
}
