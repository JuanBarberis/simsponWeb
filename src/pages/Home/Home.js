import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios';
function Home() {

    const [quotes, setQuotes] = useState([]);
    const [inputValue, setInputValue] = useState('')
    // const filterCharachter = quotes.filter((character)=> character.character !== )
    const uniqueCharacters = quotes.filter((item, index, self) =>
        self.findIndex((innerItem) => innerItem.character === item.character) === index
    );

    const fetchData = async () => {
        try {
            const response = await axios.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=50');
            setQuotes(response.data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    }


    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredCharacters = uniqueCharacters.filter((item) =>
        item.character.toLowerCase().includes(inputValue.toLowerCase())
    );


    useEffect(() => {

        fetchData()
  

    }, [])
    return (
        <div className='conteiner-all'>
            <div className='div-input'>
                <label>
                    busque su personaje
                </label>
                <input
                    placeholder='Ingrese una tecla...'
                    onChange={handleInputChange}
                    value={inputValue}
                />
            </div>
            <div className='div-all'>
                {
                    filteredCharacters.length >= 1
                        ?
                        filteredCharacters.map((item, index) => {

                            return (

                                <div key={index} className='div-box'>
                                    <h1 className='name-personaje'>{item.character}</h1>
                                    <img src={item.image} className='img-character' alt={item.character} />
                                    <p className='text-character'>{item.quote}</p>
                                </div>
                            )
                        })
                        :
                        <h2>no se encontraron registros </h2>
                }
            </div >


        </div>
    )
}

export default Home