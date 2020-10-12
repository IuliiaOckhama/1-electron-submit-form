import * as React from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'

import { MarkButton, BlockButton } from '../../components/EditorButtons'
import { Element, Leaf } from '../../components/EditorElements'
import Toolbar from '../../components/Toolbar'

import { INITIAL_VALUE } from '../../constants'
import { DataStoreStructure, UiStoreStructure } from '../../entities'
import { compareObjects } from '../../helpers'
import './Editor.css'

interface StateProps {
 data: DataStoreStructure;
 ui: UiStoreStructure
}
interface DispatchProps {
  createNewNote: () => void,
  setIsNoteChanged: (isChanged: boolean) => void,
  updateNote: (id: number, title: string, content: Node[]) => void,
}
const EditorComponent = (props: StateProps & DispatchProps) => {
 const {
  data: { selectedNote, notes },
  ui: { isNoteChanged },
  createNewNote,
  setIsNoteChanged,
  updateNote
 } = props

 React.useEffect(() => {
  if (selectedNote) {
    // TODO
    const newValue = [
      {
      type: 'paragraph',
      children: [{ text: selectedNote.content ? selectedNote.content : '' }],
      },
    ]
    setReferenceValue(newValue)
    setValue(newValue)
    setTitle(selectedNote.title)
    setReferenceTitle(selectedNote.title)
  } else {
    const newValue = [
      {
      type: 'paragraph',
      children: [{ text: '' }],
      },
    ]
    setReferenceValue(newValue)
    setValue(newValue)
    setTitle('')
    setReferenceTitle('')
  }
 }, [selectedNote, notes])


 /* referenceValue - value after compiling backend flat string into Node[]. */
 const [referenceValue, setReferenceValue] = React.useState<Node[]>()
 const [referenceTitle, setReferenceTitle] = React.useState<string>()
 // TODO
 const [value, setValue] = React.useState<any[]>(INITIAL_VALUE)
 const [title, setTitle] = React.useState<string>('')
 // const [isNoteChanged, setIsNoteChanged] = React.useState<boolean>(false)
 const renderElement = React.useCallback((props) => <Element {...props} />, [])
 const renderLeaf = React.useCallback((props) => <Leaf {...props} />, [])
 const editor = React.useMemo(() => withHistory(withReact(createEditor())), [])



 // refactor
 React.useEffect(() => {
  if ((value && referenceValue && !compareObjects(value, referenceValue)) || (selectedNote && referenceTitle !== title)) {
    setIsNoteChanged(true)
   } else {
    setIsNoteChanged(false)
   }
 }, [value, title, referenceValue, selectedNote, referenceTitle, setIsNoteChanged])

 const handlChangeValue = (value: Node[]) => {
  setValue(value)
 }
 const handleChangeTitle = (title: string) => {
  setTitle(title)
 }
 const handleSaveButtonClick = () => {
  if (isNoteChanged && selectedNote) {
    // TODO
    const flatValue = value[0].children[0].text
    updateNote(selectedNote.id, title, flatValue)
  }
 }
 const handleEditorFocus = () => {
  if (!selectedNote) {
    console.log('CREATE NEW NOTE ON FOCUS');
    createNewNote()
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
      onFocus={handleEditorFocus}
     />
     <Editable
      className="editable-note"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder="Enter some text…"
      onFocus={handleEditorFocus}
      spellCheck
     />
    </div>
   </Slate>
  </div>
 )
}

export default EditorComponent
