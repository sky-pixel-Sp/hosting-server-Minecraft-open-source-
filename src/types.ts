export interface ServerSettings {
  version: string;
  type: "vanilla" | "paper" | "forge" | "fabric" | "spigot";
  motd: string;
  maxPlayers: number;
  serverPort: number;
  difficulty: "peaceful" | "easy" | "normal" | "hard";
  gamemode: "survival" | "creative" | "adventure" | "spectator";
  onlineMode: boolean;
  pvp: boolean;
  hardcore: boolean;
  enableCommandBlock: boolean;
  levelName: string;
  levelSeed: string;
}

export type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
};
