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

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const REVIEW_ENDPOINT_URL = "/ai/get-review";


  useEffect(()=>{
    prism.highlightAll()
  },[])

  async function reviewCode() {

    if(code.length === 0) {
      alert("Please enter some code to review")
      return
    }
    if(code.split("/n").length > 10000) {
      alert("Code is too long. Please enter less than 10,000 characters")
      return
    }
    else{
      const response = await axios.post(`${BASE_URL}${REVIEW_ENDPOINT_URL}`,{code})
      setReview(response.data)
    }
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
          rehypePlugins={[rehypeHighlight]}
        >
          {review || "Review will appear here..."}
        </Markdown>
      </div>
    </main>
    </>
  )
}
export default App
