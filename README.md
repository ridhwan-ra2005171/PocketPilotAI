# 🚀 PocketPilot AI

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ridhwan-ra2005171/PocketPilotAI)

**PocketPilot AI** is an AI-powered expense tracking application built with Next.js, designed to help you monitor spending, categorize expenses automatically, and gain intelligent financial insights to improve your habits.

---

## ✨ Features

-  **AI-Powered Insights** – Get smart tips, warnings, and summaries based on your financial behavior.
-  **Automatic Categorization** – Expenses are intelligently sorted by category using AI.
-  **Interactive Dashboard** – View a comprehensive overview of your expenses and insights.
-  **Expense History** – Add, browse, and manage your transactions effortlessly.
-  **Visual Analytics** – Identify trends through dynamic bar charts.
-  **Statistical Summaries** – See average daily spending, and highest/lowest expenses at a glance.
-  **Secure Authentication** – User sign-in, sign-up, and profile management powered by Clerk.
-  **Light & Dark Mode** – Modern, responsive UI with theme toggling.

---

## 🛠 Tech Stack

| Category        | Tech                                 |
|----------------|--------------------------------------|
| **Framework**   | [Next.js](https://nextjs.org/) (App Router) |
| **Language**    | [TypeScript](https://www.typescriptlang.org/) |
| **Database**    | [PostgreSQL](https://www.postgresql.org/) |
| **ORM**         | [Prisma](https://www.prisma.io/)    |
| **Authentication** | [Clerk](https://clerk.com/)      |
| **Styling**     | [Tailwind CSS](https://tailwindcss.com/) |
| **AI Provider** | [OpenAI](https://openai.com/) via [OpenRouter](https://openrouter.ai/) |
| **Charting**    | [Chart.js](https://www.chartjs.org/) using `react-chartjs-2` |
| **Deployment**  | [Vercel](https://vercel.com/)       |

---

## 📂 Project Structure
/
├── components/ # Reusable UI components
├── contexts/ # Theme and other React contexts
├── lib/ # Utility functions (AI, DB, etc.)
├── prisma/ # Prisma schema & migrations
├── src/app/
│ ├── (pages)/ # App Router pages
│ └── actions/ # Server-side logic (Server Actions)
└── types/ # Global TypeScript types


---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
git clone https://github.com/ridhwan-ra2005171/PocketPilotAI.git
cd PocketPilotAI

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
Create a .env file in the project root and add:

# PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenRouter API Key
OPENROUTER_API_KEY=your_openrouter_api_key

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

### 4. Set Up the Database
npx prisma migrate dev

### 5. Start the Development Server
npm run dev


Visit http://localhost:3000 in your browser to see the app in action.


🙌 Contributing

Contributions are welcome!
Feel free to fork the repo, create a feature branch, and submit a pull request.

- 📘 [Next.js Documentation](https://nextjs.org/docs)
- 📗 [Prisma Docs](https://www.prisma.io/docs)
- 🔐 [Clerk Docs](https://clerk.dev/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)
- 🤖 [OpenRouter Docs](https://openrouter.ai/docs)
