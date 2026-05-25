import { memo, useCallback, useMemo } from 'react'
import { getElementLayout } from '../../../utils/responsive'
import { containsBox, getElementBox, isContainerElement } from '../../../utils/editorGeometry'
import BoxLayer from './BoxLayer'
import SpacingInput from './SpacingInput'
import { cssLengthToNumber, normalizeCssLength } from './boxModelUtils'

const DEFAULT_BOX_MODEL = {
  marginTop: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  paddingTop: '0px',
  paddingRight: '0px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  borderRadius: '0px',
  width: '200px',
  height: '100px',
}

const px = value => `${Math.max(0, Math.round(value || 0))}px`

function getNearestParentBox(selected, elements, activeBreakpoint, canvasWidth, canvasHeight) {
  const selectedBox = getElementBox(selected, activeBreakpoint)
  const parent = elements
    .filter(element => element.id !== selected.id && isContainerElement(element))
    .map(element => ({ element, box: getElementBox(element, activeBreakpoint) }))
    .filter(({ box }) => containsBox(box, selectedBox))
    .sort((a, b) => (a.box.width * a.box.height) - (b.box.width * b.box.height))[0]

  return parent?.box ?? {
    id: 'canvas',
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
  }
}

function getAutomaticSpacing(selected, elements, activeBreakpoint, canvasWidth, canvasHeight) {
  if (!selected) return DEFAULT_BOX_MODEL

  const selectedBox = getElementBox(selected, activeBreakpoint)
  const parentBox = getNearestParentBox(selected, elements, activeBreakpoint, canvasWidth, canvasHeight)

  const margin = {
    marginTop: px(selectedBox.y - parentBox.y),
    marginRight: px((parentBox.x + parentBox.width) - (selectedBox.x + selectedBox.width)),
    marginBottom: px((parentBox.y + parentBox.height) - (selectedBox.y + selectedBox.height)),
    marginLeft: px(selectedBox.x - parentBox.x),
  }

  const children = isContainerElement(selected)
    ? elements
        .filter(element => element.id !== selected.id)
        .map(element => ({ element, box: getElementBox(element, activeBreakpoint) }))
        .filter(({ box }) => containsBox(selectedBox, box))
    : []

  const padding = children.length
    ? {
        paddingTop: px(Math.min(...children.map(({ box }) => box.y - selectedBox.y))),
        paddingRight: px((selectedBox.x + selectedBox.width) - Math.max(...children.map(({ box }) => box.x + box.width))),
        paddingBottom: px((selectedBox.y + selectedBox.height) - Math.max(...children.map(({ box }) => box.y + box.height))),
        paddingLeft: px(Math.min(...children.map(({ box }) => box.x - selectedBox.x))),
      }
    : {
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
      }

  const layout = getElementLayout(selected, activeBreakpoint)

  return {
    ...margin,
    ...padding,
    borderRadius: normalizeCssLength(selected.borderRadius ?? `${selected.radius ?? 0}px`, DEFAULT_BOX_MODEL.borderRadius),
    width: normalizeCssLength(layout.width, `${Math.round(layout.width || 200)}px`),
    height: normalizeCssLength(layout.height, `${Math.round(layout.height || 100)}px`, { allowAuto: true }),
  }
}

function MetricValue({ label, value, disabled = false }) {
  return (
    <div className="min-w-0">
      <span className="mb-1 block text-[9px] font-medium uppercase tracking-wide text-[#AAB8D4]">
        {label}
      </span>
      <div className={`flex h-8 w-full min-w-0 items-center justify-center rounded-lg border border-[#E2E8F4] bg-white px-2 text-[11px] font-semibold text-[#0F2348] ${disabled ? 'text-[#AAB8D4] opacity-60' : ''}`}>
        {value}
      </div>
    </div>
  )
}

function BoxModel({
  selected,
  elements = [],
  canvasWidth = 1200,
  canvasHeight = 900,
  activeBreakpoint = 'desktop',
  onUpdate,
}) {
  const disabled = !selected
  const values = useMemo(
    () => getAutomaticSpacing(selected, elements, activeBreakpoint, canvasWidth, canvasHeight),
    [activeBreakpoint, canvasHeight, canvasWidth, elements, selected],
  )

  const updateRadius = useCallback((value) => {
    if (!selected) return
    onUpdate(selected.id, {
      borderRadius: value,
      radius: cssLengthToNumber(value, selected.radius || 0),
    }, { commit: true })
  }, [onUpdate, selected])

  const updateLayoutLength = useCallback((key, value) => {
    if (!selected) return
    const fallback = key === 'width' ? selected.width || 200 : selected.height || 100
    onUpdate(selected.id, { [key]: cssLengthToNumber(value, fallback) }, { commit: true })
  }, [onUpdate, selected])

  const updateSpacing = useCallback((key, value) => {
    if (!selected) return
    const numValue = cssLengthToNumber(value, 0)
    onUpdate(selected.id, { [key]: normalizeCssLength(value, '0px') }, { commit: true })
  }, [onUpdate, selected])

  const autoMetric = useCallback((key, label) => (
    <MetricValue label={label} value={values[key]} disabled={disabled} />
  ), [disabled, values])

  const input = useCallback((key, label, options = {}) => (
    <SpacingInput
      label={label}
      value={values[key]}
      disabled={disabled}
      fallback={DEFAULT_BOX_MODEL[key]}
      allowAuto={options.allowAuto}
      onChange={value => {
        if (key === 'borderRadius') updateRadius(value)
        else if (key.startsWith('margin') || key.startsWith('padding')) updateSpacing(key, value)
        else updateLayoutLength(key, value)
      }}
    />
  ), [disabled, updateLayoutLength, updateRadius, updateSpacing, values])

  return (
    <div className="space-y-3">
      {disabled && (
        <div className="rounded-xl border border-dashed border-[#D8E1F0] bg-[#F8FAFF] px-3 py-3 text-center text-xs font-medium text-[#8A9ABB]">
          Select an element to edit spacing
        </div>
      )}

      <div className="rounded-xl border border-[#E2E8F4] bg-[#F8FAFF] px-3 py-2 text-[10px] font-medium text-[#8A9ABB]">
        Spacing is calculated from element position or can be edited directly.
      </div>

      <BoxLayer
        label="Margin"
        tone="margin"
        disabled={disabled}
        top={input('marginTop', 'Top')}
        right={input('marginRight', 'Right')}
        bottom={input('marginBottom', 'Bottom')}
        left={input('marginLeft', 'Left')}
      >
        <BoxLayer label="Border" tone="border" disabled={disabled}>
          <BoxLayer
            label="Padding"
            tone="padding"
            disabled={disabled}
            top={input('paddingTop', 'Top')}
            right={input('paddingRight', 'Right')}
            bottom={input('paddingBottom', 'Bottom')}
            left={input('paddingLeft', 'Left')}
          >
            <div className="flex h-14 items-center justify-center rounded-md border border-[#D8E1F0] bg-white text-[10px] font-semibold uppercase tracking-wide text-[#8A9ABB]">
              Content
            </div>
          </BoxLayer>
        </BoxLayer>
      </BoxLayer>

      <div className="grid grid-cols-2 gap-2">
        {input('width', 'Width')}
        {input('height', 'Height', { allowAuto: true })}
      </div>
      <div>
        {input('borderRadius', 'Border radius')}
      </div>
    </div>
  )
}

export default memo(BoxModel)
