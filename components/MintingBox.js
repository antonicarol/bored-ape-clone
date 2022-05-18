import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useEditionDrop,
} from "@thirdweb-dev/react";
import ReactLoading from "react-loading";

export default function MintingBox() {
  const [loading, setLoading] = useState(false);
  const [completedMinting, setCompletedMinting] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const editionDrop = useEditionDrop(
    "0x2D65Dd6a6Ae354F5Cc994a910494803367e021ef"
  );

  const viewOpensea = () => {
    const url =
      "https://testnets.opensea.io/collection/bored-ape-clone-fgk6nndoga";
    window.open(url, "_blank");
    startOver();
  };

  const startOver = () => {
    setCompletedMinting(false);
    setLoading(false);
    disconnectWallet();
  };

  const mintNft = async () => {
    try {
      if (editionDrop && address) {
        setLoading(true);
        const tx = await editionDrop.claimTo(address, 0, 1);
        const receipt = tx.receipt; // the transaction receipt
        const claimedTokenId = tx.id; // the id of the NFT claimed
        console.log(tx);
        setLoading(false);
        setCompletedMinting(true);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTotal = async () => {
      if (editionDrop) {
        const total = await editionDrop.totalSupply(0);
        setTotalMinted(total.toNumber());
      }
    };
    getTotal();
  }, [editionDrop]);
  return (
    <Container>
      <MintSection>
        <TitleContainer>
          <Title>
            Welcome to
            <br /> the Bored Ape
            <br /> Yatch Club
          </Title>
          <Count>{address && `${totalMinted} of 100 minted!`}</Count>
        </TitleContainer>
        <ButtonContainer>
          {address ? (
            <>
              {completedMinting ? (
                <FilledButton onClick={viewOpensea}>View Opensea</FilledButton>
              ) : (
                <FilledButton disabled={loading} onClick={mintNft}>
                  {loading ? (
                    <ReactLoading type={"bars"} color={"#00000"} height={32} />
                  ) : (
                    "Mint"
                  )}
                </FilledButton>
              )}

              <OutlinedButton disabled={loading} onClick={disconnectWallet}>
                Disconnect
              </OutlinedButton>
            </>
          ) : (
            <FilledButton onClick={connectWithMetamask}>
              Connect Wallet
            </FilledButton>
          )}
        </ButtonContainer>
      </MintSection>
    </Container>
  );
}

const Container = tw.div`
    z-10 max-w-screen-lg   w-full
`;

const ButtonContainer = tw.div`
     flex items-center w-full gap-4
`;

const TitleContainer = tw.div`
    flex flex-col italic  my-2
`;

const Count = tw.div``;

const Title = tw.h2`
  uppercase text-3xl italic font-bold
`;

const FilledButton = tw.button`
 flex items-center justify-center flex-1  grow uppercase cursor-pointer bg-[#BFC500] hover:bg-gray-300 text-black font-bold py-2 px-4 rounded
`;

const OutlinedButton = tw(FilledButton)`
 bg-black text-[#BFC500] border-[#BFC500] border-2 hover:bg-[#BFC500] hover:text-black
`;

const MintSection = tw.div`
  max-w-screen-sm bg-black mt-[-200px] w-1/3 z-50 flex flex-col pb-4 pr-3
`;
