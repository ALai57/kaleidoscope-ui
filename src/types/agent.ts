export interface Agent {
  id: string;
  agent_type: string;   // stable key: 'coach' | 'pm' | 'engineering_lead' | custom
  name: string;
  short_name: string;
  avatar: string;       // single emoji character
  color: string;        // CSS color for avatar background
  system_prompt: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAgentBody {
  agent_type: string;
  name: string;
  short_name: string;
  avatar: string;
  color: string;
  system_prompt: string;
}

export interface UpdateAgentBody {
  name?: string;
  short_name?: string;
  avatar?: string;
  color?: string;
  system_prompt?: string;
}

// Fallback personas used while the API is loading, matching the backend seed data.
export const DEFAULT_AGENT_PERSONAS: Record<string, Pick<Agent, 'avatar' | 'color' | 'short_name' | 'name'>> = {
  coach:            { avatar: '🐬', short_name: 'Coach',     name: 'Project Coach',    color: '#0891b2' },
  pm:               { avatar: '🦊', short_name: 'Product',   name: 'Product Manager',  color: '#7c3aed' },
  engineering_lead: { avatar: '🦉', short_name: 'Architect', name: 'Engineering Lead', color: '#0369a1' },
};

export const DEFAULT_AGENT_PERSONA = { avatar: '🐱', short_name: 'Advisor', name: 'Expert Advisor', color: '#6b7280' };

/** Look up display info for an agent_type, falling back to the default persona. */
export function getAgentPersona(
  agentType: string,
  agents: Agent[] = [],
): Pick<Agent, 'avatar' | 'color' | 'short_name' | 'name'> {
  const live = agents.find((a) => a.agent_type === agentType);
  const defaults = DEFAULT_AGENT_PERSONAS[agentType] ?? DEFAULT_AGENT_PERSONA;
  if (!live) return defaults;
  return {
    avatar: live.avatar || defaults.avatar,
    color: live.color || defaults.color,
    short_name: live.short_name || defaults.short_name,
    name: live.name || defaults.name,
  };
}
