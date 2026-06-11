import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch coin data.');
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className='coin-details-container'>
      <Link to='/'>⬅ Back To Home</Link>

      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
      </h1>
      {loading && <Spinner />}
      {error && <p className='error'>❌ {error}</p>}
      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className='coin-details-image'
          />
          <p className='coin-details-description'>
            {coin.description.en.split('.')[0] + '.'}
          </p>
          <div className='coin-details-info'>
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: AU$
              {coin.market_data.current_price.aud.toLocaleString()}
            </h3>
            <h4>
              Market Cap: AU${coin.market_data.market_cap.aud.toLocaleString()}
            </h4>
            <h4>
              24 High: AU${coin.market_data.high_24h.aud.toLocaleString()}
            </h4>
            <h4>24 Low: AU${coin.market_data.low_24h.aud.toLocaleString()}</h4>
            <h4>
              24h Price Change: AU$
              {coin.market_data.price_change_24h.toFixed(3)} (
              {coin.market_data.price_change_percentage_24h.toFixed(3)}%)
            </h4>
            <h4>
              Circulating Supply:{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.aud.toLocaleString()} on{' '}
              {new Date(coin.market_data.ath_date.aud).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.aud.toLocaleString()} on{' '}
              {new Date(coin.market_data.atl_date.aud).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>

            <CoinChart coinID={coin.id} />

            <div className='coin-details-links'>
              {coin.links.homepage[0] && (
                <p>
                  🌐{' '}
                  <a
                    href={coin.links.homepage[0]}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Website
                  </a>
                </p>
              )}
              {coin.links.blockchain_site[0] && (
                <p>
                  🧩{' '}
                  <a
                    href={coin.links.blockchain_site[0]}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Blockchain Explorer
                  </a>
                </p>
              )}
              {coin.categories.length > 0 && (
                <p>Categories: {coin.categories.join(', ')}</p>
              )}
            </div>
          </div>
        </>
      )}
      {!loading && !error && !coin && <p>No data found</p>}
    </div>
  );
};

export default CoinDetailsPage;
