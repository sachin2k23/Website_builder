# Enhanced Box Model System Documentation

## Overview

The improved box model system provides Framer-like features with proper spacing, resize stability, element selection feedback, accurate bounding box calculations, nested element support, overflow handling, and responsive layout validation.

## Core Features Implemented

### 1. **Proper Padding and Margin Handling**

#### Files Updated
- `BoxModel.jsx` - Now supports editable padding and margin values
- `boxModelUtils.js` - Enhanced with utility functions

#### Features
- **Editable Spacing**: Users can now directly edit margin and padding values through the UI
- **Bounding Box Calculations**: Accurate calculation of element bounds including all spacing
- **Content Box Tracking**: Separate calculation for content area inside padding

#### Usage
```javascript
import { calculateBoundingBox, calculateContentBox } from './box-model/boxModelUtils'

// Get full bounding box with margin
const bbox = calculateBoundingBox(element, true)

// Get content box (inside padding)
const contentBox = calculateContentBox(element)
```

### 2. **Resize Stability**

#### Files Updated
- `CanvasElement.jsx` - Improved resize handler with constraints
- `boxModelConstraints.js` - New constraint and stability checking system

#### Features
- **Constrained Resizing**: Elements can't be resized below minimum dimensions (40px width, 20px height)
- **Stable Drag Operations**: Prevents flickering and jumping during resize
- **Canvas Boundary Protection**: Elements stay within canvas boundaries

#### Implementation Details
```javascript
import { calculateStableResize, clampToCanvasBounds } from './box-model/boxModelConstraints'

// Calculate stable resize with constraints
const stableResize = calculateStableResize(
  startPosition,
  currentPosition,
  startDimensions,
  resizeDirection,
  {
    minWidth: 40,
    minHeight: 20,
    maxWidth: canvasWidth,
    maxHeight: canvasHeight,
    snapToGrid: false,
  }
)
```

### 3. **Element Selection Outline**

#### Enhancements
- **Multi-layer Visual Feedback**: Selection shows with multiple shadow layers for clarity
- **Improved Hover State**: Clear distinction between hover and selected states
- **Selection Handles**: 8-point resize handles with visual feedback
- **Label Tooltip**: Element name appears on hover with smooth animation

#### Styling Features
```css
/* Multiple shadow layers for depth */
box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), 
            inset 0 0 0 1px rgba(14, 165, 233, 0.1),
            0 0 12px rgba(14, 165, 233, 0.2);

/* Selection handles with hover effects */
.ce-resize-handle:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(35, 72, 215, 0.4);
}
```

### 4. **Accurate Bounding Box Calculations**

#### New Utility Functions
- `calculateBoundingBox(element, includeMargin)` - Full bounding box with optional margin
- `calculateContentBox(element)` - Content area inside padding
- `getSpacingOffset(element)` - Total spacing offsets

#### Usage Example
```javascript
import { calculateBoundingBox } from './box-model/boxModelUtils'

const box = calculateBoundingBox(element)
console.log(box) 
// { x, y, width, height, margin: {...}, padding: {...} }
```

### 5. **Nested Element Spacing Support**

#### Features
- **Parent-Child Constraints**: Children can't exceed parent bounds
- **Padding-Aware Layout**: Respects parent padding when calculating child positions
- **Automatic Parent Detection**: Finds nearest parent container for spacing calculations

#### Implementation
```javascript
import { getNestedConstraints } from './box-model/boxModelConstraints'

// Get constraints for nested element
const constraints = getNestedConstraints(childElement, parentElement)
```

### 6. **Overflow Handling**

#### New Capabilities
- **Overflow Detection**: Checks if element exceeds container bounds
- **Overflow Strategy Options**: `visible`, `hidden`, `scroll`, `auto`
- **Tolerance-based Detection**: Allows for precision overflow checking

#### Usage
```javascript
import { checkOverflow, getOverflowStrategy } from './box-model/boxModelConstraints'

const overflow = checkOverflow(element, parent)
// { overflowLeft, overflowTop, overflowRight, overflowBottom }

const strategy = getOverflowStrategy(element) // 'visible' | 'hidden' | 'scroll' | 'auto'
```

### 7. **Responsive Layouts**

#### New Utility Functions
- `validateResponsiveLayout(element, breakpoints)` - Validates layout across breakpoints
- `getResponsiveLayoutSuggestions(element, parentWidth)` - Suggests responsive improvements
- `checkLayoutCompatibility(element, fromBreakpoint, toBreakpoint)` - Checks layout consistency
- `generateResponsivePreset(baseLayout, targetBreakpoint)` - Creates responsive presets

#### Usage
```javascript
import { validateResponsiveLayout } from './box-model/boxModelResponsive'

const validation = validateResponsiveLayout(element, ['desktop', 'tablet', 'phone'])
console.log(validation)
// {
//   element: 'el-1',
//   breakpoints: { desktop: {...}, tablet: {...}, phone: {...} },
//   issues: []
// }
```

## File Structure

```
src/components/builder/box-model/
├── BoxModel.jsx                    # Main box model UI (enhanced)
├── BoxLayer.jsx                    # Visual box layer display
├── SpacingInput.jsx                # Spacing input component
├── boxModelUtils.js                # Core utilities (enhanced)
├── boxModelConstraints.js          # NEW: Constraint & overflow handling
└── boxModelResponsive.js           # NEW: Responsive layout support

src/components/builder/
├── CanvasElement.jsx               # Element rendering (improved)
└── Canvas.jsx                      # Canvas/editor container
```

## Key Utilities

### boxModelUtils.js
```javascript
// Spacing calculations
calculateBoundingBox(element, includeMargin)
calculateContentBox(element)
getSpacingOffset(element)

// Value normalization
normalizeCssLength(value, fallback, options)
cssLengthToNumber(value, fallback)

// Resize helpers
getResizeDirection(handleId)
calculateResizeWithAspectRatio(...)
constrainDimensions(width, height, minWidth, minHeight)
snapToGrid(value, gridSize)
isWithinTolerance(value, target, tolerance)
```

### boxModelConstraints.js
```javascript
// Constraint checking
checkOverflow(element, parent, tolerance)
clampToCanvasBounds(element, canvasWidth, canvasHeight)
getNestedConstraints(element, parentElement)

// Resize stability
calculateStableResize(startPos, currentPos, startDim, direction, constraints)
isStableResize(prevDimensions, nextDimensions, tolerance)

// Layout validation
validateSpacing(value, maxValue)
getOverflowStrategy(element)
```

### boxModelResponsive.js
```javascript
// Responsive validation
validateResponsiveLayout(element, breakpoints)
checkLayoutCompatibility(element, fromBreakpoint, toBreakpoint)
getResponsiveLayoutSuggestions(element, parentWidth)

// Responsive utilities
isResponsiveLayout(element)
getResponsiveScaleFactor(baseWidth, targetWidth)
applyResponsiveScale(element, scaleFactor)
generateResponsivePreset(baseLayout, targetBreakpoint)
```

## Usage Examples

### Example 1: Update Element Spacing
```javascript
import { calculateBoundingBox } from './box-model/boxModelUtils'

const bbox = calculateBoundingBox(selectedElement)
onUpdate(selectedElement.id, {
  marginTop: '16px',
  marginRight: '16px',
  marginBottom: '16px',
  marginLeft: '16px',
})
```

### Example 2: Validate Responsive Layout
```javascript
import { validateResponsiveLayout } from './box-model/boxModelResponsive'

const validation = validateResponsiveLayout(element, ['desktop', 'tablet', 'phone'])
if (validation.issues.length > 0) {
  console.warn('Layout issues:', validation.issues)
}
```

### Example 3: Handle Element Overflow
```javascript
import { checkOverflow } from './box-model/boxModelConstraints'

const overflow = checkOverflow(childElement, parentElement)
if (overflow.overflowRight || overflow.overflowBottom) {
  console.warn('Element overflows parent container')
}
```

### Example 4: Constrain Nested Element
```javascript
import { getNestedConstraints } from './box-model/boxModelConstraints'

const constraints = getNestedConstraints(childElement, parentElement)
const maxWidth = constraints.maxWidth // 320px if parent is 400px with padding
```

## Component Props

### BoxModel.jsx
```typescript
interface BoxModelProps {
  selected: Element | null
  elements: Element[]
  canvasWidth: number
  canvasHeight: number
  activeBreakpoint: string
  onUpdate: (id: string, changes: object) => void
}
```

### CanvasElement.jsx Improvements
- Better resize stability with constraint checking
- Improved selection outline with multi-layer shadows
- Enhanced resize handles with hover feedback
- Tooltip labels showing element name

## Performance Considerations

1. **Bounding Box Caching**: Consider caching bounding box calculations for large element trees
2. **Constraint Checking**: Constraint calculations are lightweight and run on each resize
3. **Responsive Validation**: Should be run on save, not on every change
4. **Overflow Detection**: Tolerance-based detection prevents excessive recalculation

## Migration Guide

If upgrading from the old system:

1. Update imports to use new utility functions
2. BoxModel now uses editable inputs for padding/margin (no longer read-only)
3. Resize handles have improved styling via CSS classes
4. New constraint system prevents invalid element sizes
5. Responsive utilities are optional but recommended for layout validation

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- ES6 JavaScript features used

## Future Enhancements

Potential improvements for future versions:
- Snap to guides for precise alignment
- Smart padding distribution across children
- Constraint editing UI in properties panel
- Layout presets for common patterns
- Advanced responsive breakpoint management
- Constraint visualization overlay
