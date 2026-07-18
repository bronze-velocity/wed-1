import { forwardRef } from 'react'

const Container = forwardRef(function Container(
  { as: Tag = 'div', narrow = false, className = '', style, children, ...rest },
  ref
) {
  const maxWidth = narrow ? '768px' : 'var(--container-max)'
  return (
    <Tag
      ref={ref}
      className={`w-full mx-auto px-6 md:px-10 lg:px-16 ${className}`}
      style={{ maxWidth, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Container
