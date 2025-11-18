# Memory Hackers Quiz

A mobile-focused quiz application for testing knowledge of Dynamic Memory Allocation and Linked Lists.

## Project Overview

This is a simplified quiz application that:
- Uses hardcoded questions instead of fetching from a database
- Collects only the user's name and final score
- Stores results in a simplified database schema

## Database Schema

The application uses a simplified schema with only one table for storing quiz results:

```sql
CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Key Features

- **Mobile-First Design**: Optimized for mobile devices with no inspect element cheating
- **Simplified Flow**: Users enter their name, take the quiz, and see results
- **Hardcoded Questions**: All questions are embedded in the application code
- **Minimal Data Storage**: Only user name and final score are stored

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/479e2ad2-0120-4d53-ba4d-8d2947ad14db) and start prompting.

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
- Supabase (for database storage)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/479e2ad2-0120-4d53-ba4d-8d2947ad14db) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)