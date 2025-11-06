# DrivePass - Modern Driver's License Services Website

A modern, responsive website for driver's license services built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## 🚀 Features

- **Responsive Navigation Bar** - Mobile-friendly navigation with smooth hamburger menu
- **Hero Banner** - Eye-catching landing section with animated background elements
- **Services Section** - Comprehensive overview of all license services offered
- **Features Section** - Highlighting key benefits and advantages
- **Customer Reviews** - Interactive testimonials carousel with customer feedback
- **Contact Form** - Easy-to-use application form with validation
- **Modern Footer** - Complete footer with links, contact info, and social media
- **Dark Mode Support** - Automatic dark/light theme based on system preferences
- **Smooth Animations** - Custom CSS animations for enhanced user experience
- **SEO Optimized** - Proper metadata and semantic HTML

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans & Geist Mono
- **Icons:** SVG inline icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cruds
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
cruds/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx      # Responsive navigation bar
│   │   ├── Hero.tsx           # Hero banner section
│   │   ├── Features.tsx       # Services and features section
│   │   ├── Reviews.tsx        # Customer testimonials
│   │   ├── Contact.tsx        # Contact/Application form
│   │   └── Footer.tsx         # Footer component
│   ├── globals.css            # Global styles and animations
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Home page
├── public/                     # Static assets
└── package.json
```

## 🎨 Key Components

### Navigation
- Fixed header with transparent background blur
- Mobile-responsive hamburger menu
- Smooth scroll navigation
- Gradient CTA button

### Hero Section
- Animated blob backgrounds
- Compelling headline and CTA
- Statistics showcase
- Scroll indicator

### Features
- Service cards with hover effects
- Feature highlights with icons
- "How It Works" step-by-step guide

### Reviews
- Interactive carousel
- Customer testimonials grid
- 5-star ratings display
- Navigation controls

### Contact Form
- Validated input fields
- Service selection dropdown
- Contact information display
- Gradient submit button

## 🎯 Customization

### Colors
The site uses a blue-to-indigo gradient theme. To customize:
- Update gradient classes in components (e.g., `from-blue-600 to-indigo-600`)
- Modify Tailwind color palette in `globals.css`

### Content
- Update company name "DrivePass" in `Navigation.tsx` and `Footer.tsx`
- Modify services in `Features.tsx`
- Update testimonials in `Reviews.tsx`
- Change contact information in `Contact.tsx` and `Footer.tsx`

### Animations
Custom animations are defined in `globals.css`:
- `animate-blob` - Floating blob effect
- `animate-fade-in` - Fade in with delay
- `animate-slide-up` - Slide up animation

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm start
```

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

1. **SEO Optimized** - Meta tags, semantic HTML, and proper heading hierarchy
2. **Performance** - Optimized images, lazy loading, and code splitting
3. **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
4. **Cross-browser** - Compatible with all modern browsers
5. **Type Safe** - Full TypeScript support with strict mode

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Development

Built with ❤️ using Next.js and Tailwind CSS
