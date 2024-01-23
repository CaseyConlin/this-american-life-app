import "./App.css";
import MusicPlayerSlider from "./components/Player/Player";
import BottomAppBar from "./components/AppBar/AppBar";
import { useState, useEffect } from "react";
// import axios from "axios";
import { EpisodeProps } from "./components/Player/Player";
import SwipeableTemporaryDrawer from "./components/Drawer";
import { fetchEpisode, fetchEpisodes } from "./Services/episodes";
// import { ListEpisode } from "./Services/episodes";

// import { DrawerProps } from "./components/Drawer";

function App() {
  const [episode, setEpisode] = useState<EpisodeProps | undefined>();
  const [episodes, setEpisodes] = useState<EpisodeProps[] | undefined>();
  const [epsLoading, setEpsLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  // const acts1 = [
  //   {
  //     name: "Prologue",
  //     summary:
  //       "Ira explains how a man named Chris Butler created a private detective agency where the investigators were good-looking soccer moms. Their publicist invited a reporter named Pete Crooks from Diablo magazine to do a ride-along with the P.I.",
  //     number: 0,
  //     timestamp: 0,
  //     byline: 'By <a href="/archive?contributor=8731">Ira Glass</a>',
  //   },
  //   {
  //     name: "Act One: A Pretty Dame Walks In",
  //     summary:
  //       "Joshuah Bearman tells the story of Pete's ridealong with the PI Moms, and how strange things started to happen. As he dug deeper into their operations, he learned about cases like the Candyman, where everything gets oddly and unnecessarily complicated.",
  //     number: 1,
  //     timestamp: 246,
  //     byline: 'By <a href="/archive?contributor=8532">Josh Bearman</a>',
  //   },
  //   {
  //     name: "Act Two: His Partner Drops a Dime",
  //     summary:
  //       "Joshuah Bearman's story continues. Chris Butler makes a transition into true criminal behavior.",
  //     number: 2,
  //     timestamp: 2044,
  //     byline: 'By <a href="/archive?contributor=8532">Josh Bearman</a>',
  //   },
  // ];

  const drawerHandler = (open: boolean) => {
    if (open) {
      setEpsLoading(true);
      fetchEpisodes().then((res) => {
        setEpisodes(res);
        setEpsLoading(false);
        setDrawerOpen(true);
      });
    } else setDrawerOpen(false);
    // axios
    //   .get("http://localhost:8000/api/episodes/")
    //   .then((res) => setEpisodes(res.data))
    //   .then(() => {
    //     setDrawerOpen(!drawerOpen);
    //     setEpsLoading(false);
    //   });
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/episodes/")
  //     .then((res) => console.log(res.data));
  // }, []);

  useEffect(() => {
    fetchEpisodes().then((res) => {
      playEpisodeHandler(res[1].epNum);
    });
    // axios.get("http://localhost:8000/api/episodes/555/").then((res) =>
    //   setEpisode({
    //     epNum: res.data.episode_num,
    //     epDate: res.data.episode_date,
    //     title: res.data.episode_title,
    //     desc: res.data.episode_descript,
    //     audio: res.data.episode_audio_url,
    //     acts: res.data.episode_acts,
    //   })

    // .then((res) => console.log(res.data));
    // .then((res) => setEpisode(res.data));
  }, []);

  const playEpisodeHandler = (epNum: string) => {
    // .get("http://localhost:8000/api/episodes/")
    fetchEpisode(epNum).then((res) => {
      setEpisode(res);
    });
    // .get(`http://localhost:8000/api/episodes/${epNum}/`)
    // .then((res) =>
    //   setEpisode({
    //     epNum: res.data.episode_num,
    //     epDate: res.data.episode_date,
    //     title: res.data.episode_title,
    //     desc: res.data.episode_descript,
    //     audio: res.data.episode_audio_url,
    //     acts: res.data.episode_acts,
    //   })
    // );
    setDrawerOpen(false);
  };

  // const episode1 = {
  //   epNum: "447",
  //   epDate: "Mar. 22, 2013",
  //   title: "The Incredible Case of the P.I. Moms",
  //   desc: "What do you get when you take a private investigation firm, toss in a bunch of sexy soccer moms, then add official sponsorship from Glock firearms, a lying boss, and delusions of grandeur? This week's show. That's what you get.",
  //   audio:
  //     "https://www.thisamericanlife.org/sites/default/files/audio/447/VSjp3IT05HxXprTlbZA40mrLB5UitDRoDx1ZYW6U2rg/447.mp3",
  // };
  return (
    <>
      {episode && (
        <MusicPlayerSlider
          // epNum={episode1.epNum}
          // epDate={episode1.epDate}
          // title={episode1.title}
          // desc={episode1.desc}
          // audio={episode1.audio}
          // acts={acts1}
          epNum={episode.epNum}
          epDate={episode.epDate}
          title={episode.title}
          desc={episode.desc}
          audio={episode.audio}
          acts={episode.acts}
        />
      )}
      <BottomAppBar action={drawerHandler} epsLoading={epsLoading} />
      <SwipeableTemporaryDrawer
        openDrawer={drawerHandler}
        drawerOpen={drawerOpen}
        episodeList={episodes}
        episodeLoader={playEpisodeHandler}
      />
    </>
  );
}

export default App;
