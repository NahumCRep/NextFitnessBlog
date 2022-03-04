import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MarkDownEditor = dynamic(
    ()=>import("@uiw/react-markdown-editor").then((mod)=>mod.default),{
        ssr:false
    }
)

const Editor = () => {
    const [content,setContent] = useState("")
    const saveContent = () =>{
        console.log(content)
    }

  return (
    <div>
        <button onClick={saveContent}>Guardar</button>
        <MarkDownEditor
            value={content}
            onChange={(editor,data,value)=>{
                setContent(value)
            }}
        />

        <article className='prose prose-invert'>
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    </div>
  )
}

export default Editor; 