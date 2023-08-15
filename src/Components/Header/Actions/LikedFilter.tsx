import { styled } from "styled-components";

interface Props {
  filterLiked: boolean;
  onToggleFilterLiked: () => void;
}

export const LikedFilter = ({ filterLiked, onToggleFilterLiked }: Props) => (
  <StyledLikedFilter
    className={`btn flex items-center justify-center ${
      filterLiked && "active"
    }`}
    onClick={onToggleFilterLiked}
  >
    {filterLiked ? "Показати все" : "Показати тільки ті, що сподобалися"}
  </StyledLikedFilter>
);

const StyledLikedFilter = styled.div`
  padding: 9px 18px 9px;
  width: 310px;
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 1000px) {
    position: fixed;
    bottom: 13px;
    width: calc(100% - 30px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    padding: 14px 16px 12px 17px;
    border-radius: 9px;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.28);
    font-size: 15px;
    font-weight: 500;
    line-height: 118%;
    letter-spacing: 0.3px;
    height: max-content;
  }
`;
