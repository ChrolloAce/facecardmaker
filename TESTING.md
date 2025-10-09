# Testing & Acceptance Criteria

This document outlines the acceptance criteria and testing procedures for the FaceCard Editor.

## Acceptance Criteria

### ✅ Core Functionality

- [x] **Multi-State Editing**: User can edit all text, ratings (0.0–10.0), emojis, and avatar for both **Before** and **After** states
- [x] **Visual Accuracy**: The preview matches the specified typography, spacing, and colors from the reference design
- [x] **Comparison Modes**: Side-by-side and slider compare both work on mobile and desktop
- [x] **Export Quality**: Single-card and 2-up PNG export produce crisp, 2x DPR images
- [x] **Persistence**: All edits persist across page reloads via localStorage

### Detailed Feature Checklist

#### Editor Features
- [x] Before/After tab switching
- [x] Score editing with slider and numeric input (0.0-10.0, one decimal)
- [x] Headline prefix customization
- [x] Percentile text editing
- [x] Avatar upload with crop functionality
- [x] Brand text customization
- [x] Hint text customization
- [x] CTA button label customization
- [x] Trait management (add, edit, delete)
- [x] Emoji/icon selection per trait
- [x] Label and sublabel editing per trait
- [x] Rating slider per trait (0.0-10.0)
- [x] Duplicate function (copy Between states)
- [x] Reset function (restore defaults)

#### Preview Features
- [x] Before view mode
- [x] After view mode
- [x] Side-by-side comparison mode
- [x] Interactive slider comparison mode
- [x] Real-time updates when editing
- [x] Proper rendering of all typography
- [x] Correct color scheme
- [x] Proper spacing and layout

#### Export Features
- [x] Export single card as PNG
- [x] Export single card as SVG
- [x] Export 2-up before/after comparison
- [x] High-resolution output (2x DPR)
- [x] Proper filename generation
- [x] Error handling for failed exports

#### Design Specifications
- [x] Card width: 400px max
- [x] Border radius: 28px
- [x] Background color: #1B1C1F
- [x] Border color: #2A2B31
- [x] Title: 28px, Inter 700
- [x] Percentile: 14px, Inter 500
- [x] Avatar: 64px circle with ring
- [x] Trait labels: 16px, Inter 600
- [x] Trait sublabels: 13px, Inter 500
- [x] Trait ratings: 22px, Inter 800
- [x] Purple CTA gradient: #7C3AED to #8B5CF6
- [x] Proper hover states on buttons

## Testing Procedures

### Manual Testing

#### 1. Basic Editing
```
1. Open the application
2. Verify default "After" card appears
3. Switch to "Before" tab
4. Modify the score using the slider
5. Verify the preview updates immediately
6. Change the headline prefix text
7. Verify changes appear in preview
```

#### 2. Avatar Upload
```
1. Click "Upload Avatar" button
2. Select an image file
3. Verify crop dialog appears
4. Adjust zoom and position
5. Click "Save Avatar"
6. Verify avatar appears in preview
7. Click "Remove" to delete avatar
8. Verify placeholder appears
```

#### 3. Trait Management
```
1. Edit an existing trait's rating
2. Verify rating updates in preview
3. Change a trait's emoji
4. Verify emoji updates in preview
5. Click "Add Trait"
6. Fill in new trait details
7. Verify new trait appears in preview
8. Delete a trait
9. Verify trait removed from preview
```

#### 4. Comparison Modes
```
1. Click "Side-by-Side" button
2. Verify both cards appear
3. Verify "Before" and "After" labels
4. Click "Slider" button
5. Drag the slider handle
6. Verify smooth reveal transition
7. Test on mobile viewport
```

#### 5. Export
```
1. Click "Export PNG"
2. Verify PNG downloads
3. Open PNG and verify quality
4. Click "Export 2-Up Comparison"
5. Verify before/after PNG downloads
6. Verify labels and spacing in output
7. Click "Export SVG"
8. Verify SVG downloads and opens correctly
```

#### 6. Persistence
```
1. Make several edits
2. Refresh the page
3. Verify all edits persisted
4. Clear localStorage
5. Refresh page
6. Verify defaults restored
```

### Browser Testing

Test in the following browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Testing

Test at these viewport sizes:
- [ ] 1920x1080 (Desktop)
- [ ] 1366x768 (Laptop)
- [ ] 768x1024 (Tablet)
- [ ] 375x667 (Mobile)

### Edge Cases

#### Score Validation
- [ ] Enter 10.1 → should clamp to 10.0
- [ ] Enter -0.5 → should clamp to 0.0
- [ ] Enter text → should handle gracefully

#### Avatar Upload
- [ ] Upload very large image (10MB+)
- [ ] Upload unsupported format
- [ ] Upload corrupted file
- [ ] Cancel crop operation

#### Trait Limits
- [ ] Add 20+ traits → should all render
- [ ] Delete all traits → should handle empty state
- [ ] Very long trait labels → should truncate/wrap

#### Export Edge Cases
- [ ] Export with no avatar
- [ ] Export with very long text
- [ ] Export with special characters
- [ ] Export with emoji-only labels

## Performance Benchmarks

### Target Metrics
- Initial page load: < 2s
- State update latency: < 100ms
- Export generation: < 3s
- Image crop processing: < 500ms

### Memory Usage
- Idle state: < 50MB
- With high-res avatar: < 150MB
- During export: < 200MB

## Known Limitations

1. **Browser Storage**: Limited by localStorage quota (~5-10MB)
2. **Export Size**: Very large images may fail on mobile
3. **Font Loading**: Brief FOUT on slow connections
4. **Touch Gestures**: Slider requires drag, not tap

## Accessibility

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] Contrast ratios meet AA standard
- [ ] Screen reader compatible (bonus)

## Future Enhancements

- [ ] Animated MP4/GIF export
- [ ] Preset templates
- [ ] Drag-and-drop avatar
- [ ] Undo/redo functionality
- [ ] Share to social media
- [ ] Cloud sync
- [ ] Collaborative editing

## Bug Reports

If you find issues, please document:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots/screen recording
5. Console errors (if any)

## Success Metrics

The application is considered successful if:
- ✅ All acceptance criteria are met
- ✅ No critical bugs in manual testing
- ✅ Passes in all major browsers
- ✅ Responsive on mobile and desktop
- ✅ Export quality matches preview
- ✅ Performance metrics within targets

