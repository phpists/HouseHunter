import { styled } from "styled-components";
import icon from "../../assets/images/circle-check.svg";

export const Empty = () => (
  <StyledEmpty className="flex flex-col items-center justify-center">
    <img src={icon} alt="" />
    <div className="title">Більше нема</div>
    <div className="subtitle">
      Проте є інші квартири, які не пройшли через ваші фільтри
    </div>
  </StyledEmpty>
);

const StyledEmpty = styled.div`
  line-height: 118%;
  color: #fff;
  padding: 50px;
  font-family: "Overpass", sans-serif;
  img {
    margin-bottom: 11px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.32px;
    margin-bottom: 3px;
    height: 19px;
  }
  .subtitle {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.24px;
    opacity: 0.5;
  }
`;
