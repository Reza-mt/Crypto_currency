import React, { useEffect, useState } from 'react';

//API
import  getCoin  from '../services/Api'

//Components
import Coin from './Coin'
import styles from './Landing.module.css'

const Landing = () => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState((''))

    useEffect(() => {
        const fetchAPI = async ()=> {
            const data = await getCoin();
            console.log(data);
            setCoins(data)
        }

        fetchAPI()
    }, [])

    const searchHandler = event => {
        setSearch(event.target.value)
    }

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <input className={styles.input} type='text' placeholder='search' value={search} onChange={searchHandler} />
            <div className={styles.container}>
                {searchedCoins.map(coin => <Coin
                    key={coin.id}
                    image={coin.image}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.current_price} 
                    marketCap={coin.market_cap}
                    priceChange={coin.price_change_percentage_24h}
                />)}
            </div>
        </div>
    );
};

export default Landing;