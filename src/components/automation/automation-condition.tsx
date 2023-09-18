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
// Tried the graph protocol graphclient but it's not working - TS5095
// Got from https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3/graphql?query=query+%7B%0A++tokens%28orderBy%3A+%22totalValueLockedUSD%22%2C+skip%3A2%2C+first%3A5%2C+orderDirection%3A+%22desc%22%29+%7B%0A++++id%0A++++name%0A++++symbol%0A++%7D%0A%7D
// Tried apollo graphql but CORS is not allowing it
// import { useQuery, gql } from "@apollo/client";
// Just gonna take the data from the graph explorer and use it here

interface AutomationConditionProps {
  condition: Condition;
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
}: AutomationConditionProps) {
  // const { loading, error, data } = useQuery(GET_TOKENS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;
  // console.log(data);

  const { tokens } = DATA;
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {tokens.map((token) => (
            <SelectItem key={token.id} value={token.id}>
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
    </div>
  );
}
