import styled from "styled-components";

type NextButtonProps = {
  fetchQuote: () => void;
};

const NextButton = ({ fetchQuote }: NextButtonProps) => {
  return (
    <StyledWrapper>
      <button onClick={fetchQuote}>
        <svg
          className="filled"
          fill="#000000"
          width="38px"
          height="38px"
          viewBox="-8.5 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 24.781v-17.594l15.281 8.813z"></path>
        </svg>
        Next
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 14px 5px 2px;
    box-shadow: rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    background-color: #e8e8e8;
    border-color: #ffe2e2;
    border-style: solid;
    border-width: 9px;
    border-radius: 35px;
    font-size: 25px;
    cursor: pointer;
    font-weight: 900;
    color: rgb(134, 124, 124);
    font-family: monospace;
    transition: transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5),
      border-color 400ms ease-in-out, background-color 400ms ease-in-out;
    word-spacing: -2px;
  }

  @keyframes movingBorders {
    0% {
      border-color: #fce4e4;
    }

    50% {
      border-color: #ffd8d8;
    }

    90% {
      border-color: #fce4e4;
    }
  }

  button:hover {
    background-color: #eee;
    transform: scale(105%);
    animation: movingBorders 3s infinite;
  }

  button svg {
    margin-right: 11px;
    fill: rgb(255, 110, 110);
    transition: opacity 100ms ease-in-out;
  }

  @keyframes beatingHeart {
    0% {
      transform: scale(1);
    }

    15% {
      transform: scale(1.15);
    }

    30% {
      transform: scale(1);
    }

    45% {
      transform: scale(1.15);
    }

    60% {
      transform: scale(1);
    }
  }

  .filled {
    opacity: 1;
    animation: beatingHeart 1.2s infinite;
  }
`;

export default NextButton;
