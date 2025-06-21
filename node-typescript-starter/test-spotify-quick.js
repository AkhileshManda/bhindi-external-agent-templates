// Quick test for Spotify agent with current token
const { SpotifyAgent } = require('./src/agents/spotify');

async function quickTest() {
    const agent = new SpotifyAgent();
    
    // Your current access token
    const accessToken = "BQCCmhUqyaBrhdDMjlzhsbvOWIIYZrdUAX4wAwi22NaolCHK-UmQ2OTEzQpMPa9H64XMXZ8bz1l_GmlCRYokHgHset_24YXU96rviMKoR7fDT0Yfk69XKs6OmIxOcroJDmXWXoC2BXziW-ismwVZ1C-HUVfkz3pF5_8Xr2BWRx2Eu-wkQVcVCiWsKYqCtAmEEmXWtabvYk-stE7WQ0fjGPmqGuj-yiqICeJTM7OwCGFfW51rXhIC2ibQ0mKaalAdcKCNCApTn2bPn43LBJvAR276YTdxFZpRwrVeFAwCuROtw9cJpAco4uW0x0topbUe8fHGvhLj";
    
    console.log("🎵 Testing Spotify Agent...\n");
    
    try {
        // Test 1: Get User Profile
        console.log("1️⃣ Testing get_user_profile...");
        const profileResult = await agent.executeTool("get_user_profile", {}, { "spotify-token": accessToken });
        console.log("✅ User Profile Result:", JSON.stringify(profileResult, null, 2));
        console.log("\n" + "=".repeat(50) + "\n");
        
        // Test 2: Search Tracks
        console.log("2️⃣ Testing search_tracks...");
        const searchResult = await agent.executeTool("search_tracks", {
            query: "Bohemian Rhapsody",
            limit: 3
        }, { "spotify-token": accessToken });
        console.log("✅ Search Tracks Result:", JSON.stringify(searchResult, null, 2));
        console.log("\n" + "=".repeat(50) + "\n");
        
        // Test 3: Get Recently Played
        console.log("3️⃣ Testing get_recently_played...");
        const recentResult = await agent.executeTool("get_recently_played", {
            limit: 3
        }, { "spotify-token": accessToken });
        console.log("✅ Recently Played Result:", JSON.stringify(recentResult, null, 2));
        console.log("\n" + "=".repeat(50) + "\n");
        
        // Test 4: Get Recommendations
        console.log("4️⃣ Testing get_recommendations...");
        const recResult = await agent.executeTool("get_recommendations", {
            seed_genres: ["rock"],
            limit: 3
        }, { "spotify-token": accessToken });
        console.log("✅ Recommendations Result:", JSON.stringify(recResult, null, 2));
        
        console.log("\n🎉 All tests completed successfully!");
        
    } catch (error) {
        console.error("❌ Test failed:", error);
    }
}

// Run the test
quickTest(); 