import * as React from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { IpcRenderer } from 'electron'

import { MarkButton, BlockButton } from '../../components/EditorButtons'
import { Element, Leaf } from '../../components/EditorElements'
import Toolbar from '../../components/Toolbar'

import { INITIAL_VALUE } from '../../constants'
import { DataStoreStructure } from '../../entities'
import { compareObjects } from '../../helpers'
import './Note.css'

interface StateProps {
 data: DataStoreStructure;
}
const EditorComponent = (props: StateProps) => {
 const {
  data: { selectedNote },
 } = props

 React.useEffect(() => {
  if (selectedNote) {
   const newValue = [
    {
     type: 'paragraph',
     children: [{ text: selectedNote.content }],
    },
   ]
   setReferenceValue(newValue)
   setValue(newValue)
   setTitle(selectedNote.title)
  }
 }, [selectedNote])

 /* referenceValue - value after compiling backend flat string into Node[]. */
 const [referenceValue, setReferenceValue] = React.useState<Node[]>()
 const [value, setValue] = React.useState<Node[]>(INITIAL_VALUE)
 const [title, setTitle] = React.useState<string>('')
 const [isNoteChanged, setIsNoteChanged] = React.useState<boolean>(false)
 const renderElement = React.useCallback((props) => <Element {...props} />, [])
 const renderLeaf = React.useCallback((props) => <Leaf {...props} />, [])
 const editor = React.useMemo(() => withHistory(withReact(createEditor())), [])
 // const ipc = React.useMemo(() => new IpcService(), [])

 const handlChangeValue = (value: Node[]) => {
  if (value && referenceValue && !compareObjects(value, referenceValue)) {
   setIsNoteChanged(true)
  } else if (value && referenceValue && compareObjects(value, referenceValue)) {
   setIsNoteChanged(false)
  }
  setValue(value)
 }
 const handleChangeTitle = (title: string) => {
  setTitle(title)
  selectedNote && selectedNote.title !== title
   ? setIsNoteChanged(true)
   : setIsNoteChanged(false)
 }
 const handleSaveButtonClick = () => {
  if (isNoteChanged) {
   ipc.send('SAVE_NOTE', 'arg')
  }
 }
 return (
  <div className="editor-container">
   <div className="editor-container__navbar">
    <button
     className={`editor-container__button ${
      isNoteChanged
       ? 'editor-container__button_active'
       : 'editor-container__button_disabled'
     }`}
     onClick={handleSaveButtonClick}
    >
     Save
    </button>
   </div>
   <Slate
    editor={editor}
    value={value}
    onChange={(value) => handlChangeValue(value)}
   >
    <div className="editor">
     <Toolbar>
      <MarkButton format="bold" icon="bold" />
      <MarkButton format="italic" icon="italic" />
      <MarkButton format="underline" icon="underlined" />
      <MarkButton format="code" icon="code" />
      <BlockButton format="heading-one" icon="h1" />
      <BlockButton format="heading-two" icon="h2" />
     </Toolbar>
     <input
      className="title-input"
      type="text"
      value={title}
      onChange={(e) => handleChangeTitle(e.target.value)}
      placeholder="Enter title"
     />
     <Editable
      className="editable-note"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder="Enter some rich text…"
      spellCheck
      autoFocus
     />
    </div>
   </Slate>
  </div>
 )
}

export default EditorComponent
