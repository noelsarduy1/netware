import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useViewport } from "../hooks";
import { getSearchMovies, setMovieDetails } from "../store/actions";



// const movieList = ['https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/12/2/marvel-cinematic-universe-order-1601976266-16384227544041717216365.jpg',
//     'https://vcdn1-giaitri.vnecdn.net/2014/07/25/marvel-logo-wallpaper-20367-hd-8184-8164-1406277534.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=7yyB59ZgEwE-oPpeYWLHZA',
//     'https://play-lh.googleusercontent.com/c4SxEDCnHLh78ihzLqM3XwdCvrwJKQdhd5opSCMerITWeom5cO0yP3AKolYpqxPzIlo',
//     'https://image.thanhnien.vn/900x600/Uploaded/2022/ygtmjz/2021_01_27/leonardo_afbb.jpg',
//     'https://image.thanhnien.vn/w660/Uploaded/2022/pwivoviu/2015_04_23/hinhnoibatcaribe_obxt.jpg',
//     'https://m.media-amazon.com/images/I/71llsoYIpzL._AC_SY741_.jpg'];

// cái này dữ liệu cũ để t add đại vô để t lấy hình để CSS 
// LÀ sao à biết làm như thầy k phải load lại oke oke hiểu mai coi làm ios với m mai dậy đi r nt t 
const useQuery = () => new URLSearchParams(useLocation().search);
function SearchMovies(props) {
    const [windowWidth] = useViewport();
    const dispatch = useDispatch();
    const {SearchMovies} = useSelector(state => state.infoMovies);
    // console.log(useLocation().search);
    const keywords = useQuery().get('keywords');
    console.log(keywords);

    useEffect(() => {
        if (keywords) {
            dispatch(getSearchMovies(keywords));
        } else {

        }
    }, [keywords, dispatch]);

    return (
        <SearchPane>
            {SearchMovies && SearchMovies.length > 0 ? (
                <div
                    className="searchContent"
                    style={{
                        gridTemplateColumns: `repeat(${windowWidth > 1200 ? 5 :
                            windowWidth > 992 ? 4 :
                                windowWidth > 768 ? 3 :
                                    windowWidth > 600 ? 2 : 1
                            },auto)`
                    }}
                >
                   
                    {SearchMovies.map((e, index) => {
                        if (e.backdrop_path !== null && e.media_type !== 'person') {
                            const imageUrl = `https://image.tmdb.org/t/p/w500/${e.backdrop_path}`
                            return (
                                <div 
                                key={e.index} 
                                className="movieItem"
                                onClick = {()=> dispatch(setMovieDetails(e))}   
                                
                                >
                                    <img src={imageUrl} alt="" />
                                    <span>{e.title || e.name}</span>
                                </div>
                            )
                        }

                    })}
                
                    
                 </div>
            ) : (
                <NotFound>
                    <h1>Your search for "" did not have any matches</h1>
                </NotFound>
            )
            }
        </SearchPane>
    );
}
export default SearchMovies;


const SearchPane = styled.div`
width: 100%;
min-height: 100vh;
padding-top: 80px;
background: var(--color-background);
transition: all 0.3s linear ;

    .searchContent{
    padding: 40px 60px;
    display:grid;
    gap: 12px;

    &:hover .movieItem{ 
        opacity: 0.8;

    }
    .movieItem{
        position: relative;
        max-width: 400px;
        width: 100%;
        height: 200px;
        border-radius:12px;
        margin: 20px 0;
        overflow: hidden;
        transform: scale(1);
        transition: all 0.3s linear ;

        &:hover {
            transform: scale(1.2);
            z-index: 10;
            opacity: 1;
        }
        img {
            width: 100%;
            height: height: 100%;
            object-fit:cover;
        }

        span {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            padding: 4px;
            background: rgba(0,0,0,0.5);
            color: var(--color-white);
            font-weight: bold;
        }
    }

}
`
const NotFound = styled.div`
padding: 5rem 8rem;
color: var(--color-white);
`