import React from "react";
import tw from "tailwind-styled-components";

export default function Footer() {
  return (
    <Container>
      <FooterContainer>
        A limited NFT collection where the token itself doubles as your
        membership to a swamp
        <br /> club for apes. The club is open! Ape in with us.
      </FooterContainer>
    </Container>
  );
}

const Container = tw.div`
    flex justify-center mt-5
`;

const FooterContainer = tw.div`
    max-w-screen-lg w-full
`;
