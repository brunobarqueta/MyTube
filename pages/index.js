import React from 'react'
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import { StyledTimeline } from "../src/components/Timeline"
import Menu from "../src/components/Menu"


const HomePage = () => {
    const [filterValue, setFilterValue] = React.useState("frost");

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
                <Header />
                <Timeline filterValue={filterValue} playlists={config.playlists} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({bg}) => bg});
    height: 230px;
`
const Header = () => {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/>
            {/* <img src="banner" /> */}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

const Timeline = ({ filterValue, ...props }) => {

    const playlistsNames = Object.keys(props.playlists)
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (

                    <section>
                        <h2>{playlistName} </h2>
                        <div>
                            {videos
                            .filter((video) => {
                                return video.title.toLowerCase().includes(filterValue.toLowerCase())
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}