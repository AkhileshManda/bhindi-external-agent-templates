import { createErrorResponse, createTextResponse } from "../../utils/response";
import { BaseAgentHandler } from "../base-agent";
import { spotifyTools, SpotifyTools } from "./tools";

export class SpotifyAgent extends BaseAgentHandler<SpotifyTools> {
    constructor() {
        super(spotifyTools, [], []);
    }

    async executeTool<K extends keyof SpotifyTools>(
        toolName: K,
        parameters: SpotifyTools[K],
        variables?: Record<string, string>
    ): Promise<any> {
        // Validate required variables
        const spotifyToken = variables?.["spotify-token"];


        if (!spotifyToken) {
            return createErrorResponse(
                "Need spotify token to be able to connect to spotify",
                400
            );
        }

        // Simulate Redis operations (in a real implementation, you'd use a Redis client)
        switch (toolName) {

            default:
                return createErrorResponse(
                    `Tool ${String(toolName)} not implemented`,
                    404
                );
        }
    }
}
