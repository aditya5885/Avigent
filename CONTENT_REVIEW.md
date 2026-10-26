# AVIGENT Website — Content Review Checklist

Everything on the site either comes from the **current live site (avigent.in)**
or is clearly flagged below for AVIGENT to confirm before launch.
Search the code for `REVIEW:` to find each item.

## ✅ Verified (taken from avigent.in)

- Company name, "Powering Progress since 2012", founded 2012 by **Avinash Mohandas**
- Welcome / about text
- Service names and descriptions: Electrical Maintenance, Safety Audits,
  Engineering Consultancy, Renewable Energy EPC, Engineering Services, Consulting Agency
- Phone **+91 96200 94100** · Email **info@avigent.in**
- Address: 2nd Floor, KC Arcade, Near TV Centre, CSEZ P.O., Kakkanad, Kochi, Kerala 682037

## ⚠️ Please confirm

| Item | Where | Notes |
| --- | --- | --- |
| **Logo** | `src/components/ui/Logo.tsx`, `src/app/icon.svg` | Official logo couldn't be downloaded; a typographic wordmark is used. Replace with the official file. |
| **Scope-of-work lists** | `scope` in `src/lib/site.ts` | Drafted from the service descriptions and public business listings (e.g. fire/security alarms, hybrid solar). Remove anything AVIGENT doesn't offer. |
| **Outcomes text** | `outcomes` in `src/lib/site.ts` | Drafted benefit statements. |
| **Why Choose Us / Industries** | `src/lib/site.ts` | Themes and sector list came from the project brief. |
| **Project gallery** | `projects` in `src/lib/site.ts` | **Describes types of work, uses AI-generated images.** No client names, capacities or locations are claimed. Swap in real project photos and details when available. |
| **All photography** | `public/images/` | AI-generated imagery. Replace with real AVIGENT site/team photos where possible. `residential-solar.jpg` shows a generic inverter brand mark. |
| **Business hours** | `company.hours` in `src/lib/site.ts` | Not published, so they're hidden. Set the value to display them. |
| **Map pin** | `mapsQuery` in `src/lib/site.ts` | Search is based on the address. Check the pin lands on KC Arcade. |
| **Suite number** | — | A third-party listing gives "Suite No. 524"; it's left out because the live site doesn't show it. |
| **Background videos** | `public/videos/` | Stock clips from Mixkit (free licence): `hero-solar*.mp4` (aerial solar farm at sunset) and `footer-panels.mp4` (top-down solar panels). Re-encoded and muted; posters in `public/images/*-video-poster.jpg`. Swap in real AVIGENT drone footage if available (keep each file under ~3 MB, 15–20 s loop). |
| **3D icons** | `public/icons3d/` | From [3dicons.co](https://3dicons.co) (CC0 — no attribution required), tinted to the brand palette by `scripts/tint-icons.mjs`. |

## 🔌 To activate the contact form

Copy `.env.example` to `.env.local` (or set the variables in your host) and fill in your Resend credentials.
Until you do, the form says plainly that nothing was sent and offers WhatsApp, email and call options with the visitor's details already filled in.
