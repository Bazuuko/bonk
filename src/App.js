import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import background from "./styles/bg.png";
import styled from "styled-components";
import Accordion from './Accordion';
import styles from "./App.css"

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  letter-spacing: 2px;
  font-family: 'Saira', sans-serif;
  border-radius: 20px;
  border: none;
  background-color: #ff9a18;
  font-weight: bold;
  font-size: 30px;
  color: var(--accent-text);
  width: 350px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButton2 = styled.button`
  letter-spacing: 2px;
  font-family: 'Saira', sans-serif;
  border-radius: 15px;
  border: none;
  background-color: var(--bnb);
  font-weight: bold;
  font-size: 30px;
  color: var(--accent-text);
  padding: 20px;
  width: 200px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;


export const StyledRoundButton2 = styled.button`
  background: transparent;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
`;

export const StyledLogo = styled.img`
  width: 400px;
  transition: width 0.5s;
  transition: height 0.5s;
`;


export const StyledImg = styled.img`
  border-radius: 30px;
  width: 400px;
  @media (min-width: 2000px) {
    width: 600px;
  }
  transition: width 0.5s;
`;

export const StyledImgNav = styled.img`
  width: 10px;
`;

export const StyledImg2 = styled.img`
    width: 700px;
  @media (min-width: 2000px) {
    width: 1000px;
  }
  transition: width 0.5s;
`;

export const StyledImg3 = styled.img`
  width: 100%;
  transition: transform 1s;
  :hover {
    transform: translateZ(10px);
  }
`;

export const StyledImg4 = styled.img`
  width: 600px;
  transition: transform 1s;
  :hover {
  }
`;

export const StyledImg5 = styled.img`
  width: 600px;
  transition: transform 1s;
  :hover {

  }
`;
export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;




function App() {
  const accordionData = [
    {
      title: 'What is $BAPE?',
      content: `$BAPE is our official token minted directly from the LetsBonk.Fun system, which helps the ecosystem with buybacks in its native token $BONK, other tokens and mainly the possibility of obtaining creator fees (fees from the creator of the token) for the marketing of the project or buybacks of our token, among other things! `
    },

    {
      title: 'How to buy $BAPE?',
      content: `You can buy $BAPE on the official LetsBonk.Fun site with the official CA (https://letsbonk.fun/token/CAaAaAaAaAaAaAaAaAaA) until the bond curve is filled. After the token is bonded you will be able to buy directly from Jupiter with the token's CA.`
    },
    {
      title: 'What is LetsBonk?',
      content: `LetsBONK.fun is a community-driven memecoin launchpad on the Solana blockchain, launched on 2025, in partnership with Raydium Protocol. It enables users to create and deploy meme-based tokens effortlessly without coding expertise, integrating seamlessly with Raydium and Jupiter for instant DEX liquidity and trading. 
      Key features include a 1% swap fee and post-migration volume fees that fund platform development, BONK token buybacks/burns, and Solana ecosystem growth via validator support. This allows projects to have a default income mechanism that can be used for the well-being of the project.`
    },
     {
      title: 'How to mint?',
      content: `You can click on the mint button to be redirected to the official LaunchMyNFT page where you can mint your Bonk Ape. You should hurry because they will sell out quickly and you will have to get one on the secondary market!
      `
    },
    {
      title: 'How many Bonk Apes are and how much is the mint price?',
      content: `
      777 Bonk Apes with a mint price of 0.18 SOL each. 
            Every Bonk Ape has distinctive attributes, which are determined by a rarity system.`
    },
    {
      title: "I've already minted... now what?",
      content: `Welcome to our community! now you are part of the world of the Bonk Apes on the Bonk eco! As a holder you will have access to the staking of our $BAPE token. Rarity will determinate your yield. Stay tuned!`
    },
    
  ];
  const dispatch = useDispatch();
  const ref = useRef(null);
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [isActive, setIsActive] = useState(false);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`How many Apes you want to mint?`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = 15000000000000000;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    let totalCostWeiNum = cost * mintAmount
    let trueCost = BigInt(totalCostWeiNum).toString();
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: trueCost,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Something went wrong. Try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Congratulations! You minted ${mintAmount} ${CONFIG.NFT_NAME}!`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);


  const handleFaq = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleTwitter = () => {
    window.open(
      'https://twitter.com/bonk_apes',
      '_blank'
    );
  };

  const handleTelegram = () => {
    window.open(
      'https://letsbonk.fun/token/6n42GS5QPF1aFnB8BYBgJ6SwNFTgPTxKgLtB9XcSbonk',
      '_blank'
    );
  };

   const handleLaunch = () => {
    window.open(
      'https://launchmynft.io/collections/GgtmjSeJjp4dnxGmyq9fyKdAxdVWX5GzGUeEW8NZzyB2/39WwrbsdJgVGgkYj8GDn',
      '_blank'
    );
  };



  return (
    <s.Screen>
      <s.Container
        ai={"center"}>

        <div className="nav" style={{display:"flex"}}>
          <div className="logo" style={{marginTop: "30px", marginLeft:"0px"}}>
          <StyledLogo
              src={"/config/images/logofinal.png"}/>
          </div>
          
          <div className="bar" style={{display:"flex", marginLeft: "100px"}}>

          <div className="option2" style={{marginLeft:"200px"}} onClick={handleLaunch}>
          <s.TextNav
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              letterSpacing: 4,
              color: "var(--accent)",
              marginTop: "80px",
              cursor: "pointer"
              }}
            >
              MINT
       </s.TextNav>
          </div>

          <div className="option2" style={{marginLeft:"80px"}}>
          <s.TextNav
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              letterSpacing: 4,
              color: "var(--accent)",
              marginTop: "80px",
              cursor: "pointer"
              }}
            >
              STAKING
       </s.TextNav>
          </div>

          <div className="option3" style={{marginLeft:"80px"}} onClick={handleFaq} >
          <s.TextNav
            style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                letterSpacing: 4,
                color: "var(--accent)",
                marginTop: "80px",
                cursor: "pointer",
                
              }}
            >
              FAQ
       </s.TextNav>
          </div>

          

          <div className="option3" style={{marginLeft:"70px", marginTop: "80px"}} onClick={handleTwitter} >
          <StyledImgNav
        src={"/config/images/x.png"}
        style={{
          width: "50px",
          cursor: "pointer",
        }}
        />
          </div>
          <div className="option3" style={{marginLeft:"30px", marginTop: "75px"}} onClick={handleTelegram} >
          <StyledImgNav
        src={"/config/images/bonkfun.png"}
        style={{
          width: "60px",
          cursor: "pointer",
        }}
        
        />
          </div>
          </div>  
       </div>

       <s.SpacerLargeX />

<div className="menu1" style={{display:"flex", marginTop:"-40px"}}>

<StyledImg
        src={"/config/images/monos1.png"}
        style={{
          marginLeft: "80px"
        }}
        />

    <s.TextTitle 
       style={{
          fontSize: 50,
          fontWeight: "bold",
          textAlign: "center",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "60px"
       }}>
          The <b>Bonk Apes</b> arrived to the <c><b>Bonk</b> Ecosystem</c>
        </s.TextTitle>

<StyledImg
        src={"/config/images/monos2.png"}
        style={{
          marginRight: "80px"
        }}
        />

</div>

<s.TextTitle 
       style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginTop:"-60px",
       }}>
          CA:
        </s.TextTitle>
        <s.TextTitle 
       style={{
          fontSize: 30,
          fontWeight: "300",
          textAlign: "center",
          marginTop:"0px",
          fontStyle:"italic",
       }}>
          6n42GS5QPF1aFnB8BYBgJ6SwNFTgPTxKgLtB9XcSbonk
        </s.TextTitle>


<s.SpacerLarge />
<div class="separator">
  <div class="marquee">
    <div class="marquee-content">
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
    </div>
    
  </div>
</div>

<s.SpacerLargeXX />




<div className="grid" style={{marginLeft:"0px"}}>
<s.TextTitle 
      style={{
        fontSize: 60,
        textAlign: "center",
        letterSpacing: 10,
        fontWeight: 1000,
      }}
      >
    
      </s.TextTitle>
      <s.SpacerLarge />
<StyledImg2
        src={"/config/images/grid1.png"}
        style={{
          marginLeft: "0px"
        }}
        />

<StyledImg2
        src={"/config/images/grid2.png"}
        style={{
          marginLeft: "18px"
        }}
        />


</div>

<s.SpacerLargeXX />


<div className="info" display={"flex"} ai={"center"}>
<s.TextTitle 
      style={{
        fontSize: 60,
        textAlign: "center",
        letterSpacing: 5
      }}
      >
        Welcome to the <d>Bonk</d> Apes project
      </s.TextTitle>
      <s.SpacerLargeX />
      <s.TextSubTitle
        style={{
          fontSize: 28,
          textAlign: "center",
          marginRight:"250px",
          marginLeft:"250px",
        }}>
          777 <d>Bonk</d> Apes are now live on the Solana network and the Bonk ecosystem. The project to aims bring the original Bored Ape vibe into <d>Bonk</d> and into its mechanics.
          Taking advantage of the resurgence of interest on NFTs and the creation of an official token through Lets<d>Bonk</d>.Fun (which also helps the growth of tokens in its ecosystem in addition to creator fees!) and it will represent the main token of our community. $BAPE will be issued through our future staking system, in which you can stake your <d>Bonk</d> Apes and obtain yield<br></br>
          <br></br>
          The official contract of our token is only the following: 6n42GS5QPF1aFnB8BYBgJ6SwNFTgPTxKgLtB9XcSbonk<br></br><br></br>
          
          70% of the mint revenue will be used for buyback of our $BAPE token, 20% on marketing, 5% on BONK buyback and 5% for our dev.<br></br>


        </s.TextSubTitle>
<s.SpacerLargeXX />
<div className="pic" style={{display:"flex"}}>

  <StyledImg4
        style={{
          textAlign: "center",
          display:"flex",
          marginLeft:"150px",
        }}

        src={"/config/images/bonkguy.png"}
        />
<StyledImg5
        style={{
          textAlign: "center",
          display:"flex",
          marginLeft:"50px",
        }}

        src={"/config/images/buyback.png"}
        />
</div>
</div>

<s.SpacerLargeXX />
<div class="separator">
  <div class="marquee">
    <div class="marquee-content">
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk Apes</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">$BAPE</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Bonk!</div>
      <img src="/config/images/dot.png" class="dot" />
      <div class="item">Get Bonked</div>
      <img src="/config/images/dot.png" class="dot" />
    </div>
    
  </div>
</div>

<s.SpacerLargeXX />
<div class="accordion" ref={ref}>

{accordionData.map(({ title, content }) => (
  <Accordion title={title} content={content} />
))}

</div>

<s.SpacerLargeXX/>
</s.Container>
     
    </s.Screen>
  );
}

export default App;
