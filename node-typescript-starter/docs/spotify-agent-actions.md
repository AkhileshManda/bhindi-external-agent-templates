# Spotify Agent – Actions & cURL Examples

> Authenticate every request with a Spotify **OAuth 2.0 bearer token**:
>
> ```bash
> -H "Authorization: Bearer ${ACCESS_TOKEN}"
> ```
>
> Replace placeholders (`${ACCESS_TOKEN}`, `${PLAYLIST_ID}` …) with real values.  
> Official docs: <https://developer.spotify.com/documentation/web-api>

---

## 1. Search Tracks
Retrieve tracks that match a search query.

```bash
curl -G https://api.spotify.com/v1/search \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode "q=${QUERY}" \
  --data-urlencode "type=track" \
  --data-urlencode "limit=${LIMIT}" \
  --data-urlencode "offset=${OFFSET}"
```
*`LIMIT` 1-50 (default 20). `OFFSET` for paging.*

---

## 2. Search Artists

```bash
curl -G https://api.spotify.com/v1/search \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode "q=${QUERY}" \
  --data-urlencode "type=artist" \
  --data-urlencode "limit=${LIMIT}" \
  --data-urlencode "offset=${OFFSET}"
```

---

## 3. Create Playlist (Current User)

```bash
curl -X POST https://api.spotify.com/v1/me/playlists \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My AI Playlist",
    "description": "Created by the Spotify agent",
    "public": false
  }'
```

---

## 4. Add Tracks to Playlist

```bash
curl -X POST https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "uris": [
      "spotify:track:${TRACK_ID_1}",
      "spotify:track:${TRACK_ID_2}"
    ],
    "position": 0
  }'
```

---

## 5. Remove Tracks from Playlist

```bash
curl -X DELETE https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "tracks": [
      {"uri": "spotify:track:${TRACK_ID_1}"},
      {"uri": "spotify:track:${TRACK_ID_2}"}
    ]
  }'
```

---

## 6. Get Playlist Items

```bash
curl -X GET "https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=${LIMIT}&offset=${OFFSET}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 7. Get Current Playback State

```bash
curl -X GET https://api.spotify.com/v1/me/player \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

## 8. Get Recommendations (Genre Seeds)
Generate recommendations using genre seeds (no IDs required).

```bash
curl -G https://api.spotify.com/v1/recommendations \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode "seed_genres=${SEED_GENRES}" \
  --data-urlencode "limit=${LIMIT}" \
  --data-urlencode "market=${MARKET}"
```
*`SEED_GENRES` – comma-separated list of 1-5 genres. Use the "available genre seeds" endpoint to discover valid values.*

---

## 9. Get Recently Played Tracks

```bash
curl -X GET "https://api.spotify.com/v1/me/player/recently-played?limit=${LIMIT}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```
*Requires scope `user-read-recently-played`.*

---

## 10. Get Current User Profile

```bash
curl -X GET https://api.spotify.com/v1/me \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

---

### Tips
* Chain calls: run **Search Tracks** to obtain `track_id`s, then **Add Tracks to Playlist**.
* Scopes you may need: `playlist-modify-private`, `playlist-read-private`, `user-read-playback-state`, `user-read-recently-played`, etc.
* Spotify enforces rate limits—check `Retry-After` on 429 responses. 