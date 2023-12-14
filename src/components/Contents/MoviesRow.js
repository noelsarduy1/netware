import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRef, useState, useEffect } from "react";
import { SmoothHorizontalScrolling } from '../../utils';
import { useViewport } from "../hooks";
import { setMovieDetails } from "../store/actions";
import { useDispatch } from "react-redux";


function MoviesRow(props) {

    const { movies, title, isNetflix,idSection } = props;
    const [dragDown, setDragDown] = useState(0);
    const [dragMove, setDragMove] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [windowWidth] = useViewport();
    const dispatch = useDispatch();
    const sliderRef = useRef();
    const movieRef = useRef();



    const  handleSetMovie = (movie) => {
        dispatch(setMovieDetails(movie))
    }
    useEffect(() => {
        if (isDrag) {
            if (dragMove < dragDown) handleScrollRight();
            if (dragMove < dragDown) handleScrollLeft();
        }
    }, [dragMove, dragDown, isDrag]);



    const handleScrollRight = () => {
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        console.log(maxScrollLeft);
        if (sliderRef.current.scrollLeft < maxScrollLeft) {
            SmoothHorizontalScrolling(sliderRef.current,
                250,
                movieRef.current.clientWidth * 2,
                sliderRef.current.scrollLeft);
        }

    };
    const handleScrollLeft = () => {
        if (sliderRef.current.scrollLeft > 0) {
            SmoothHorizontalScrolling(sliderRef.current,
                250,
                - movieRef.current.clientWidth * 2,
                sliderRef.current.scrollLeft);
        }

    };


    const onDragStart = e => {
        setIsDrag(true);
        setDragDown(e.screenX);
    };
    const onDragEnd = e => {
        setIsDrag(false);
    };
    const onDragEnter = e => {
        setDragMove(e.screenX);
    };


    return (
        <MoviesRowContainer draggable='false' id ={idSection}>
            <h1 className="heading">{title}</h1>
            <MoviesSlider ref={sliderRef} draggable='true'

                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}

                style={
                    movies && movies.length > 0 ? {
                        gridTemplateColumns: `repeat(${movies.length},
                        ${windowWidth > 1200 ? '360px'
                                : windowWidth > 992 ? '300px'
                                    : windowWidth > 768 ? '250px' : '200px'
                            }
                        )`
                    }
                        : {}

                }>
                {
                    movies && movies.length > 0 && movies.map((movie, index) => {
                        if (movie.poster_path && movie.backdrop_path !== null) {
                            let imageUrl = isNetflix
                                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                                : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`

                            return (
                                <div 
                                key={index} 
                                className="movieItem" 
                                ref={movieRef} 
                                draggable='false'  
                                onClick={() => handleSetMovie(movie)}
                                >
                                    <img src={imageUrl} alt="" draggable='false'/>
                                    <div className="movieName">{movie.name || movie.title}</div>
                                </div>
                            )
                        }
                    })}
            </MoviesSlider>
            <div className={`btnLeft ${isNetflix && 'isNetflix'}`} onClick={handleScrollLeft}>
                <AiOutlineLeft />
            </div>
            <div className={`btnRight ${isNetflix && 'isNetflix'}`} onClick={handleScrollRight}>
                <AiOutlineRight />
            </div>
        </MoviesRowContainer>
    )
}
export default MoviesRow;

const MoviesRowContainer = styled.div`
background-color:var(--color-background);
color:var(--color-white);
padding: 20px 20px 0;
position: relative;
width: 100%;
height: 100%;

.heading{
    font-size: 18px;
    user-select: none;
}
.btnLeft{
    position: absolute;
    top: 40%;
    left: 30px;
    z-index: 1000;
    transform-origin:center;
    cursor: pointer;
    background-color:rgba(0,0,0,0.65);
    height: 50px;
    width: 40px;
    color: var(--color-white);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
    background-color:rgba(0,0,0,0.8);
        
    }
    &:hover svg{
        opacity: 1;
        transform: scale(1.3);
    }
    svg {
        opacity: 0.7;
        font-size: 30px;
        transition: all 0.3s linear ;
    }
    &.isNetflix {
        height: 100px;
        width: 50px;
    }
}
.btnRight{
    position: absolute;
    top: 40%;
    right: 30px;
    z-index: 1000;
    transform-origin:center;
    cursor: pointer;
    background-color:rgba(0,0,0,0.65);
    height: 50px;
    width: 40px;
    color: var(--color-white);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
    background-color:rgba(0,0,0,0.8);
        
    }
    &:hover svg{
        opacity: 1;
        transform: scale(1.3);
    }
    svg {
        opacity: 0.7;
        font-size: 30px;
        transition: all 0.3s linear ;
    }
    &.isNetflix {
        height: 100px;
        width: 50px;
    }
}


`


const MoviesSlider = styled.div`
display: grid;
gap: 12px;
transition: all 0.3s linear;
user-select: none;
overflow-y: hidden;
overflow-x: auto;
overflow: hidden;
padding: 28px 0;
scroll-behavior: smooth;

&:hover .movieItem{
    opacity: 0.5;
}

    .movieItem {
        transform: scale(1);
        max-width: 400px;
        max-height: 500px;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;
        user-select: none;
        overflow: hidden;
        border-radius:6px;
        transform: center left;
        position: relative;

        &:hover {
            transform: scale(1.1);
            z-index: 1;
            opacity: 1;
        }

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;

        }
        .movieName {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 4px;
            text-align: center;
            font-size: 16px;
            background-color:rgba(0,0,0,0.6);

        }
    }
    

`