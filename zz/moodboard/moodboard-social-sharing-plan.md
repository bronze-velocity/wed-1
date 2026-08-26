# Moodboard Social Sharing Plan

## Recommendation

Treat sharing as two related but different jobs:

1. **Private collaboration:** send the complete moodboard to a partner, planner, or trusted friend. This remains the password-protected `/moodboard/[slug]` page.
2. **Public social sharing:** publish a deliberately limited teaser at `/moodboard/[slug]/preview`. It can be posted publicly without exposing the couple's freeform answers, private brief, email address, or detailed recommendations.

The social preview should be opt-in. Do not make the existing private URL public just to improve its link preview. The current brief contains relationship and wedding details that should not accidentally become public because someone chose a social destination from a phone share sheet.

## Current State And Gaps

- `components/moodboard/results/MoodboardResults.js` creates a protected link and currently offers a raw URL plus `Copy` near the bottom of the results.
- The browser share API is not used. There is no native share sheet, private invite text, social-preview action, or visible share control near the result headline.
- `app/moodboard/[slug]/page.js` already generates server-side metadata before the password gate, which is the right shape for social crawlers.
- The metadata currently points every brief at the generic `/images/moodboard/og.jpg`.
- `meta.coupleName` is currently populated from `desiredSlug`; the requested URL slug and the name shown to people should be separate values.
- `resolveSlug()` does not check whether a slug already exists. Saving the same desired name can overwrite an existing brief, as the current UI copy acknowledges.
- The share URL does not include the password, which is correct for security but means the UI needs a good way to share the URL and password together privately.
- The current Redis brief store has no expiry in `saveBrief()`. Social sharing should not become a reason to retain personal answers indefinitely; apply the retention decision from the moodboard persistence plan before treating this as production-ready.

## Share Experience

### Placement

Add a prominent `Share this moodboard` button directly below the three-word result, where the couple experiences the emotional payoff. Keep a secondary share affordance at the end of the results for people who read the whole page first.

The button should not appear on the password gate. The gate can explain that the person needs the couple's password, but it should not imply that an unauthorised viewer can create or redistribute the brief.

### Share sheet

Use one responsive share sheet rather than several unrelated buttons:

```text
Share your moodboard
                         [close]

[small preview card: couple name + three words]

Share privately
Send the full brief to someone you trust.
[Share privately]  [Copy private invite]

Share a public preview
Only the cover, three words, and broad directions are shown.
[Create social preview]

[Copy link]
Your full brief stays password protected.
```

Behavior:

- On supported mobile browsers, `Share privately` uses `navigator.share()` with a title, a short message, and the private URL.
- The native share call must not silently include the password. The user may choose a public destination from the OS share sheet, so the password should remain a separate, deliberate action.
- `Copy private invite` copies a ready-to-send message containing the private URL and password in clearly labelled lines. Show a warning immediately above it: `Only send this to people you trust.`
- `Copy link` copies only the URL and is the fallback for desktop browsers and browsers without a clipboard permission.
- If `navigator.share` is unavailable, the primary action becomes `Copy private invite`; do not show a disabled share button.
- A cancelled native share is a normal outcome, not an error state.
- Use a bottom sheet on phones and a modal/dialog on desktop. The sheet needs a real close button, Escape handling, focus management, and a minimum 44px touch target for every action.
- After each copy, show a short inline confirmation such as `Private invite copied` or `Link copied`. Do not rely on a transient toast alone.
- Use text labels with an optional platform/share icon. Do not make social logos the primary navigation; platform availability varies and Instagram does not provide a normal clickable link-preview flow from an in-feed post.

### After creating a link

The existing `Get my link` action should transition into the share sheet state instead of leaving the user with a long URL in a small box.

Show:

- The human-readable private URL in a compact, selectable field.
- `Share privately`.
- `Copy private invite`.
- `Copy link`.
- `Create social preview`.
- `Open full brief` in a new tab.

For an existing/editing brief, keep the same slug and password. Editing results should update the social preview image version without changing either URL.

## URL And Naming Strategy

### Private URL

Keep the main URL human-readable:

```text
https://wepho.com/moodboard/jack-and-simone
```

Rules:

- Ask for `coupleName` as display text and offer an optional `desiredSlug` or derive the slug from the display name.
- Never place the password, email address, freeform answers, or encoded brief data in the URL.
- Keep the slug lowercase, hyphenated, and capped at the existing length limit.
- Check for an existing slug before saving. If it is taken, suggest a short random suffix or generate one automatically; never overwrite an unrelated brief.
- Store the stable slug on the brief and preserve it across edits.
- If no display name is provided, use `Your wedding app moodboard` in the UI and OG metadata rather than inventing a name from an opaque slug.

### Public social preview URL

Use a clear sub-route:

```text
https://wepho.com/moodboard/jack-and-simone/preview
```

The route is enabled only after the owner explicitly chooses `Create social preview`. Store a small flag and timestamp in `brief.meta`, for example:

```js
meta: {
  coupleName: 'Jack & Simone',
  role: 'couple',
  socialPreviewEnabled: true,
  socialPreviewCreatedAt: '2026-08-26T12:00:00.000Z',
}
```

This route is intentionally not a security boundary. It must contain only information the owner has agreed to publish. Add `Turn off public preview` in the share sheet so the owner can stop the live page from rendering. Explain that already-cached previews on social platforms cannot be reliably removed immediately.

If later metrics show that public previews are being guessed or scraped, add a separate high-entropy public share token. Do not start with a tokenized URL unless there is a concrete abuse signal; it makes the link less memorable and less attractive to share.

## Public Preview Content

The preview should feel like a real artifact, not a password error page:

- Wepho wordmark and a small `Wedding app moodboard` eyebrow.
- Couple display name, when supplied.
- The three-word reception summary.
- Up to three matched app titles or broad directions.
- One sentence: `A custom reception experience shaped around their people, stories, and energy.`
- A clear `Open the private brief` action, which leads to the password-protected URL.
- A secondary `Build your own moodboard` action to `/moodboard`.
- A small privacy line: `The full brief is private.`

Do not render on the public route:

- Raw answers from any moodboard step.
- Story answers, inside jokes, quotes, names of guests, or venue details.
- `whyItFitsYou` explanations, which can repeat private details even when they look like marketing copy.
- The email gate, edit controls, password, or server-side identifiers.

The public preview should be server-rendered so it works when opened from a social app with JavaScript delayed or disabled.

## Open Graph And Social Metadata

### Metadata fields

For both the private page and the public preview, generate absolute metadata using `SITE_URL` rather than relative image URLs:

- `og:title`
- `og:description`
- `og:url`
- `og:type=website`
- `og:site_name=Wepho`
- `og:image`
- `og:image:width=1200`
- `og:image:height=630`
- `og:image:alt`
- `twitter:card=summary_large_image`
- Matching `twitter:title`, `twitter:description`, and `twitter:image`

Suggested public-preview copy:

```text
Title: Jack & Simone's wedding app moodboard | Wepho
Description: Warm. Chaotic. Personal. A custom reception experience shaped around Jack & Simone's people, stories, and energy.
Image alt: Jack & Simone's Wepho wedding app moodboard
```

Use the generic fallback copy when there is no couple name. Keep `/moodboard/[slug]` and `/moodboard/[slug]/preview` out of search with `noindex, nofollow`; `noindex` does not prevent a social crawler from reading OG metadata, while it reduces the chance that personal previews become search results.

### Dynamic OG image

Add a route-level `opengraph-image.js` for the slug route, or a shared image route used by both pages, using Next's `ImageResponse`.

The image should be 1200 x 630 and composed from:

- The existing generic moodboard background image or a new editorial crop from the moodboard photography.
- A dark or brand-tinted scrim to preserve text contrast.
- Wepho wordmark or wordmark text.
- `Jack & Simone` as the largest personalized line.
- The three-word summary as the expressive secondary line.
- A restrained footer such as `Custom wedding apps by Wepho`.

Use the generic background for every couple; personalization comes from the text overlay, not from exposing a private photo or attempting to create a bespoke image asset for every brief.

Image rules:

- Keep all critical text inside a central safe area because WhatsApp, LinkedIn, Slack, and X may crop previews differently.
- Use large type and high contrast; the image must be legible as a small card.
- Keep names and summaries length-limited before rendering. Truncate by words, not mid-character, and provide a generic fallback.
- Do not include raw answers or model-generated explanations.
- Make the image endpoint accessible without the password cookie. The page can remain gated; the crawler cannot complete an interactive unlock.
- Include a version query in the metadata image URL, based on `updatedAt`, so edits can produce a new image URL. Social platforms still cache aggressively, so document the relevant debugger/rescrape tools for support.
- Return a generic fallback image when a brief is missing or the preview is disabled; do not reveal whether a guessed slug exists through a detailed error response.

### Platform behavior to account for

- **WhatsApp, Facebook, LinkedIn, Slack, Discord:** generally use OG title, description, and image. They fetch the URL as an unauthenticated crawler and do not enter the password.
- **X:** uses Twitter card metadata, with OG as fallback in some contexts. `summary_large_image` is the intended card.
- **Pinterest:** may use OG data, but its display and image-caching behavior is less predictable.
- **Instagram:** normal feed captions do not turn an arbitrary URL into a reliable clickable preview. The native share sheet can still help users copy the URL, but do not promise an Instagram card.
- **All platforms:** previews are cached. An edited name or summary may not appear immediately; version image URLs, preserve stable page URLs, and provide a rescrape checklist for support.

## API And Data Changes

1. Split the current `desiredSlug` input into `coupleName` and optional `desiredSlug`.
2. Update `/api/moodboard/share` to persist the display name independently and reject or disambiguate slug collisions.
3. Add an authenticated owner action to enable or disable the public preview. Reuse the existing brief cookie/password authorization for edits and preview settings.
4. Return both URLs after link creation or preview activation:

```json
{
  "privateUrl": "https://wepho.com/moodboard/jack-and-simone",
  "socialUrl": "https://wepho.com/moodboard/jack-and-simone/preview"
}
```

5. Keep `socialPreviewEnabled` false for existing briefs until the owner opts in.
6. Apply a Redis TTL and deletion path consistent with the moodboard retention policy. Disabling a preview should stop future page/image responses, but cannot recall cached third-party cards.

## Analytics And Privacy

Track product-level events without sending answers, passwords, or email addresses:

- `moodboard_share_opened` with `surface` and whether the brief is new or existing.
- `moodboard_private_share` with `method: native | copy_invite | copy_url`.
- `moodboard_social_preview_created`.
- `moodboard_social_preview_shared` when the user copies or invokes native sharing for the public URL.
- `moodboard_social_preview_viewed` with referrer/platform when available, not the visitor's personal identity.
- `moodboard_social_preview_disabled`.

Before enabling public preview, state the disclosure plainly: `This cover can be viewed by anyone with the link. Your full answers stay private.` Do not ask for a second consent checkbox if the action is explicit and the preview contents are genuinely limited, but record the enable action and document it in the privacy policy.

## Build Order

### Phase 1: Safe private sharing

1. Separate couple display name from URL slug and fix slug collision handling.
2. Move the share CTA below the three-word result and retain a bottom-of-page entry point.
3. Build the responsive share sheet with native share, copy URL, and copy private invite fallbacks.
4. Make the private invite copy easy to scan and never put the password in the URL.

### Phase 2: Better private-link previews

1. Add dynamic personalized OG images using the existing generic background.
2. Replace the generic page metadata with couple-specific title, summary, absolute URL, and image URL.
3. Add versioned image URLs and document platform rescraping.
4. Keep the private page password protected and `noindex`.

### Phase 3: Public social preview

1. Add the opt-in flag and owner-only enable/disable action.
2. Add the server-rendered `/moodboard/[slug]/preview` route with only approved teaser fields.
3. Add public-preview metadata and the same dynamic OG image treatment.
4. Add the `Create social preview` and `Turn off public preview` states to the share sheet.
5. Add privacy copy and analytics events.

### Later, only if useful

- Downloadable 1200 x 630 share card.
- A square 1080 x 1080 social image for channels that crop landscape cards poorly.
- A high-entropy public share token if public preview URLs are being guessed or abused.
- UTM parameters on the `Build your own moodboard` CTA, not on the private or personal preview URL.

## Acceptance Criteria

- A couple can share the full brief privately from a phone in two actions after opening the share sheet.
- A desktop user can copy a usable private invite without requiring `navigator.share`.
- The private URL never contains a password or personal answer data.
- A social crawler can retrieve the title, description, and 1200 x 630 personalized image without a password cookie.
- The personalized image contains only the permitted name and three-word summary over the generic background.
- A public preview never exposes raw answers, detailed explanations, email addresses, edit controls, or passwords.
- A couple must explicitly create the public preview and can disable it later.
- Updating the moodboard updates metadata and generates a versioned OG image URL, subject to third-party cache delays.
- Missing, malformed, expired, or disabled briefs fail closed without revealing private data.
- Share actions are keyboard accessible, screen-reader labelled, touch-friendly, and usable with clipboard/share permissions denied.
