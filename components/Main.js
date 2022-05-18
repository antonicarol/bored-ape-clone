import React from "react";
import tw from "tailwind-styled-components";
import MintingBox from "./MintingBox";

export default function Main() {
  return (
    <Container>
      <VideoContainer>
        <Video src="./video.mp4" muted={true} autoPlay={true} loop={true} />
      </VideoContainer>
      <MintingBox />
    </Container>
  );
}

const Container = tw.div`
    flex flex-col items-center w-full
`;

const VideoContainer = tw.div`
  max-w-screen-lg
`;

const Video = tw.video`
`;
