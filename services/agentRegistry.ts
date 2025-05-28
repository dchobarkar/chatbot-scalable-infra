import { Agent } from "types/Agent";
import { salesAgent } from "@agents/salesAgent";
import { supportAgent } from "@agents/supportAgents";

const agents: Record<string, Agent> = {
  [supportAgent.id]: supportAgent,
  [salesAgent.id]: salesAgent,
};

export const getAgentById = (id: string): Agent | null => agents[id] || null;
export const listAgents = (): Agent[] => Object.values(agents);
