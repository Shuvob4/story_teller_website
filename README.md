# Turjjo Portfolio

A cinematic portfolio website for **Tauseef Alamgir Turjjo** — photographer, videographer, and visual storyteller. Built with Astro 4, TinaCMS, Tailwind CSS, and GSAP.

## Tech Stack

- **Astro 4** — Static site generation, zero JS by default
- **TinaCMS** — Git-backed headless CMS with visual editing
- **Tailwind CSS 3** — Utility-first styling with custom design tokens
- **GSAP + ScrollTrigger** — Cinematic scroll animations
- **Formspree** — Contact form submissions (no backend needed)
- **Vercel** — Hosting with automatic deploys from GitHub

---

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Install & Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/story_teller_website.git
cd story_teller_website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server (without CMS)
npm run dev

# Start development server (with TinaCMS admin)
npm run cms
```

The site will be available at `http://localhost:4321`. The TinaCMS admin panel will be at `http://localhost:4321/admin`.

---

## TinaCMS Setup

TinaCMS provides a browser-based editor so Tauseef can add and edit work items without touching code.

### 1. Create a TinaCloud Account

1. Go to [app.tina.io](https://app.tina.io) and sign up
2. Create a new project and connect it to your GitHub repository
3. TinaCloud will provide you with a **Client ID** and a **Token**

### 2. Configure Environment Variables

Add these to your `.env` file:

```env
TINA_PUBLIC_CLIENT_ID=your-client-id-here
TINA_TOKEN=your-read-only-token-here
```

### 3. Using the CMS

- **Local editing**: Run `npm run cms` and visit `/admin`
- **Production editing**: Visit `https://graincinematic.com/admin` (requires TinaCloud auth)
- Changes made in the CMS are committed directly to GitHub, which triggers a new Vercel build

---

## Formspree Setup (Contact Form)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID (e.g., `xabcdefg`)
3. Add it to your `.env` file:

```env
PUBLIC_FORMSPREE_ID=your-form-id-here
```

4. The contact form will POST submissions to Formspree, which forwards them to `tauseefturjjo@gmail.com`

---

## Vercel Deployment

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" and import the `story_teller_website` repository
3. Vercel auto-detects Astro — no build settings needed

### 2. Set Environment Variables

In Vercel dashboard → Project Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `TINA_PUBLIC_CLIENT_ID` | Your TinaCloud client ID |
| `TINA_TOKEN` | Your TinaCloud read-only token |
| `PUBLIC_FORMSPREE_ID` | Your Formspree form ID |

### 3. Deploy

Push to `main` branch — Vercel auto-builds and deploys. Every subsequent push (including TinaCMS commits) triggers a new deploy.

---

## Custom Domain Configuration

### Option A: Namecheap

1. In Vercel dashboard → Project Settings → Domains → Add `graincinematic.com`
2. In Namecheap DNS settings:
   - Add a **CNAME** record: `www` → `cname.vercel-dns.com`
   - Add an **A** record: `@` → `76.76.21.21`
3. Wait for DNS propagation (up to 48 hours, usually minutes)
4. Vercel auto-provisions a free SSL certificate

### Option B: Cloudflare

1. In Vercel dashboard → Add domain `graincinematic.com`
2. In Cloudflare DNS:
   - Add **CNAME** `www` → `cname.vercel-dns.com` (DNS only, orange cloud OFF)
   - Add **CNAME** `@` → `cname.vercel-dns.com` (DNS only)
3. Set SSL mode to "Full (strict)" in Cloudflare

---

## Adding Work Items via CMS

Step-by-step guide for the non-technical user:

### 1. Open the Admin Panel

- Go to `https://graincinematic.com/admin` in your browser
- Log in with your TinaCloud credentials

### 2. Navigate to Work Items

- In the left sidebar, click **"Work Items"**
- You'll see a list of existing work entries

### 3. Create a New Work Item

1. Click the **"Create New"** button
2. Fill in the fields:
   - **Title** — Name of the project (e.g., "Street Life in Dhaka")
   - **Category** — Select from: Street Photography, Videography, Urban/Street Videography, Video Editing
   - **Thumbnail** — Click "Upload" and select an image (recommended: 800×800px, JPG/WebP)
   - **Embed URL** (optional) — Paste a YouTube or Vimeo link for video work
   - **Description** (optional) — Brief project description
   - **Featured** — Toggle ON to show on the homepage
   - **Sort Order** (optional) — Lower numbers appear first
3. Click **"Save"**

### 4. What Happens Next

- TinaCMS commits the new file to GitHub automatically
- Vercel detects the commit and rebuilds the site (~2 minutes)
- Your new work item appears on the live site

### 5. Editing or Removing Work

- Click any work item in the list to edit it
- Make changes and click "Save"
- To remove: delete the item from the list

---

## Project Structure

```
src/
├── components/         # Astro components (layout, home, work, etc.)
├── content/            # CMS-managed content (work items, page data)
├── pages/              # Route pages (index, work, about, services, contact)
├── scripts/            # Client-side JS (animations, cursor, filters, modal)
└── styles/             # Global CSS + animation states
public/                 # Static assets (logo, favicon, robots.txt)
tina/                   # TinaCMS configuration and schema
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Astro dev server |
| `npm run cms` | Start dev server with TinaCMS admin |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run cms:build` | Build with TinaCMS (for CI) |

---

## License

All content, photography, and videography © Tauseef Alamgir Turjjo. All rights reserved.
