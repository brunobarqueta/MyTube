import React from 'react'
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://ptqfpodvdwrhmrgamhsu.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cWZwb2R2ZHdyaG1yZ2FtaHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwMTYwNDgsImV4cCI6MTk4NzU5MjA0OH0.1mfR6zLo8CYp8pFsDt1AvOpL9PA8p2MfWAzfhoC-Vb4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const HomePage = () => {
    const [filterValue, setFilterValue] = React.useState("");
    const [playlists, setPlaylists] = React.useState({})

    React.useEffect(() => {

        supabase.from("video")
            .select("*")
            .then((result) => {
                const newPlaylists = { ...playlists }
                result.data.forEach((video) => {
                    if (!newPlaylists[video.playlist]) {
                        newPlaylists[video.playlist] = [];
                    }
                    newPlaylists[video.playlist].push(video);
                });
                setPlaylists(newPlaylists);
            });
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
                <Header />
                <Timeline filterValue={filterValue} playlists={playlists} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`

    background-color: ${({ theme }) => theme.backgroundLevel1} ;
    
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
    background-image: url(${({ bg }) => bg});
    height: 230px;
`
const Header = () => {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
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
                                            <img src={video.thumbnail} />
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