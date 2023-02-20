import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      input: inputValue,
    }
    const res = await fetch("/api/getquote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    const quote = res.json();
    console.log(quote);
  }

  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Input something about you"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <button type='submit'>Get Your Daily Dose Of Motivational Quote</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
