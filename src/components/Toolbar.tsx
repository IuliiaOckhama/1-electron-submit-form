import React, { Ref, PropsWithChildren } from 'react'
import { BaseProps, OrNull } from '../entities'

const Menu = React.forwardRef(
 (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLDivElement>>
 ) => <div {...props} className="toolbar" ref={ref} />
)

export default React.forwardRef(
 (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLDivElement>>
 ) => <Menu {...props} ref={ref} />
)
