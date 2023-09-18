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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AutomationCondition from "./automation-condition";

interface AddAutomationFormProps {
  removeAutomation: () => void;
}

export enum AutomationType {
  Loop = "Loop",
  RunOnce = "RunOnce",
}

export interface TokenCondition {
  type: "more" | "less";
  value: number;
  name: string;
}

export interface Condition {
  conditionType: "single" | "group";
  type: "and" | "or";
  token: TokenCondition;
  conditions?: Condition[];
}

const defaultConditions: Condition[] = [
  {
    conditionType: "single",

    type: "and",
    token: {
      type: "more",
      value: 100,
      name: "",
    },
  },
];

export default function AddAutomationForm({
  removeAutomation,
}: AddAutomationFormProps) {
  const [selected, setSelected] = React.useState("Loop");
  const [conditions, setConditions] =
    React.useState<Condition[]>(defaultConditions);
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
      <CardContent className="p-3 border-b flex flex-col gap-4">
        <h3 className="text-muted-foreground text-sm uppercase">Conditions</h3>
        {conditions.map((condition, index) => (
          <AutomationCondition
            key={index}
            condition={condition}
            setCondition={(condition) => {
              const newConditions = [...conditions];
              newConditions[index] = condition;
              setConditions(newConditions);
            }}
          />
        ))}
        <div className="flex gap-2">
          <Button
            className="rounded-full"
            size="sm"
            onClick={() =>
              setConditions([
                ...conditions,
                {
                  conditionType: "single",
                  type: "and",
                  token: {
                    type: "more",
                    value: 100,
                    name: "",
                  },
                },
              ])
            }
          >
            ➕ Add Condition
          </Button>
          <Button
            className="rounded-full"
            size="sm"
            variant={"outline"}
            onClick={() =>
              setConditions([
                ...conditions,
                {
                  conditionType: "group",
                  type: "and",
                  token: {
                    type: "more",
                    value: 100,
                    name: "",
                  },
                },
              ])
            }
          >
            ➕ Add Group
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-3">
        <div className="flex flex-col grow-0 gap-3">
          <h3 className="text-muted-foreground text-sm uppercase">Action</h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Button className="rounded-full" size="sm">
            ➕ Add Action
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
