import React, { Ref, PropsWithChildren } from 'react'
import { BaseProps, OrNull } from '../entities'

export default React.forwardRef(
 (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLSpanElement>>
 ) => <span {...props} className="icon" ref={ref} />
)
