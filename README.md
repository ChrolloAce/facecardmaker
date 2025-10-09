# FaceCard Editor

A professional web-based editor for creating beautiful before/after comparison cards. Built with Next.js, React, TypeScript, and Tailwind CSS.

![FaceCard Editor](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Live Preview** - See changes instantly as you edit
- **Before/After States** - Manage two separate card states for comparisons
- **Custom Traits** - Add, edit, and reorder traits with ratings (0.0-10.0)
- **Avatar Upload & Crop** - Upload images with built-in circular crop tool
- **Multiple View Modes**:
  - Single card (Before or After)
  - Side-by-side comparison
  - Interactive slider comparison
- **Export Options**:
  - Single card as PNG (2x DPR)
  - Single card as SVG
  - Before/After 2-up comparison PNG
- **Auto-Save** - All edits persist in localStorage
- **Pixel-Perfect Design** - Matches reference specifications exactly

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cardmaker

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Editing Cards

1. **Switch Between States**: Use the "Before" and "After" tabs in the editor panel
2. **Edit Basic Info**:
   - Headline prefix (default: "You're a")
   - Score (0.0 - 10.0, one decimal)
   - Percentile text
   - Brand text
   - Hint text
   - CTA button label

3. **Upload Avatar**:
   - Click "Upload Avatar"
   - Select an image
   - Crop to circular format
   - Save

4. **Manage Traits**:
   - Edit existing traits: icon/emoji, label, sublabel, rating
   - Add new traits with the "Add Trait" button
   - Remove traits with the trash icon
   - Drag to reorder (using grip handle)

5. **Duplicate**: Copy settings from one state to the other with "Duplicate" button
6. **Reset**: Restore default values with "Reset" button

### Viewing Comparisons

Switch between view modes using the buttons in the Preview panel:

- **Before** - View the "before" state card
- **After** - View the "after" state card
- **Side-by-Side** - See both cards at once
- **Slider** - Interactive slider to reveal before/after

### Exporting

Use the export buttons in the header:

- **Export PNG** - Download current card as PNG (2x resolution)
- **Export SVG** - Download current card as SVG
- **Export 2-Up Comparison** - Download before/after side-by-side PNG

## Project Structure

```
/app
  /page.tsx                 # Main application page
  /layout.tsx               # Root layout with fonts
  /globals.css              # Global styles and theme tokens
/components
  /CardPreview.tsx          # Card display component
  /TraitRow.tsx             # Individual trait row
  /EditorPanel.tsx          # Form controls for editing
  /AvatarPicker.tsx         # Avatar upload and crop
  /CompareSlider.tsx        # Interactive comparison slider
  /ExportControls.tsx       # Export buttons
  /ui/                      # shadcn/ui components
/lib
  /schema.ts                # Zod schemas and TypeScript types
  /store.ts                 # Zustand state management
  /format.ts                # Utility functions
  /export.ts                # Export functionality
  /seed-data.ts             # Default card states
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persist middleware
- **Validation**: Zod
- **Image Export**: html-to-image
- **Image Cropping**: react-easy-crop
- **Icons**: Lucide React

## Customization

### Adding New Presets

Edit `lib/seed-data.ts` to add new default states:

```typescript
export const fitnessPreset: CardState = {
  headlinePrefix: "You're a",
  score: 9.2,
  // ... more fields
  traits: [
    // ... your traits
  ]
}
```

### Changing Theme Colors

Edit CSS custom properties in `app/globals.css`:

```css
:root {
  --app-bg: #0B0C0F;
  --card-bg: #1B1C1F;
  --brand: #8B5CF6;
  /* ... more tokens */
}
```

### Adjusting Card Layout

Modify measurements in `components/CardPreview.tsx`:

- Font sizes (e.g., `text-[28px]`)
- Spacing (e.g., `py-[10px]`)
- Border radius (e.g., `rounded-[28px]`)
- Colors (e.g., `text-[#F7F8FA]`)

## Design Specifications

The card design follows these exact measurements:

- **Card Width**: 400px max
- **Border Radius**: 28px
- **Inner Padding**: 24px horizontal, 24px top, 18px bottom
- **Title Font**: Inter 700, 28px, -0.3px letter-spacing
- **Percentile Font**: Inter 500, 14px
- **Avatar Size**: 64px circle with 2px white/20% ring
- **Trait Label**: Inter 600, 16px
- **Trait Sublabel**: Inter 500, 13px
- **Trait Rating**: Inter 800, 22px
- **Colors**:
  - Background: #1B1C1F
  - Border: #2A2B31
  - Text Primary: #F7F8FA
  - Text Muted: #9DA3AE
  - Brand Purple: #8B5CF6

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Optimized image exports at 2x DPR
- Efficient re-renders with React memoization
- Local state persistence for fast loads

## Troubleshooting

### Export not working
- Ensure you're using a modern browser
- Check console for CORS errors with images
- Try disabling browser extensions

### Avatar upload fails
- Check file size (recommended < 5MB)
- Use common formats: JPG, PNG, WebP
- Ensure browser supports FileReader API

### State not persisting
- Check localStorage is enabled
- Clear cache and reload if issues persist
- Check browser storage quota

## License

MIT License - feel free to use for personal or commercial projects.

## Contributing

Contributions welcome! Please follow the coding standards:

- Files < 500 lines
- One responsibility per component
- TypeScript strict mode
- Tailwind for all styling

## Acknowledgments

Built following best practices for:
- Object-oriented design
- Single responsibility principle
- Modular architecture
- Clean, maintainable code
