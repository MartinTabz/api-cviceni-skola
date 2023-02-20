// Aby se mohl use state používat, tak se importne z balíčku do kterého patří
import { useState } from 'react';

export default function Home() {
  // Jedná se o deklaraci stavové proměnné React pomocí useState "hooku"
  // s počáteční hodnotou prázdného stringu. K aktualizaci její hodnoty 
  // lze použít funkci setInputValue.
  const [inputValue, setInputValue] = useState('');

  // Tato funkce se vyvolá při odeslání formuláře
  // Spouští se dole ve formě pomocí <form onSubmit={handleSubmit}>
  const handleSubmit = async (e) => {
    // Toto zabrání refreshování stránky při odeslání formuláře
    // Samozřejmě se do funkce musí poslat (e)
    e.preventDefault();

    //Definuje se tělo requestu pomocí objektu
    const body = {
      input: inputValue,
    }

    // Zavolá se metodou POST na url /api/getquote,
    // které se řekne že se posílá obsah typu JSON 
    // a pošle se body (Které se převede na JSON)
    const res = await fetch("/api/getquote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    // Samotná funkce "conts res" se neprovede a abychom
    // z ní vytěžili odpověď tak jí musíme vyvolat tím že
    // do const quote uložíme odpověď v jsonu, to znamená,
    // že se funkce vyvolá
    const quote = res.json();

    // Poté se vypíše do konzole výsledek
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
