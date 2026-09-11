import { forwardRef } from 'react'

const WIDTHS = {
  default:   'var(--container-max)',
  editorial: 'var(--container-max-editorial)',
  reading:   'var(--container-max-reading)',
  narrow:    '768px',
}

const Container = forwardRef(function Container(
  {
    as: Tag = 'div',
    narrow = false,
    editorial = false,
    reading = false,
    className = '',
    style,
    children,
    ...rest
  },
  ref
) {
  const variant = reading
    ? 'reading'
    : editorial
    ? 'editorial'
    : narrow
    ? 'narrow'
    : 'default'
  const defaultMaxWidth = WIDTHS[variant]
  const { maxWidth: styleMaxWidth, ...restStyle } = style || {}
  return (
    <Tag
      ref={ref}
      className={`wepho-container ${className}`}
      style={{ maxWidth: styleMaxWidth ?? defaultMaxWidth, ...restStyle }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Container
