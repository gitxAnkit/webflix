import React, { useEffect , useState} from 'react';
import './Home.scss';
import axios from 'axios';

const API_KEY= "33994f09044af2d435385cc05d58676a";
const URL= "https://api.themoviedb.org/3/movie";
const IMG_URL="https://image.tmdb.org/t/p/w500";

const Card = ({img}) =>(
    <img className='card' src={img} alt="cover" />
  )

const Row = ({ title,cardsArr=[ ] }) =>(

  <div className='row'>
    <h2>{title}</h2>

    <div>
    {
    cardsArr.map((item,index)=>(

        <Card key={index} img={`${IMG_URL}/${item.poster_path}`} />

    ))
    }
    </div>

  </div>
)

const Home = () => {

  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
   
    const fetchUpcoming=async ()=>{
      const {data:{results}} = await axios.get(`${URL}/upcoming?api_key=${API_KEY}`);
      setUpcoming(results);
      console.log(upcoming);
    }
    fetchUpcoming();
  }, [])
  
  
  
  return (
    <section className="home">
      <div className="banner"></div>

      <Row title={'Popular of Netflix'} cardsArr={upcoming} />
      <Row title={'TV Shows'} />
      <Row title={'Movies'} />
      <Row title={'Recently Added'} />
      <Row title={'My list'} />

    </section>
  )
}

export default Home;