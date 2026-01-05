# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Contact form (Vercel email)

This repo includes a Vercel Serverless Function at `/api/contact` that sends the Contact section form message to `anandkishore060@gmail.com`.

### Setup (Resend)

- Create an account at https://resend.com and generate an API key.
- In Vercel Project Settings → Environment Variables, add:
  - `RESEND_API_KEY` (required)
  - `RESEND_FROM_EMAIL` (optional; defaults to `onboarding@resend.dev`. For production, use a verified sender/domain in Resend.)
  - `CONTACT_TO_EMAIL` (optional; defaults to `anandkishore060@gmail.com`)

See `.env.example` for the full list.

### Local development

Vite does not run Vercel Serverless Functions by default, so this repo includes a development-only Vite middleware that handles `POST /api/contact` during `npm run dev`.

- Create a local file `.env.local` (do not commit it) with:
  - `RESEND_API_KEY=...`
  - optionally `RESEND_FROM_EMAIL=contact@yourdomain.com`
  - optionally `CONTACT_TO_EMAIL=anandkishore060@gmail.com`

## Book a Call (Google Calendar API + Google Meet)

This repo includes a Vercel Serverless Function at `/api/book-call` that creates a Google Calendar event and generates a Google Meet link.

### Google setup

1. In Google Cloud Console:

- Create/select a project
- Enable **Google Calendar API**
- Create a **Service Account** and generate a JSON key

2. Share your Google Calendar with the service account email (Calendar Settings → Share with specific people) and give it permission to **Make changes to events**.
3. Copy your calendar id into `GOOGLE_CALENDAR_ID`:

- In Google Calendar Settings → your calendar → **Integrate calendar** → **Calendar ID**

### Vercel environment variables

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` (from the service account)
- `GOOGLE_PRIVATE_KEY` (from the JSON key; keep the `-----BEGIN PRIVATE KEY-----` block; use `\n` for newlines in Vercel)
- `GOOGLE_CALENDAR_ID` (your calendar id)
- Optional: `GOOGLE_CALENDAR_TIMEZONE` (defaults to `Asia/Kolkata`)

If you are using Google Workspace + domain-wide delegation, you can also set:

- `GOOGLE_IMPERSONATE_USER` (email of the calendar owner to impersonate)

### Notes about attendee invites

- If you use a **service account without Google Workspace Domain‑Wide Delegation**, Google blocks adding `attendees`.
- In that case, this project will still create the calendar event + Meet link on your calendar, but it will **not email an invite** to the visitor.
- To email invites automatically, you must either:
  - Use **Google Workspace Domain‑Wide Delegation** (and set `GOOGLE_IMPERSONATE_USER`), or
  - Implement an **OAuth** flow where the calendar owner grants consent.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
