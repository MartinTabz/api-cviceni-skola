import Loading from '@/components/loading';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [gotResult, setGotResult] = useState(false);

  const [quoteValue, setQuoteValue] = useState(null);
  const [quoteError, setQuoteError] = useState(null);

  const [selectedStruggle, setSelectedStruggle] = useState('');
  const [openStruggle, setOpenStruggle] = useState(false);
  const [struggleError, setStruggleError] = useState(false);

  // Tato funkce se vyvolá při odeslání formuláře
  // Spouští se dole ve formě pomocí <form onSubmit={handleSubmit}>
  const handleSubmit = async (e) => {
    // Toto zabrání refreshování stránky při odeslání formuláře
    // Samozřejmě se do funkce musí poslat (e)
    e.preventDefault();
    setIsLoading(true);
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
    const quote = await res.json();

    console.log('const quote = res.json(); vrací:');
    console.log(quote);
    console.log("")

    console.log('quote.quote; vrací:');
    console.log(quote.quote);
    console.log("")

    console.log('quote.imgurl; vrací:');
    console.log(quote.imgurl);
    console.log("")

    console.log('quote.error; vrací:');
    console.log(quote.error);
    console.log("")

    if (!quote.error) {
      console.log(quote.id);
      setQuoteValue(quote);
      setQuoteError(null);
    } else if (quote.error) {
      console.log(quote.error);
      setQuoteError('Něco se pokazilo');
      setQuoteValue(null);
    } else {
      setQuoteError('Něco se pokazilo');
      setQuoteValue(null);
    }
    setGotResult(true);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : gotResult ? (
        <>
          {quoteError && <h2>{quoteError}</h2>}
          {quoteValue && (
            <section>
              <Image src={quoteValue.imgurl} height={256} width={256} alt={quoteValue.quote} />
              <p>{quoteValue.quote}</p>
            </section>
          )}
        </>
      ) : (
        <>
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
                      {selectedStruggle
                        ? selectedStruggle
                        : 'select your struggle'}
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
        </>
      )}
    </div>
  );
}
