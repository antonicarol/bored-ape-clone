import React from "react";
import tw from "tailwind-styled-components";
import logo from "../assets/logo.webp";
import Image from "next/image";

export default function Header() {
  return (
    <Container>
      <HeaderContainer>
        <Image src={logo} alt="Website Logo" width={300} height={70} />
      </HeaderContainer>
    </Container>
  );
}

const Container = tw.div`
  w-full flex justify-center
`;

const HeaderContainer = tw.div`
`;
