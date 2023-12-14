import React from "react";
import { useDispatch } from "react-redux";
import MoviesRow from "./MoviesRow";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styled from 'styled-components';
import {animateScroll as scroll} from 'react-scroll';
import {FaChevronCircleUp} from 'react-icons/fa'
import { getNetflixOriginals,getTrendingMovies,getTopRatedMovies,getActionMovies,getComedyMovies,getHorrorMovies,getRomanceMovies,getDocumentaries } from "../store/actions";
import {useScrollY} from '../hooks';


function Contents (props) {
    const dispatch = useDispatch();
    const {NetflixOriginals,
        TrendingMovies,
        TopRatedMovies,
        ActionMovies,
        ComedyMovies,
        HorrorMovies,
        RomanceMovies,
        Documentaries
        
        
    } = useSelector(state => state.infoMovies);
    const [scrollY] = useScrollY();
    
    const scrollToTop = () => {
        scroll.scrollToTop();
    }
    useEffect(() => {
        dispatch(getNetflixOriginals());
        dispatch(getTrendingMovies());
        dispatch(getTopRatedMovies());
        dispatch(getActionMovies());
        dispatch(getComedyMovies());
        dispatch(getHorrorMovies());
        dispatch(getRomanceMovies());
        dispatch(getDocumentaries());
    },[dispatch])
    return (
        <div>
            <MoviesRow movies = {NetflixOriginals} title = "Netflix Originals" isNetflix = {true} idSection ='Netflix'/>
            <MoviesRow movies = {TrendingMovies} title = "Trending Movies"idSection ='trending' />
            <MoviesRow movies = {TopRatedMovies} title = "Top Rated Movies"idSection ='topRated'/>
            <MoviesRow movies = {ActionMovies} title = "Action Movies"idSection ='actionMovies' />
            <MoviesRow movies = {ComedyMovies} title = "Comedy Movies" idSection ='comedyMovies'/>
            <MoviesRow movies = {HorrorMovies} title = "Horror Movies"idSection ='horrorMovies' />
            <MoviesRow movies = {RomanceMovies} title = "Romance Movies"idSection ='romanceMovies' />
            <MoviesRow movies = {Documentaries} title = "Documentaries Movies"idSection ='documentariesMovies' />
           
            <GotoTop onClick = {() => scrollToTop()}
            style={{
                visibility: `${scrollY > 600 ? 'visible': 'hidden'}`
            }}
            >
            <FaChevronCircleUp/>
            </GotoTop>
        </div>
    );
}
export default Contents;
const GotoTop = styled.div`
    position:fixed;
    z-index: 40;
    right: 50px;
    bottom: 50px;
    font-size: 50px;
    color: rgba(255,255,255,0.4);
    transition:all 0.3s linear ;

    &:hover {
        color: rgba(255,255,255,0.8);
    }

    @media screen and (max-width:600px){
        right: 30px;
    }
`