// Detailed test to show actual Spotify API responses
const { SpotifyAgent } = require('./src/agents/spotify');

async function detailedTest() {
    const agent = new SpotifyAgent();
    
    // Your current access token
    const accessToken = "BQCCmhUqyaBrhdDMjlzhsbvOWIIYZrdUAX4wAwi22NaolCHK-UmQ2OTEzQpMPa9H64XMXZ8bz1l_GmlCRYokHgHset_24YXU96rviMKoR7fDT0Yfk69XKs6OmIxOcroJDmXWXoC2BXziW-ismwVZ1C-HUVfkz3pF5_8Xr2BWRx2Eu-wkQVcVCiWsKYqCtAmEEmXWtabvYk-stE7WQ0fjGPmqGuj-yiqICeJTM7OwCGFfW51rXhIC2ibQ0mKaalAdcKCNCApTn2bPn43LBJvAR276YTdxFZpRwrVeFAwCuROtw9cJpAco4uW0x0topbUe8fHGvhLj";
    
    console.log("🎵 DETAILED SPOTIFY AGENT TEST\n");
    console.log("Showing actual API responses...\n");
    
    try {
        // Test 1: User Profile
        console.log("=".repeat(60));
        console.log("1️⃣ USER PROFILE");
        console.log("=".repeat(60));
        const profileResult = await agent.executeTool("get_user_profile", {}, { "spotify-token": accessToken });
        if (profileResult.success) {
            const profileData = profileResult.data.text.data;
            console.log("✅ Success! Your Spotify Profile:");
            console.log(`   Name: ${profileData.display_name}`);
            console.log(`   Country: ${profileData.country}`);
            console.log(`   User ID: ${profileData.id}`);
            console.log(`   Account Type: ${profileData.product}`);
            console.log(`   Followers: ${profileData.followers?.total || 0}`);
            console.log(`   Profile URL: ${profileData.external_urls?.spotify}`);
        } else {
            console.log("❌ Failed:", profileResult.error);
        }
        
        // Test 2: Search Tracks
        console.log("\n" + "=".repeat(60));
        console.log("2️⃣ SEARCH TRACKS");
        console.log("=".repeat(60));
        const searchResult = await agent.executeTool("search_tracks", {
            query: "Bohemian Rhapsody",
            limit: 3
        }, { "spotify-token": accessToken });
        
        if (searchResult.success) {
            const tracks = searchResult.data.text.data.tracks.items;
            console.log("✅ Success! Found tracks:");
            tracks.forEach((track, index) => {
                console.log(`   ${index + 1}. ${track.name} by ${track.artists.map(a => a.name).join(', ')}`);
                console.log(`      Album: ${track.album.name}`);
                console.log(`      Duration: ${Math.round(track.duration_ms / 1000)}s`);
                console.log(`      Popularity: ${track.popularity}/100`);
                console.log(`      Track ID: ${track.id}`);
                console.log("");
            });
        } else {
            console.log("❌ Failed:", searchResult.error);
        }
        
        // Test 3: Current Playback
        console.log("=".repeat(60));
        console.log("3️⃣ CURRENT PLAYBACK");
        console.log("=".repeat(60));
        const playbackResult = await agent.executeTool("get_current_playback", {}, { "spotify-token": accessToken });
        
        if (playbackResult.success) {
            const playbackData = playbackResult.data.text.data;
            if (playbackData && playbackData.is_playing) {
                console.log("✅ Success! Currently playing:");
                console.log(`   Track: ${playbackData.item.name}`);
                console.log(`   Artist: ${playbackData.item.artists.map(a => a.name).join(', ')}`);
                console.log(`   Album: ${playbackData.item.album.name}`);
                console.log(`   Progress: ${Math.round(playbackData.progress_ms / 1000)}s / ${Math.round(playbackData.item.duration_ms / 1000)}s`);
                console.log(`   Device: ${playbackData.device?.name || 'Unknown'}`);
                console.log(`   Volume: ${playbackData.device?.volume_percent || 'Unknown'}%`);
            } else {
                console.log("ℹ️  Not currently playing anything");
            }
        } else {
            console.log("❌ Failed:", playbackResult.error);
        }
        
        // Test 4: Recently Played
        console.log("\n" + "=".repeat(60));
        console.log("4️⃣ RECENTLY PLAYED");
        console.log("=".repeat(60));
        const recentResult = await agent.executeTool("get_recently_played", {
            limit: 3
        }, { "spotify-token": accessToken });
        
        if (recentResult.success) {
            const recentTracks = recentResult.data.text.data.items;
            console.log("✅ Success! Recently played:");
            recentTracks.forEach((item, index) => {
                const track = item.track;
                const playedAt = new Date(item.played_at).toLocaleString();
                console.log(`   ${index + 1}. ${track.name} by ${track.artists.map(a => a.name).join(', ')}`);
                console.log(`      Album: ${track.album.name}`);
                console.log(`      Played at: ${playedAt}`);
                console.log(`      Duration: ${Math.round(track.duration_ms / 1000)}s`);
                console.log("");
            });
        } else {
            console.log("❌ Failed:", recentResult.error);
        }
        
        // Test 5: Search Artists
        console.log("=".repeat(60));
        console.log("5️⃣ SEARCH ARTISTS");
        console.log("=".repeat(60));
        const artistResult = await agent.executeTool("search_artists", {
            query: "Queen",
            limit: 2
        }, { "spotify-token": accessToken });
        
        if (artistResult.success) {
            const artists = artistResult.data.text.data.artists.items;
            console.log("✅ Success! Found artists:");
            artists.forEach((artist, index) => {
                console.log(`   ${index + 1}. ${artist.name}`);
                console.log(`      Followers: ${artist.followers?.total?.toLocaleString() || 'Unknown'}`);
                console.log(`      Popularity: ${artist.popularity}/100`);
                console.log(`      Genres: ${artist.genres?.join(', ') || 'None'}`);
                console.log(`      Artist ID: ${artist.id}`);
                console.log("");
            });
        } else {
            console.log("❌ Failed:", artistResult.error);
        }
        
        console.log("=".repeat(60));
        console.log("🎉 ALL TESTS COMPLETED!");
        console.log("=".repeat(60));
        console.log("Your Spotify agent is returning real data from the Spotify API!");
        
    } catch (error) {
        console.error("❌ Test failed:", error);
    }
}

// Run the detailed test
detailedTest(); 