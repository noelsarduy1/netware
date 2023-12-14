import {ImHome} from 'react-icons/im';
import {HiTrendingUp,HiEmojiSad,HiDocument} from 'react-icons/hi';
import {MdStarRate,MdTheaterComedy} from 'react-icons/md';
import {GiPunchBlast,GiEternalLove} from 'react-icons/gi';
import {SiNetflix} from 'react-icons/si';
import styled from 'styled-components';
import MenuItem from './MenuItem';




function Menus(props) {

return (
    <MenusPane>
        <MenuItem name = "Netflix" Icon = {SiNetflix} to='Netflix'/>
        <MenuItem name = "Trending" Icon = {HiTrendingUp} to='trending'/>
        <MenuItem name = "Top Rated" Icon = {MdStarRate} to='topRated'/>
        <MenuItem name = "Action Movies" Icon = {GiPunchBlast} to='actionMovies'/>
        <MenuItem name = "Comedy Movies" Icon = {MdTheaterComedy} to='comedyMovies'/>
        <MenuItem name = "Horror Movies" Icon = {HiEmojiSad} to='horrorMovies'/>
        <MenuItem name = "Romance Movies" Icon = {GiEternalLove} to='romanceMovies'/>
        <MenuItem name = "Documentaries" Icon = {HiDocument} to='documentariesMovies'/>
    </MenusPane>
)

}
export default Menus;

const MenusPane = styled.div`
position: fixed;
left: 0;
top: 20%;
width: 36px;
padding: 6px 0;
background: rgba(255, 255, 255, 0.2);
border-radius: 10px;
z-index: 10000;
overflow: hidden;
display: flex;
flex-direction:column;
transform-origin: left center;
transition: all 0.3s linear ;
overflow: hidden;
&:hover{
    width: 180px;
    background: rgba(255, 255, 255, 0.4 );

}
.subMenu{
    display: flex;
    align-items:center;
    width: max-content;
    margin-left: 2px;
    padding: 4 6px;
    cursor: pointer;

    .icon{
        font-size: 30px;
        margin-right:10px;
        padding-top: 10px;
        color: hsl(358deg 93% 47%);
    }


    span{
        transform: translateY(6px);
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255,0.6);
        color: black;
        &:hover {
            color: #fff;
        }
    }
}

`


