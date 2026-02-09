# Valentine's Day Website 💕

A beautiful, romantic Valentine's Day website built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Features ✨

- **Black Elegant Theme**: Beautiful dark theme with pink accents
- **Animated Entry**: Large couple photo animates onto the page with smooth fade-in effect
- **Interactive Question**: "Will You Be My Valentine?" with Yes/No buttons
- **Response Messages**: 
  - "Yes" response: Celebrates with love messages and animated hearts
  - "No" response: Shows a sweet "please reconsider" message with option to try again
- **Elegant Typography**: Uses Times New Roman-like serif fonts (Georgia, Garamond, Palatino)
- **Animated Hearts**: Subtle pulsing heart emojis in the background
- **Smooth Animations**: Fade-in effects and hover interactions
- **Responsive Design**: Works beautifully on desktop and mobile devices

## Getting Started 🚀

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davidnso-codex/a-small-project.git
cd a-small-project
```

2. Install dependencies:
```bash
npm install
```

3. Replace the placeholder image:
   - Add your couple photo to the `public` folder as `couple-photo.jpg` or `couple-photo.png`
   - Update the image path in `app/page.tsx` (line 42) to match your image filename

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
a-small-project/
├── app/
│   ├── layout.tsx      # Root layout with black theme
│   ├── page.tsx        # Main Valentine's page with interactive components
│   └── globals.css     # Global styles and animations
├── public/
│   └── couple-photo.svg # Placeholder image (replace with your photo)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Customization 🎨

### Change the Photo

Replace the placeholder SVG in the `public` folder with your actual couple photo:
- Recommended size: 800x800px or larger
- Supported formats: JPG, PNG, SVG
- Update the image path in `app/page.tsx`

### Modify Colors

Edit the colors in `app/page.tsx` to customize the pink theme:
- `border-pink-500`: Photo border color
- `bg-pink-600`: Button colors
- `text-pink-100`, `text-pink-300`: Text colors

### Edit Messages

Update the text in `app/page.tsx`:
- Line 51-52: Main question text
- Lines 70-78: "Yes" response message
- Lines 83-88: "No" response message

## Building for Production 🏗️

To create a production build:

```bash
npm run build
npm start
```

## Deployment 🌐

This Next.js app can be deployed to:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- Any Node.js hosting platform

## Technologies Used 💻

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **CSS Animations**: Custom keyframe animations

## License 📄

MIT License - Feel free to use this for your own Valentine's Day surprise! ❤️

## Credits 👏

Created with love for a special Valentine's Day surprise 💕
