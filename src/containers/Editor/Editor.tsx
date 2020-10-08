import * as React from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'

import { MarkButton, BlockButton } from '../../components/EditorButtons'
import { Element, Leaf } from '../../components/EditorElements'
import Toolbar from '../../components/Toolbar'

import { INITIAL_VALUE } from '../../constants'
import { DataStoreStructure } from '../../entities'
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
   setValue(newValue)
   setTitle(selectedNote.title)
  }
 }, [selectedNote])

 const [value, setValue] = React.useState<Node[]>(INITIAL_VALUE)
 const [title, setTitle] = React.useState<string>('')
 const renderElement = React.useCallback((props) => <Element {...props} />, [])
 const renderLeaf = React.useCallback((props) => <Leaf {...props} />, [])
 const editor = React.useMemo(() => withHistory(withReact(createEditor())), [])

 return (
  <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
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
     onChange={(e) => setTitle(e.target.value)}
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
 )
}

export default EditorComponent
