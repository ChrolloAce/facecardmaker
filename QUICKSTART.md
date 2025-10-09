# FaceCard Editor - Quick Start Guide

Get up and running in 2 minutes!

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage Flow

### 1. Edit the "After" State (Default View)
- Adjust the score slider to change the main rating
- Click into any text field to customize
- Upload an avatar by clicking "Upload Avatar"

### 2. Create a "Before" State
- Click the **"Before"** tab
- Lower some ratings to show improvement potential
- Change sublabels to reflect "before" condition
- Optionally upload a different avatar

### 3. Compare
Click the view mode buttons:
- **Before** - Show only the before card
- **After** - Show only the after card  
- **Side-by-Side** - View both cards simultaneously
- **Slider** - Interactive slider to reveal the transformation

### 4. Export
Click export buttons in the header:
- **Export PNG** - Download current card
- **Export SVG** - Vector format (scalable)
- **Export 2-Up** - Before/After comparison image

## Pro Tips

✨ **Quick Duplicate**: Use the "Duplicate" button to copy one state to the other, then make small adjustments

🎨 **Emoji Picker**: Paste any emoji into the icon field (🔥 ⭐ 💪 👁️ 💎)

💾 **Auto-Save**: All changes save automatically to your browser

🔄 **Reset**: Hit "Reset" if you want to start fresh with defaults

⌨️ **Keyboard**: Tab through fields, Enter to apply changes

## Example Use Cases

### Fitness Transformation
```
Before: Lower ratings, "Needs Work" sublabels
After: Higher ratings, "Excellent Definition" sublabels
Traits: Body Fat %, Muscle Mass, Endurance, Strength
```

### Skincare Results
```
Before: Moderate scores, "Uneven Texture"
After: High scores, "Smooth & Clear"
Traits: Skin Tone, Texture, Hydration, Fine Lines
```

### Professional Development
```
Before: Mid-range scores, "Developing"
After: High scores, "Expert Level"
Traits: Technical Skills, Leadership, Communication
```

## Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --brand: #8B5CF6;        /* Purple accent */
  --card-bg: #1B1C1F;      /* Card background */
  --text-primary: #F7F8FA; /* Main text */
}
```

### Adjust Layout
Edit `components/CardPreview.tsx`:
- Font sizes: `text-[28px]`
- Spacing: `py-[10px]`  
- Borders: `rounded-[28px]`

### Add Presets
Edit `lib/seed-data.ts`:
```typescript
export const myPreset: CardState = {
  score: 9.5,
  traits: [/* ... */]
}
```

## Troubleshooting

**Avatar won't upload?**
- Try a smaller file (< 5MB)
- Use JPG or PNG format

**Export not working?**
- Check browser console for errors
- Disable ad blockers
- Try a different browser

**Changes not saving?**
- Ensure localStorage is enabled
- Check available storage space

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate fields |
| Enter | Apply change |
| Esc | Close dialogs |
| Space | Toggle (in slider mode) |

## File Structure

```
/components    → UI components
/lib          → Logic, state, utilities
/app          → Pages and global styles
```

## Next Steps

1. ✅ Run `npm run dev` and open the app
2. ✅ Edit the default card
3. ✅ Try all 4 view modes
4. ✅ Export your first card
5. ✅ Read the full [README.md](README.md)

---

**Need help?** Check [TESTING.md](TESTING.md) for detailed feature documentation.

**Ready to deploy?** Run `npm run build` then `npm start`

