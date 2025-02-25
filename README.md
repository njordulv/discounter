# Discount & Promo Code Aggregator

A web service that aggregates discount deals and promo codes from various sources, using web scraping and real-time data fetching.

## 🚀 Features

- **Product & Category Scraping**: Automatically fetches discounts from categories on eMAG.
- **Lazy Loading with Skeletons**: Improves performance and UX by displaying skeleton loaders while content is being loaded.
- **SSR with Next.js**: Fetches data on the server-side to improve SEO and initial load speed.
- **Dynamic Routing**: Supports navigation through different categories and product details.
- **Database**: Integrated with Supabase for user authentication.
- **Responsive UI**: Designed with Tailwind CSS for a mobile-friendly and modern interface.

## 🛠 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Cheerio (for scraping), Supabase (for database)
- **State Management**: Zustand
- **Hosting**: Vercel

## 📂 Project Structure

```
📦 project-root
├── 📂 components      # UI components (buttons, cards, loaders, etc.)
├── 📂 hooks           # Custom React hooks
├── 📂 pages           # Next.js pages
├── 📂 public          # Static assets
├── 📂 styles          # Global styles
├── 📂 utils           # Utility functions
├── 📂 config          # App configuration
└── next.config.js    # Next.js configuration
```

## 🔧 Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/njordulv/discounter.git
   cd discounter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (`.env`):
   ```sh
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

## 📌 Roadmap

- [ ] Implement a bookmarking system for saving deals
- [ ] Add user notifications for new discounts
- [ ] Improve data fetching performance
- [ ] Enhance accessibility (a11y improvements)

## 📜 License

Licensed under the [MIT License](LICENSE).

---

### 📬 Contact

For questions or suggestions, reach out to [njordulv@gmail.com](mailto:njordulv@gmail.com).
