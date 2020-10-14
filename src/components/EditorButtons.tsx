import * as React from 'react'
import { useSlate} from 'slate-react'
import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react/dist/plugin/react-editor';
import { BaseProps, OrNull } from '../entities'
import { LIST_TYPES } from '../constants'

/* types */
const BlockButtonFormats = ['heading-one', 'heading-two'];
type BlockButtonFormats = typeof BlockButtonFormats[number]
const BlockButtonIcons = ['h1', 'h2'] as const;
type BlockButtonIcons = typeof BlockButtonIcons[number]
export interface BlockButtonProps {
  format: BlockButtonFormats,
  icon: BlockButtonIcons
}
const MarkButtonFormats = ['bold', 'italic', 'underline', 'code'];
export type MarkButtonFormats = typeof MarkButtonFormats[number]
const MarkButtonIcons = ['bold', 'italic', 'underlined', 'code'];
type MarkButtonIcons = typeof MarkButtonIcons[number]
export interface MarkButtonProps {
  format: MarkButtonFormats,
  icon: MarkButtonIcons
}


const isMarkActive = (editor:ReactEditor, format:MarkButtonFormats) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleBlock = (editor:ReactEditor, format:BlockButtonFormats) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type as string),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor:ReactEditor, format:MarkButtonFormats) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor:ReactEditor, format:BlockButtonFormats) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const EditorButton = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: React.PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: React.Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      className={`button ${active && "button_active"}`}
      ref={ref}
    />
  )
)

const Icon = React.forwardRef(
  (
   { className, ...props }: React.PropsWithChildren<BaseProps>,
   ref: React.Ref<OrNull<HTMLSpanElement>>
  ) => <span {...props} className="icon" ref={ref} />
 )
 

export const BlockButton = ({ format, icon } : BlockButtonProps) => {
  const editor = useSlate()
  return (
    <EditorButton
      active={isBlockActive(editor, format)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </EditorButton>
  )
}

export const MarkButton = ({ format, icon } : MarkButtonProps) => {
  const editor = useSlate()
  return (
    <EditorButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </EditorButton>
  )
}
