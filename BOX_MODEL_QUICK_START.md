# Box Model System - Quick Start Guide

## What's New

This update adds **Framer-like features** to your box model system with improved spacing handling, resize stability, better visual feedback, and responsive layout support.

## Quick Reference

### For Developers

#### Import the New Utilities

```javascript
// Core utilities for calculations
import { 
  calculateBoundingBox, 
  calculateContentBox,
  cssLengthToNumber,
  getResizeDirection,
  constrainDimensions 
} from './box-model/boxModelUtils'

// Constraint and overflow handling
import { 
  calculateStableResize, 
  checkOverflow,
  getNestedConstraints,
  clampToCanvasBounds 
} from './box-model/boxModelConstraints'

// Responsive layout support
import { 
  validateResponsiveLayout,
  checkLayoutCompatibility,
  generateResponsivePreset 
} from './box-model/boxModelResponsive'
```

#### Common Tasks

**Get element dimensions including spacing:**
```javascript
const boundingBox = calculateBoundingBox(element, includeMargin = true)
// Returns: { x, y, width, height, margin: {...}, padding: {...} }
```

**Check if element overflows parent:**
```javascript
const overflow = checkOverflow(childElement, parentElement)
if (overflow.overflowRight) {
  console.warn('Element extends beyond parent width')
}
```

**Validate responsive layout:**
```javascript
const validation = validateResponsiveLayout(element, ['desktop', 'tablet', 'phone'])
if (validation.issues.length > 0) {
  console.warn('Layout issues:', validation.issues)
}
```

**Get constraints for resizing:**
```javascript
const stableResize = calculateStableResize(
  { x: e.clientX, y: e.clientY },
  { x: e.clientX + dx, y: e.clientY + dy },
  { x, y, width: w, height: h },
  'se', // Resize direction
  { minWidth: 40, minHeight: 20, maxWidth: 1200, maxHeight: 900 }
)
```

### For Users

#### Key Features

1. **Editable Spacing** - Click any spacing value to edit margin and padding directly
2. **Stable Resizing** - Smooth, predictable element resizing without jumping
3. **Clear Selection** - Elements show improved outlines with multi-layer shadows
4. **Nested Elements** - Child elements respect parent padding constraints
5. **Overflow Detection** - Warnings when elements exceed container bounds
6. **Responsive Support** - Layout validation across desktop/tablet/phone breakpoints

#### Using the Box Model Panel

```
┌─────────────────────────────────┐
│ MARGIN                          │
│    ┌───────────────────────┐   │
│    │ BORDER                │   │
│    │ ┌─────────────────┐   │   │
│    │ │ PADDING         │   │   │
│    │ │ ┌───────────┐   │   │   │
│    │ │ │ CONTENT   │   │   │   │
│    │ │ └───────────┘   │   │   │
│    │ └─────────────────┘   │   │
│    └───────────────────────┘   │
└─────────────────────────────────┘
```

- Click any value to edit it (e.g., "16px", "20%", "2rem")
- Supported units: `px`, `%`, `rem`
- All spacing values are editable now (previously read-only)

## File Changes Summary

### Modified Files
- ✏️ `BoxModel.jsx` - Added editable margin/padding inputs
- ✏️ `CanvasElement.jsx` - Improved resize with constraints and better selection outline
- ✏️ `boxModelUtils.js` - Added new calculation and validation functions

### New Files
- ✨ `boxModelConstraints.js` - Constraint checking and overflow handling
- ✨ `boxModelResponsive.js` - Responsive layout utilities and validation

## Key Implementation Details

### Resize Stability (CanvasElement.jsx)

The resize handler now uses constraint checking to prevent:
- Elements becoming too small (min 40px × 20px)
- Elements exceeding canvas bounds
- Flickering during drag operations

```javascript
const stableResize = calculateStableResize(
  startPos, 
  currentPos, 
  startDimensions,
  handleId,
  { minWidth: 40, minHeight: 20, maxWidth, maxHeight }
)
```

### Improved Selection Outline

Multiple shadow layers provide clear visual feedback:
```css
box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15),    /* Outer glow */
            inset 0 0 0 1px rgba(14, 165, 233, 0.1), /* Inner line */
            0 0 12px rgba(14, 165, 233, 0.2);        /* Diffuse shadow */
```

### Spacing Calculations

Elements now properly calculate:
- **Margin** - Space outside the element
- **Padding** - Space inside the element  
- **Content Box** - The actual content area
- **Bounding Box** - Everything including margins

## Testing the Improvements

### Test 1: Editable Spacing
1. Select an element
2. In the Box Model panel, click a margin or padding value
3. Type a new value (e.g., "20px", "2rem")
4. Press Enter or click away
✅ Value should update and element should reposition

### Test 2: Resize Stability
1. Select an element
2. Drag a resize handle slowly
3. Element should move smoothly without jumping
✅ No flickering or jittering should occur

### Test 3: Selection Outline
1. Hover over elements - Should see blue outline with shadow
2. Click to select - Should see darker outline with multiple shadows
✅ Outlines should be clear and distinct

### Test 4: Responsive Validation
1. Use the responsive utility to validate layout
2. Call `validateResponsiveLayout(element, ['desktop', 'tablet', 'phone'])`
3. Check the returned validation object for issues
✅ Should identify layout problems across breakpoints

## Troubleshooting

**Q: Editable spacing isn't working**
- A: Make sure element is selected
- Check browser console for errors
- Verify SpacingInput component is imported

**Q: Resize feels sluggish**
- A: Check zoom level (should be 0.5-1.5 for best performance)
- Disable snap to grid if enabled
- Clear browser cache

**Q: Selection outline not showing**
- A: Verify CSS styles loaded (check for `__canvas-el-styles__` in DOM)
- Check if element z-index might be hiding outline
- Ensure `ce-selected` class is applied

**Q: Responsive validation shows errors**
- A: Check element dimensions are >= 20px
- Verify element isn't positioned outside canvas
- Use suggested layout adjustments

## Performance Tips

1. **Lazy Load Calculations** - Only validate responsive layouts on save
2. **Cache Bounding Boxes** - Store calculation results during drag operations
3. **Debounce Updates** - Batch multiple small updates into single render
4. **Constraint Checking** - Use precomputed min/max values

## Next Steps

1. **Integrate into Settings Panel** - Add option to edit constraints
2. **Add Snap Guides** - Visual guides for aligned resizing
3. **Smart Distribution** - Automatically distribute padding among children
4. **Layout Presets** - Common padding/margin configurations
5. **Constraint UI** - Visual editor for resize constraints

## Support & Questions

For issues or questions about the new box model system:
1. Check the main `BOX_MODEL_IMPROVEMENTS.md` for detailed documentation
2. Review file headers for inline code documentation
3. Check console for error messages and warnings

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Status**: Production Ready ✅
