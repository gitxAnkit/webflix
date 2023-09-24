import React, { useEffect , useState} from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';


const API_KEY= "33994f09044af2d435385cc05d58676a";
const URL= "https://api.themoviedb.org/3";
const IMG_URL="https://image.tmdb.org/t/p/original";
// TV-POPULAR UPCOMING TOP RATED 
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

  const [popular, setPopular] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [genres, setGenre] = useState([]);
  useEffect(() => {
   
    const fetchPopular=async ()=>{
      const {data:{results}} = await axios.get(`${URL}/movie/popular?api_key=${API_KEY}`);
      setPopular(results);
    }
    const fetchTvShows=async ()=>{
      const {data:{results}} = await axios.get(`${URL}/tv/popular?api_key=${API_KEY}`);
      setTvShows(results);
    }
    const fetchUpcoming=async ()=>{
      const {data:{results}} = await axios.get(`${URL}/movie/upcoming?api_key=${API_KEY}`);
      setUpcoming(results);
    }

    const fetchTopRated=async ()=>{
      const {data:{results}} = await axios.get(`${URL}/tv/top_rated?api_key=${API_KEY}`);
      setTopRated(results);
      console.log("top rated:", topRated[2]);
    }
    const fetchAiringToday=async ()=>{
      const {data:{results}} = await axios.get(`${URL}/tv/airing_today?api_key=${API_KEY}`);
      setAiringToday(results);
    }
    const fetchAllGenre=async ()=>{
      const {data:{genres} }= await axios.get(`${URL}/genre/tv/list?api_key=${API_KEY}`);
      setGenre(genres);
    }


    fetchPopular();
    fetchAiringToday();
    fetchTopRated();
    fetchTvShows();
    fetchUpcoming();
    fetchAllGenre();
  }, [])
  
  
  
  return (
    <section className="home">
      <div className="banner" 
      style={{ backgroundImage: topRated[1]? `url(${IMG_URL}/${topRated[2].backdrop_path})`:"rgb(0,0,0)" }} >

        {topRated[2] &&<h1>{topRated[2].name}</h1>}
        {topRated[2] &&   <p>{topRated[2].overview}</p>}
       
        <div>
          <button className='btns'><BiPlay />Play</button>
          <button className='btns'>My list<AiOutlinePlus /></button>
        </div>
      </div>

      <Row title={'Popular of Netflix'} cardsArr={popular} />
      <Row title={'Top Rated'} cardsArr={topRated} />
      <Row title={'TV Shows'} cardsArr={tvShows}/>
      <Row title={'Upcoming Movies'} cardsArr={upcoming}/>
      <Row title={'Airing Today'} cardsArr={airingToday} />

      <div className="genreBox">
        
          {genres.map((item,index)=>(
            <Link key={index} to={`/genre/${item.id}`} >
              {item.name}
            </Link>
          ))}
      </div>
    </section>
  )
}

export default Home;