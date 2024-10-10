import { DiscordApi } from "./types";
import * as mockApi from "./mock";
import * as productionApi from "./api";

const isProduction = process.env.NODE_ENV === "production";

export const discordApi: DiscordApi = isProduction ? productionApi : mockApi;
