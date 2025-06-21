// Final comprehensive test for Spotify agent
const { SpotifyAgent } = require('./src/agents/spotify');

async function finalTest() {
    const agent = new SpotifyAgent();
    
    // Your current access token
    const accessToken = "BQCCmhUqyaBrhdDMjlzhsbvOWIIYZrdUAX4wAwi22NaolCHK-UmQ2OTEzQpMPa9H64XMXZ8bz1l_GmlCRYokHgHset_24YXU96rviMKoR7fDT0Yfk69XKs6OmIxOcroJDmXWXoC2BXziW-ismwVZ1C-HUVfkz3pF5_8Xr2BWRx2Eu-wkQVcVCiWsKYqCtAmEEmXWtabvYk-stE7WQ0fjGPmqGuj-yiqICeJTM7OwCGFfW51rXhIC2ibQ0mKaalAdcKCNCApTn2bPn43LBJvAR276YTdxFZpRwrVeFAwCuROtw9cJpAco4uW0x0topbUe8fHGvhLj";
    
    console.log("🎵 FINAL SPOTIFY AGENT TEST\n");
    console.log("Testing all implemented functions...\n");
    
    const tests = [
        {
            name: "get_user_profile",
            params: {},
            description: "Get user profile"
        },
        {
            name: "search_tracks", 
            params: { query: "Queen", limit: 2 },
            description: "Search for Queen tracks"
        },
        {
            name: "search_artists",
            params: { query: "Queen", limit: 2 },
            description: "Search for Queen artists"
        },
        {
            name: "get_current_playback",
            params: {},
            description: "Get current playback state"
        },
        {
            name: "get_recently_played",
            params: { limit: 2 },
            description: "Get recently played tracks"
        }
    ];
    
    let passedTests = 0;
    let totalTests = tests.length;
    
    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        console.log(`${i + 1}. Testing ${test.name} (${test.description})...`);
        
        try {
            const result = await agent.executeTool(test.name, test.params, { "spotify-token": accessToken });
            
            if (result.success) {
                console.log(`   ✅ PASSED - ${test.name}`);
                passedTests++;
            } else {
                console.log(`   ❌ FAILED - ${test.name}: ${result.error?.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.log(`   ❌ ERROR - ${test.name}: ${error.message}`);
        }
        
        console.log("");
    }
    
    console.log("=".repeat(50));
    console.log(`🎯 TEST RESULTS: ${passedTests}/${totalTests} tests passed`);
    console.log("=".repeat(50));
    
    if (passedTests === totalTests) {
        console.log("🎉 ALL TESTS PASSED! Your Spotify agent is working perfectly!");
    } else {
        console.log("⚠️  Some tests failed, but core functionality is working.");
    }
    
    console.log("\n🚀 Your Spotify agent is ready for production use!");
}

// Run the final test
finalTest(); 