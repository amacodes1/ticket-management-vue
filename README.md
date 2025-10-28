# TicketApp

A modern, intuitive ticket management system built with Vue 3, TypeScript, and Tailwind CSS. TicketApp streamlines customer support workflows with a beautiful, responsive interface and powerful features for tracking, managing, and resolving support tickets.

## ✨ Features

- **🎫 Ticket Management**: Create, edit, update, and delete support tickets
- **📊 Dashboard**: Real-time overview of ticket statistics and status
- **🔍 Search & Filter**: Quickly find tickets by title or description
- **👤 User Authentication**: Secure login and registration system
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Instant UI updates without page refreshes
- **🎨 Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide Vue Next
- **Animations**: VueUse Motion
- **Notifications**: Vue3 Toastify
- **Routing**: Vue Router
- **State Management**: Pinia

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket-management-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run lint` | Lint code with ESLint |
| `npm run type-check` | Type check with vue-tsc |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Landing/        # Landing page components
│   └── Header-Section.vue
├── views/              # Page components
│   └── tickets/        # Ticket-related views
├── router/             # Vue Router configuration
├── lib/                # Utility functions and services
├── types/              # TypeScript type definitions
├── assets/             # Static assets (images, styles)
└── composables/        # Vue composables
```

## 🎯 Usage

### Authentication
- **Sign Up**: Create a new account with name, email, and password
- **Login**: Access your account with email and password
- **Logout**: Securely sign out from any page

### Ticket Management
- **Create Tickets**: Click "Create New Ticket" to add support requests
- **Edit Tickets**: Update ticket details, status, and priority
- **Search Tickets**: Use the search bar to find specific tickets
- **Status Tracking**: Monitor ticket progress (Open, In Progress, Closed)

### Dashboard
- View ticket statistics and counts
- Quick access to ticket management
- Real-time updates of ticket status

## 🎨 Customization

### Styling
Customize the appearance by modifying Tailwind CSS classes in components or updating the theme configuration.

## 🔧 Development Setup

### IDE Configuration
- **Recommended**: [VS Code](https://code.visualstudio.com/) with [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **Disable**: Vetur extension if installed

### Browser Extensions
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) for Chrome
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) for Firefox

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run e2e tests (install browsers first)
npx playwright install
npm run test:e2e
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Vue 3 and modern web technologies**
