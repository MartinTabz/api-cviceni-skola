import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

export default function Home() {
  const [selectedStruggle, setSelectedStruggle] = useState('');
  const [openStruggle, setOpenStruggle] = useState(false);
  const [struggleError, setStruggleError] = useState(false);

  // Tato funkce se vyvolá při odeslání formuláře
  // Spouští se dole ve formě pomocí <form onSubmit={handleSubmit}>
  const handleSubmit = async (e) => {
    // Toto zabrání refreshování stránky při odeslání formuláře
    // Samozřejmě se do funkce musí poslat (e)
    e.preventDefault();

    //Definuje se tělo requestu pomocí objektu
    const body = {
      input: selectedStruggle,
    };
    const res = await fetch('/api/getquote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(res);
    const quote = res.json();
    console.log(quote);
  };

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.formarea}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputgroup}>
              <div
                className={styles.dropdown}
                onClick={() => {
                  setOpenStruggle(!openStruggle);
                  setStruggleError(false);
                }}
                style={{
                  border: struggleError && ' 2px solid red',
                  borderRadius: openStruggle ? '10px 10px 0px 0px' : '10px',
                }}
              >
                <span>
                  {selectedStruggle ? selectedStruggle : 'select your struggle'}
                </span>
                <BiChevronDown size={25} />
              </div>
              <ul
                style={{ display: openStruggle ? 'block' : 'none' }}
                className={styles.dropdownitems}
              >
                <li
                  onClick={() => {
                    setSelectedStruggle('work');
                    setOpenStruggle(false);
                  }}
                >
                  Work
                </li>
                <li
                  onClick={() => {
                    setSelectedStruggle('love');
                    setOpenStruggle(false);
                  }}
                >
                  Love
                </li>
                <li
                  onClick={() => {
                    setSelectedStruggle('procrastination');
                    setOpenStruggle(false);
                  }}
                >
                  Procrastination
                </li>
                <li
                  onClick={() => {
                    setSelectedStruggle('erection');
                    setOpenStruggle(false);
                  }}
                >
                  Erection
                </li>
                <li
                  onClick={() => {
                    setSelectedStruggle('motivation');
                    setOpenStruggle(false);
                  }}
                >
                  Motivation
                </li>
              </ul>
            </div>

            <div className={styles.submit}>
              <button type="submit">
                Get Your Daily Dose Of Motivational Quote
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
