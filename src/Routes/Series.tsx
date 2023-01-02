import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import * as H from "../styled-components/StyledHome";
import { makeImagePath } from "../utils/utils";
import SeriesSlider from "../Components/Series/SeriesSlider";
import { getSeries, IGetResult } from "../Components/apis/Mov_Ser_Api";
import { useNavigate } from "react-router-dom";

function TvSeries() {
  // popular API
  const { data: pop_data, isLoading: pop_Loading } = useQuery<IGetResult>(
    ["tv", "popular"],
    () => getSeries("popular")
  );

  // top_rated API
  const { data: top_data, isLoading: top_Loading } = useQuery<IGetResult>(
    ["tv", "topRated"],
    () => getSeries("top_rated")
  );

  // on_the_air API
  const { data: on_data, isLoading: on_Loading } = useQuery<IGetResult>(
    ["tv", "ontheair"],
    () => getSeries("on_the_air")
  );

  // 배너 이미지, results[0]의 경우 backdrop_path
  const imagePath = pop_data?.results[0].backdrop_path
    ? pop_data?.results[0].backdrop_path
    : pop_data?.results[0].poster_path;

  // 배너 영역 > 모달 띄우는 버튼
  const nowId = pop_data?.results[0].id;
  const navigate = useNavigate();
  const onInfoClick = (nowId: number) => {
    navigate(`/tv/${nowId}`);
  };
  return (
    <H.Wrapper>
      {pop_Loading && top_Loading && on_Loading ? (
        <H.Loader>Loading...</H.Loader>
      ) : (
        <>
          <Helmet>
            <title>Neonfilx - Series</title>
          </Helmet>
          {/* -- 배너 영역 --  */}
          <H.Banner bgphoto={makeImagePath(imagePath || "")}>
            <H.Title_and_Overview>
              <H.Title>{pop_data?.results[0].name}</H.Title>
              <H.Overview>{pop_data?.results[0].overview}</H.Overview>
              <H.Btn_Container>
                <H.PlayBtn>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Play
                </H.PlayBtn>
                <H.InfoBtn onClick={() => onInfoClick(nowId!)}>
                  ⓘ Information
                </H.InfoBtn>
              </H.Btn_Container>
            </H.Title_and_Overview>
          </H.Banner>
          <SeriesSlider
            category="on_the_air"
            title="On the Air"
            data={on_data}
          />
          <SeriesSlider
            category="top_rated"
            title="High Rated"
            data={top_data}
          />
          <SeriesSlider
            category="popular"
            title="Trending Now"
            data={pop_data}
          />
        </>
      )}
      <H.Footer>© Copyright 2022. Leesu All rights reserved.</H.Footer>
    </H.Wrapper>
  );
}

export default TvSeries;