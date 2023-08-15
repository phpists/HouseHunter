import { styled } from "styled-components";

interface Props {
  description?: string;
}

export const Descrioption = ({ description }: Props) => (
  <StyledDescrioption>
    {description
      ? `${description.substring(0, 70)}${
          description?.length > 70 ? "..." : ""
        }`
      : ""}
  </StyledDescrioption>
);
const StyledDescrioption = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin: 15px 0;
  opacity: 0.4;
`;
