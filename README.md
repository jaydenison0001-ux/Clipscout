# ClipScout — iPhone-friendly reverse video search

## What this project does
- Lets you search one clip at a time.
- Extracts up to four frames from a selected video locally in the browser.
- Searches those still frames using the Reverse Video Search image-search API.
- Displays returned matching page links and provider statuses.
- Does not upload the full video to this app, download videos, bypass DRM/logins, or scrape protected sites.

## Important limitations
- It cannot search every website or private/unindexed library.
- A visual frame match is not proof of an exact full-video copy or original authorship.
- Longer/full versions and earliest uploads must be verified by comparing titles, durations, dates and pages.
- It can show matching source pages, but cannot reliably determine whether a page has a legitimate download button. Check the site itself.
- The optional original page URL is a reference only; the API accepts still images, not a video-page URL.

## Requirements
- Node.js 20+
- An account with https://reverse-video-search.com/ and an authorized account session token.
- Credits and permissions for whichever search providers you select.

The upstream API documentation says it uses an existing account session bearer token and does not provide a separate API-key issuance/OAuth flow for agents. Keep the token secret. Do not put it in frontend code or share it.

## Run locally
1. Unzip this project on a computer.
2. Install Node.js 20+ from https://nodejs.org/
3. Open Terminal in the `clipscout` folder.
4. Run `npm install`.
5. Copy `.env.example` to `.env`.
6. Put your own authorized token after `REVERSE_SEARCH_SESSION_TOKEN=` in `.env`.
7. Run `npm start`.
8. Open `http://localhost:3000` on the computer.

## Make it available on your iPhone
`localhost` on your iPhone refers to the phone, not your computer. To use it from Safari:
1. Create a private Git repository and upload the project files. Do not upload `.env`.
2. Create a Node web service on a hosting provider such as Render or Railway.
3. Set install/build command to `npm install` and start command to `npm start`.
4. Add `REVERSE_SEARCH_SESSION_TOKEN` as a private environment variable in the host dashboard.
5. Deploy and open the HTTPS address on your iPhone.
6. In Safari, use Share → Add to Home Screen if you want an app-like icon.

## Use
1. Choose Video clip and select a short MP4, or choose Screenshot and select one image.
2. Tap Prepare frames.
3. Choose one or more providers.
4. Read and tick the credit/privacy confirmation.
5. Tap Search selected frames. Each frame is a separate API request and may consume credits.
6. Open source links and compare the footage, duration, title and upload details manually.

## Costs, privacy and consent
The upstream service documents that submitted frame images are stored and made available to external search providers and that searches spend account credits. Check current terms, privacy policy, provider permissions and pricing before use. Do not submit intimate images of anyone without informed permission. Use only lawful content involving consenting adults. Do not use this tool to identify, locate, expose or track a person, or find/repost non-consensual intimate imagery. If suspected non-consensual material appears, do not redistribute it; report it to the hosting platform.

## Troubleshooting
- Search not configured: server environment variable missing.
- 401: token invalid or expired.
- 402: insufficient credits.
- 403: provider not permitted for your account.
- Safari cannot read video: use MP4 (H.264/AAC) or upload a screenshot.
- No matches: frame may be unclear, source may be unindexed/private, or provider may not return results.
- Timeout: do not automatically retry. Check account history first; credits may already have been spent.

## API docs
https://reverse-video-search.com/developers
https://reverse-video-search.com/openapi.json
