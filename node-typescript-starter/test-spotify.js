// Simple test script for Spotify agent
const SpotifyAgent = require('./dist/agents/spotify').SpotifyAgent;

async function testSpotifyAgent() {
    const agent = new SpotifyAgent();
    
    // Test parameters
    const testParams = {
        query: "Bohemian Rhapsody",
        limit: 3
    };
    
    // Test token (you'll need to replace this with a valid token)
    const testToken = "YOUR_ACCESS_TOKEN_HERE";
    
    try {
        console.log("Testing Spotify Agent...");
        
        // Test search tracks
        const result = await agent.executeTool("search_tracks", testParams, { "spotify-token": testToken });
        console.log("Search Tracks Result:", result);
        
        // Test get user profile
        const profileResult = await agent.executeTool("get_user_profile", {}, { "spotify-token": testToken });
        console.log("User Profile Result:", profileResult);
        
    } catch (error) {
        console.error("Test failed:", error);
    }
}

// Uncomment to run test
// testSpotifyAgent(); 