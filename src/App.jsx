import { useEffect,useState } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import axios from "axios";
import Editor from "react-simple-code-editor"
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

import './App.css'

function App() {

  const [code, setCode] = useState(``)
  const [review, setReview] = useState(``)

  const apiUri = import.meta.env.BACKEND_URI || 'http://localhost:3000/ai/get-review';

  useEffect(()=>{
    prism.highlightAll()
  },[])

  async function reviewCode() {
    const response = await axios.post(`${apiUri}`,{code})
    setReview(response.data)

  }

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          {/* add scroller for editor mode */}
          <Editor
            value={code}
            placeholder='Write your code here...'
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Google Sans", "Noto Sans", sans-serif',
              fontSize: 20,
              backgroundColor: '#282c34',
              height: '100%',
              width: '100%',
              overflow: "auto",
              whiteSpace: "pre",
            }}
          />
          
        </div>
        <div 
          onClick={reviewCode}
        className="review">Review</div>
      </div>
      <div className="right">
        <Markdown
          placeholder="Review will appear here..."
          rehypePlugins={[rehypeHighlight]}
        >
          {review}
        </Markdown>
      </div>
    </main>
    </>
  )
}
export default App
