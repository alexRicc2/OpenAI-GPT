import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();
  const [chatCompletion, setChatCompletion] = useState('')
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generateGPT4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setChatCompletion(data.completion)      
      setPromptInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/the-seo-hustler-favicon-32x32.png" />
      </Head>

      <main className={styles.main}>
        <img src="/the-seo-hustler-favicon-32x32.png" className={styles.icon} />
        <h3>GPT-4</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter an prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
        {console.log("json strigfied", addNewlineCharacters(JSON.stringify(chatCompletion, null, 4)))}
        <div className={styles.completion} dangerouslySetInnerHTML={{ __html: addNewlineCharacters(JSON.stringify(chatCompletion, null, 4))}}></div>
      </main>
    </div>
  );
}
function addNewlineCharacters(str) {
  const charsToAddNewline = ['[', ']', '{', '}'];

  for (const char of charsToAddNewline) {
    str = str.split(char).join(`${char}<br/>`);
  }
  console.log("string to return," , str)
  return str;
}