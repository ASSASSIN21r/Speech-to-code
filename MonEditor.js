import React, {useRef} from 'react'
import Editor from '@monaco-editor/react'

export default function MonEditor(props) {

    // const [editorContent, updateContent] = useState('')
    var editorContent;
    const editorIns = useRef()
    const monacoIns = useRef()

    
    function handleMount(editor, monaco){
        editorIns.current = editor
        monacoIns.current = monaco
    }

    // function handleChange(value, event){
        //getPosition is used to get the current position of cursore
        //editor.getModel().getLineContent(line)
        // updateContent(value)
        // const position = editorIns.current.getPosition()
        // console.log(position)
        // console.log(value.split('\n'))

    // }

    function handleClick(){
        // this is the function which starts python process 
        // const position = editorIns.current.getPosition().lineNumber
        window.myElect.notificationApi.sendNotification(["my custom notification"])
    }

    window.myElect.notificationApi.receiveNotificatoin("fromMain", (data)=>{
        console.log(`Received ${data[0]} from main process`);
        const pos = editorIns.current.getPosition();
        const range = new monacoIns.current.Range(
            pos.lineNumber,
            pos.column,
            pos.lineNumber,
            pos.column
        );
        editorIns.current.executeEdits("new-bullets", [
            { identifier: "new-bullet", range, text: data[0] }
        ]);

        editorIns.current.setPosition({
            lineNumber: pos.lineNumber,
            column: pos.column + data[1]
        });
        editorIns.current.focus();
    })

    
    

    return (
        <>
            <button onClick={()=>handleClick()}>Click Me</button>
            
            <Editor
                height="90vh"
                defaultLanguage="python"
                defaultValue="'''some comment'''"
                value={editorContent}
                onMount={handleMount}
                
            />
            
        </>
    )
}
