"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Condition } from "@/components/automation/add-automation-form";
import Image from "next/image";
import Toggle from "../ui/toggle";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// Tried the graph protocol graphclient but it's not working - TS5095
// Got from https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3/graphql?query=query+%7B%0A++tokens%28orderBy%3A+%22totalValueLockedUSD%22%2C+skip%3A2%2C+first%3A5%2C+orderDirection%3A+%22desc%22%29+%7B%0A++++id%0A++++name%0A++++symbol%0A++%7D%0A%7D
// Tried apollo graphql but CORS is not allowing it
// import { useQuery, gql } from "@apollo/client";
// Just gonna take the data from the graph explorer and use it here

interface AutomationConditionProps {
  condition: Condition;
  setCondition: (condition: Condition) => void;
}

const DATA = {
  tokens: [
    {
      id: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      id: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      id: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      name: "Wrapped BTC",
      symbol: "WBTC",
    },
    {
      id: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      name: "Tether USD",
      symbol: "USDT",
    },
    {
      id: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "Dai Stablecoin",
      symbol: "DAI",
    },
  ],
};

type Token = (typeof DATA.tokens)[0];

// const GET_TOKENS = gql`
//   query GetTokens {
//     tokens(orderBy: "totalValueLockedUSD", first: 5, orderDirection: "desc") {
//       id
//       name
//       symbol
//     }
//   }
// `;

export default function AutomationCondition({
  condition,
  setCondition,
}: AutomationConditionProps) {
  // const { loading, error, data } = useQuery(GET_TOKENS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;
  // console.log(data);

  const { tokens } = DATA;
  return (
    <div
      className={`flex flex-col gap-3 flex-wrap border-b pb-4 ${
        condition.conditionType === "group" &&
        "dark:bg-black bg-muted p-4 rounded-md"
      }`}
    >
      {condition.conditionType === "group" && (
        <h3 className="text-muted-foreground text-sm uppercase">Group</h3>
      )}
      <div className="flex gap-2 items-center flex-wrap">
        <Toggle
          selected={condition.type}
          onChange={(option) => {
            setCondition({
              ...condition,
              type: option as any,
            });
          }}
          options={[
            {
              label: "And",
              value: "and",
            },
            {
              label: "Or",
              value: "or",
            },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          {condition.type === "and" ? "All" : "Any"} of the conditions must be
          met
        </p>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Select>
          <SelectTrigger className="sm:grow-0 min-w-[150px] sm:w-[150px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {tokens.map((token) => (
              <SelectItem
                key={token.id}
                value={token.id}
                onChange={() => {
                  setCondition({
                    ...condition,
                    token: {
                      ...condition.token,
                      name: token.name,
                    },
                  });
                }}
              >
                <div className="flex gap-1">
                  <Image
                    src={`
                https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${token.id}/logo.png`}
                    alt={token.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 mr-2"
                  />
                  {token.symbol}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="uppercase text-muted-foreground">is</p>
        <Toggle
          selected={condition.token.type}
          onChange={(option) => {
            setCondition({
              ...condition,
              token: {
                ...condition.token,
                type: option as any,
              },
            });
          }}
          options={[
            {
              label: "More",
              icon: ArrowUp,
              value: "more",
            },
            {
              label: "Less",
              icon: ArrowDown,
              value: "less",
            },
          ]}
        />
        <p className="uppercase text-muted-foreground">than</p>
        <Input
          type="text"
          className="w-20 p-2 border rounded-md"
          placeholder="0"
          onChange={(e) => {
            setCondition({
              ...condition,
              token: {
                ...condition.token,
                value: Number(e.target.value),
              },
            });
          }}
        />
      </div>

      {condition.conditionType === "group" && (
        <div className="flex gap-2">
          <Button
            className="rounded-full"
            size="sm"
            onClick={() =>
              setCondition({
                conditionType: "single",
                type: "and",
                token: {
                  type: "more",
                  value: 100,
                  name: "",
                },
              })
            }
          >
            ➕ Add Condition
          </Button>
          <Button
            className="rounded-full"
            size="sm"
            variant={"outline"}
            onClick={() =>
              setCondition({
                conditionType: "group",
                type: "and",
                token: {
                  type: "more",
                  value: 100,
                  name: "",
                },
              })
            }
          >
            ➕ Add Inner Group
          </Button>
        </div>
      )}
    </div>
  );
}
