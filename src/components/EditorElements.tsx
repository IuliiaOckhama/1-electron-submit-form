import React from 'react'
import {
 RenderElementProps,
 RenderLeafProps,
} from 'slate-react/dist/components/editable'

export const Element = ({
 attributes,
 children,
 element,
}: RenderElementProps) => {
 switch (element.type) {
  case 'block-quote':
   return <blockquote {...attributes}>{children}</blockquote>
  case 'bulleted-list':
   return <ul {...attributes}>{children}</ul>
  case 'heading-one':
   return <h1 {...attributes}>{children}</h1>
  case 'heading-two':
   return <h2 {...attributes}>{children}</h2>
  default:
   return <p {...attributes}>{children}</p>
 }
}

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
 if (leaf.bold) {
  children = <strong>{children}</strong>
 }

 if (leaf.code) {
  children = <code>{children}</code>
 }

 if (leaf.italic) {
  children = <em>{children}</em>
 }

 if (leaf.underline) {
  children = <u>{children}</u>
 }

 return <span {...attributes}>{children}</span>
}
