import * as React from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import { MarkButton, BlockButton } from '../../components/EditorButtons'
import { Element, Leaf } from '../../components/EditorElements'
import Toolbar from '../../components/Toolbar'

import { INITIAL_VALUE } from '../../constants'
import { NoteState } from '../../entities'
import { DataStoreStructure, UiStoreStructure } from '../../entities/storeTypes'
import './Editor.css'

interface StateProps {
 data: DataStoreStructure;
 ui: UiStoreStructure
}
interface DispatchProps {
  createNewNote: () => void,
  handleEditorChange: (noteState: NoteState) => void
  saveButtonClick: () => void
}
const EditorComponent = (props: StateProps & DispatchProps) => {
 const {
  data: { selectedNote },
  ui: { isNoteChanged },
  createNewNote,
  handleEditorChange,
  saveButtonClick
 } = props

 // isDirty
 // if isDirty - change button type ISChanged remove
 // if isDirty = true - call ipc
 // in store - могу ли я не хранить изначальный стейт заметки?


 React.useEffect(() => {
  if (selectedNote.id) {
    setEditorValue({
      content: selectedNote.prevState.content,
      title: selectedNote.prevState.title
    })
  }
 }, [selectedNote.id, selectedNote.prevState])

 const [editorValue, setEditorValue] = React.useState<NoteState>({ content: INITIAL_VALUE, title: '' })
 const renderElement = React.useCallback((props) => <Element {...props} />, [])
 const renderLeaf = React.useCallback((props) => <Leaf {...props} />, [])
 const editor = React.useMemo(() => withHistory(withReact(createEditor())), [])

 const updateUserValue = (name:string, newValue:Node[]|string) => {
    const newValueState = { ...editorValue, [name]: newValue }
    setEditorValue(newValueState)
    if (newValueState !== editorValue) {
      console.log(newValueState, newValue);
      // debounced action
      handleEditorChange(newValueState)
    }
  }

  console.log(selectedNote.prevState);

  const handleEditorFocus = React.useCallback(() => {
    if (!selectedNote) {
      createNewNote()
    }
  }, [createNewNote, selectedNote])

 return (
  <div className="editor-container">
   <div className="editor-container__navbar">
    <button
     className={`editor-container__button ${
      isNoteChanged
       ? 'editor-container__button_active'
       : 'editor-container__button_disabled'
     }`}
     disabled={isNoteChanged ? false : true}
     onClick={saveButtonClick}
    >
     Save
    </button>
   </div>
   <Slate
    editor={editor}
    value={editorValue.content}
    onChange={(value) => updateUserValue('content', value)}
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
      value={editorValue.title}
      onChange={(e) => updateUserValue('title', e.target.value)}
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
