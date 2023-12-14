import ReactPlayer from "react-player";
import { GoMute, GoUnmute } from 'react-icons/go'
import styled from "styled-components";
import { useState } from "react"


function Intro(props) {

    const [isMuted, setIsMuted] = useState(false)
    const [vol, setVol] = useState(1)

    return (
        <IntroContainer>
            <ReactPlayer
                playing={true}
                loop={true}
                width="100%"
                height="100%"
                volume={vol}
                mutex={isMuted}
                url="https://vimeo.com/644494272"
                className="videoIntro"
            />
            <div className="infoIntro">
                <h1 className="headingIntro">Netflix With Endesa</h1>
                <p className="overviewIntro">Dir Pablo Maestres and Eric Morales
                    Prod Co. Primo Content Spain
                    Client Endesa and Netflix

                    Shot in Madrid on Sony Venice Leica R lenses , also Sony FX3 FX6 footage and Laowa lens probe</p>
            </div>
            {
                isMuted ? (
                    <GoMute
                        className="btnVolume"
                        onClick={() => { setIsMuted(prev => !prev); { setVol(1) } }} />

                ) : (
                    <GoUnmute className="btnVolume" onClick={() => { setIsMuted(prev => !prev); { setVol(0) } }} />

                )


            }
            <div className="fadeBottom"></div>
        </IntroContainer>
    )
}
export default Intro;
const IntroContainer = styled.div`
background-color: black;
padding-top: 100px;
position: relative;
left: 0;
color: var(--color-white);
padding-top: 55%;


.videoIntro{
    position: absolute;
    top: 0;
    left: 0;
}
.infoIntro{
    position: absolute;
    top: 140px;
    left: 30px;


    @media screen and (max-width:800px){
        top: 120px;
        left: 25px;
        
    }
    @media screen and (max-width:600px){
        top: 100px;
        left: 15px;

    }

    .headingIntro{
        font-size: 60px;
        transition: all 0.3s ease;


        @media screen and (max-width:800px){
            font-size: 40px;
            
        }
        @media screen and (max-width:600px){
            font-size: 24px;
    
        }
    }

    .overviewIntro{
        max-width: 550px;
        width: 100%;
        line-height: 1.3;
        padding-top: 25px;
        font-size: 18px;

        @media screen and (max-width:800px){
            font-size: 16px;
            
        }
        @media screen and (max-width:600px){
            font-size: 14px;
    
        }
         
    }
}
.btnVolume{
    position: absolute;
    height: 40px;
    width: 40px;
    right: 10%;
    top: 50%;
    cursor: pointer;
    border-radius: 50%;
    padding: 6px;
    color: #bbb;
    border:#fff solid 1px ;
    transition: all 0.5s ease;
    transform: scale(1);

    &:hover{
        color: #fff;
        transform: scale(1.3);
        background-color: rgba(211,211,211,0.20)
    }

    @media screen and (max-width:800px){
        height: 30px;
        width: 30px;
        padding: 4px;
        
    }
    @media screen and (max-width:600px){
        height: 20px;
        width: 20px;
        padding: 2px;

    }
}
.fadeBottom{
    position:absolute;
    bottom:0;
    width: 100%;
    height: 120px;
    background-image: linear-gradient(180deg,transparent,rgba(15,15,15,0.6)40%,rgb(17,17,17),rgb(17,17,17))
}
`;