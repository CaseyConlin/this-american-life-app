import axios from "axios";
import { EpisodeProps, Act } from "../components/Player/Player";

export interface EpisodeResponseProps {
  episode_title: string;
  episode_num: string;
  episode_audio_url: string;
  episode_descript: string;
  episode_date: string;
  episode_acts: Act[];
}

export const fetchEpisode = (epNumber: string) => {
  const newEpisode = axios
    .get<EpisodeResponseProps>(`/api/episodes/${epNumber}/`)
    .then((res) => {
      const episode: EpisodeProps = {
        epNum: res.data.episode_num,
        acts: res.data.episode_acts,
        audio: res.data.episode_audio_url,
        desc: res.data.episode_descript,
        title: res.data.episode_title,
        epDate: res.data.episode_date,
      };
      return episode;
    });
  return newEpisode;
};

export const fetchEpisodes = () => {
  const episodesList = axios
    .get<EpisodeResponseProps[]>("/api/episodes/")
    .then((res) => {
      const mappedEpisodeList = res.data.map((ep: EpisodeResponseProps) => {
        const episode: EpisodeProps = {
          epNum: ep.episode_num,
          acts: ep.episode_acts,
          audio: ep.episode_audio_url,
          desc: ep.episode_descript,
          title: ep.episode_title,
          epDate: ep.episode_date,
        };
        return episode;
      });
      return mappedEpisodeList;
    });
  return episodesList;
};
