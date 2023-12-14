import NetflixLogo from '../../asset/images/logonetflix.png';
import { BsSearch } from 'react-icons/bs'
import styled from 'styled-components'
import {useState} from 'react'
import { useScrollY } from '../hooks';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const [scrollY] = useScrollY();
    const [keywords,setKeywords] = useState('');
    const navigate = useNavigate();
    const handleChangeInput = (e) => {
        let keywords = e.target.value;
        setKeywords(keywords);
        if(keywords.length > 0) {
            navigate(`/search?keywords=${keywords.trim()}`);
        }else{
            navigate(`/`);
        }
    }
    const goHome = () =>{
        navigate(`/`);
        setKeywords('');
    }
    return (
        <Navigation style = {scrollY < 50 ? {backgroundColor: 'transparent'}:{backgroundColor: 'var(--color-background)'}}>
            <div className="navContainer">
                <div className="logo"
                onClick = {goHome}
                >
                    <img src={NetflixLogo} alt="" />
                </div>
                <div className="navSearch">
                    <BsSearch className="iconSearch" />
                    <input
                        type="text"
                        placeholder="Input title, genres, people"
                        onChange = {handleChangeInput}
                        value = {keywords}
                    />
                </div>
            </div>
        </Navigation>
    )
}
export default Navbar;

const Navigation = styled.div`
width: 100%;
height: 60px;
position: fixed;
top: 0;
left: 0;
transition-timing-function: ease-in;
transition: all 2s;
z-index: 10;


@media only screen and (max-width: 600px){
    height: 100px;
}


    .navContainer{
    background-color: transparent;
    display:flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    flex-direction: row;
    
    @media only screen and (max-width: 600px){
        flex-direction: column;
    }

    .logo{
        padding-left: 30px;
        width: 120px;
        cursor:pointer;
        img{
            width: 100%;
        }
    }
    .navSearch {
        color:var(--color-white);
        padding-left: 30px;
        display:flex;
        justify-content: flex-end;
        
        &hover .iconSearch{
            color: var(--color-white);
        }


        .iconSearch{
            width: 20px;
            height: 20px;
            cursor:pointer;
            color: #bbb;
            transform: translateY(8px) translateX(26px);
        }

        input {
            font-size: 14px;
            border: 1px solid #fff;
            color: var(--color-white);
            outline:none;
            width: 0px;
            padding: 10px;
            cursor: pointer;
            opacity: 0;
            transition: width 1s;
            &:focus {
                padding-left: 36px;
                width: 300px;cursor: text;
                opacity: 1;
                border-radius: 4px;
                background: var(--color-background);

            }
        }
    }
    }
}
`;