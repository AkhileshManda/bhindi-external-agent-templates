# Spotify Agent Implementation

## Overview

The Spotify Agent has been fully implemented with clean, modular functions that call the actual Spotify Web API endpoints. All functions return standardized responses and handle errors gracefully.

## Implemented Functions

### 1. Search Tracks
**Function:** `searchTracks(params, token)`  
**Endpoint:** `GET /search?q={query}&type=track`  
**Parameters:**
- `query` (string, required): Search query
- `limit` (number, optional): Number of results (1-50)
- `offset` (number, optional): Offset for pagination

**Example:**
```typescript
const result = await agent.executeTool("search_tracks", {
    query: "Bohemian Rhapsody",
    limit: 5
}, { "spotify-token": "YOUR_TOKEN" });
```

### 2. Search Artists
**Function:** `searchArtists(params, token)`  
**Endpoint:** `GET /search?q={query}&type=artist`  
**Parameters:**
- `query` (string, required): Search query
- `limit` (number, optional): Number of results (1-50)
- `offset` (number, optional): Offset for pagination

### 3. Create Playlist
**Function:** `createPlaylist(params, token)`  
**Endpoint:** `POST /me/playlists`  
**Parameters:**
- `name` (string, required): Playlist name
- `description` (string, optional): Playlist description
- `public` (boolean, optional): Whether playlist is public

### 4. Add Tracks to Playlist
**Function:** `addTracksToPlaylist(params, token)`  
**Endpoint:** `POST /playlists/{playlist_id}/tracks`  
**Parameters:**
- `playlist_id` (string, required): Spotify playlist ID
- `track_ids` (string[], required): Array of track IDs
- `position` (number, optional): Position to insert tracks

### 5. Remove Tracks from Playlist
**Function:** `removeTracksFromPlaylist(params, token)`  
**Endpoint:** `DELETE /playlists/{playlist_id}/tracks`  
**Parameters:**
- `playlist_id` (string, required): Spotify playlist ID
- `track_ids` (string[], required): Array of track IDs to remove

### 6. Get Playlist Items
**Function:** `getPlaylistItems(params, token)`  
**Endpoint:** `GET /playlists/{playlist_id}/tracks`  
**Parameters:**
- `playlist_id` (string, required): Spotify playlist ID
- `limit` (number, optional): Number of items to return
- `offset` (number, optional): Offset for pagination

### 7. Get Current Playback State
**Function:** `getCurrentPlayback(token)`  
**Endpoint:** `GET /me/player`  
**Parameters:** None (uses token only)

### 8. Get Recommendations
**Function:** `getRecommendations(params, token)`  
**Endpoint:** `GET /recommendations`  
**Parameters:**
- `seed_genres` (string[], required): Array of genre seeds (1-5)
- `limit` (number, optional): Number of recommendations
- `market` (string, optional): Market code

### 9. Get Recently Played Tracks
**Function:** `getRecentlyPlayed(params, token)`  
**Endpoint:** `GET /me/player/recently-played`  
**Parameters:**
- `limit` (number, optional): Number of items to return

### 10. Get User Profile
**Function:** `getUserProfile(token)`  
**Endpoint:** `GET /me`  
**Parameters:** None (uses token only)

## Architecture

### Core Components

1. **SpotifyAgent Class**: Main agent class that handles all tool execution
2. **makeApiCall Method**: Centralized API calling with error handling
3. **Individual Function Methods**: Clean, focused functions for each endpoint
4. **Standardized Response Format**: All functions return consistent response objects

### Error Handling

- **Network Errors**: Caught and returned as 500 errors
- **API Errors**: Spotify API errors are preserved with original status codes
- **Validation Errors**: Missing tokens return 400 errors
- **Unknown Tools**: Return 404 errors

### Response Format

**Success Response:**
```json
{
  "success": true,
  "responseType": "text",
  "data": {
    "text": {
      "data": { /* Spotify API response */ }
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": 400,
    "details": ""
  }
}
```

## Usage Examples

### Basic Usage
```typescript
import { SpotifyAgent } from './src/agents/spotify';

const agent = new SpotifyAgent();

// Search for tracks
const searchResult = await agent.executeTool("search_tracks", {
    query: "Queen",
    limit: 5
}, { "spotify-token": "YOUR_ACCESS_TOKEN" });

// Get user profile
const profileResult = await agent.executeTool("get_user_profile", {}, {
    "spotify-token": "YOUR_ACCESS_TOKEN"
});
```

### Creating a Playlist with Tracks
```typescript
// 1. Create playlist
const playlistResult = await agent.executeTool("create_playlist", {
    name: "My AI Playlist",
    description: "Created by Spotify agent",
    public: false
}, { "spotify-token": "YOUR_ACCESS_TOKEN" });

// 2. Search for tracks
const searchResult = await agent.executeTool("search_tracks", {
    query: "Bohemian Rhapsody",
    limit: 3
}, { "spotify-token": "YOUR_ACCESS_TOKEN" });

// 3. Add tracks to playlist (extract track IDs from search result)
const trackIds = ["4u7EnebtmKWzUH433cf5Qv", "3z8h0TU7ReDPLIbEnYhWZb"];
const addResult = await agent.executeTool("add_tracks_to_playlist", {
    playlist_id: "PLAYLIST_ID_FROM_STEP_1",
    track_ids: trackIds
}, { "spotify-token": "YOUR_ACCESS_TOKEN" });
```

## Required Scopes

For full functionality, your access token needs these scopes:
- `user-read-private` - Read user profile
- `user-read-recently-played` - Get recently played tracks
- `playlist-modify-private` - Create/modify private playlists
- `playlist-read-private` - Read private playlists
- `user-read-playback-state` - Get current playback state
- `playlist-modify-public` - Create/modify public playlists

## Token Management

- **Access Token**: Valid for 1 hour, used for API calls
- **Refresh Token**: Valid for weeks/months, used to get new access tokens
- **Automatic Refresh**: Implement token refresh logic in your application

## Testing

Use the provided test script (`test-spotify.js`) to verify functionality:

```bash
# Replace YOUR_ACCESS_TOKEN with a valid token
node test-spotify.js
```

## Next Steps

1. **Environment Setup**: Add Spotify credentials to environment variables
2. **Token Management**: Implement automatic token refresh
3. **Error Handling**: Add retry logic for rate limits
4. **Caching**: Add response caching for frequently accessed data
5. **Validation**: Add input validation for parameters 