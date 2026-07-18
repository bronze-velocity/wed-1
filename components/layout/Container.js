import { forwardRef } from 'react'

const Container = forwardRef(function Container(
  { as: Tag = 'div', narrow = false, className = '', style, children, ...rest },
  ref
) {
  const defaultMaxWidth = narrow ? '768px' : 'var(--container-max)'
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
