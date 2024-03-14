import { styled } from "styled-components";
import { Location } from "./Location";
import { Divider } from "./Divider";
import { Doors } from "./Doors";
import { Expand } from "./Expand";
import { Title } from "./Title";
import { SlideCount } from "../SlideCount";

interface Props {
  location: string;
  title?: string;
  doors: number | string;
  area: number | string;
  isScrolled: boolean;
  currentSlide: number;
  totalSlides: number;
}

export const MainInfo = ({
  title,
  location,
  doors,
  area,
  isScrolled,
  currentSlide,
  totalSlides,
}: Props) => (
  <StyledMainInfo className={`maininfo ${isScrolled && "scrolled"}`}>
    {totalSlides > 0 ? (
      <SlideCount total={totalSlides} currentSlide={currentSlide} />
    ) : null}
    <div className="flex items-center items justify-between">
      <Location location={location} />
      <div className="main-tags flex items-center">
        <Divider />
        <Doors doors={doors} />
        <Divider />
        <Expand area={area} />
      </div>
    </div>
    <Title title={title ?? ""} />
  </StyledMainInfo>
);

const StyledMainInfo = styled.div`
  position: absolute;
  padding: 0 15px 13px;
  bottom: 0;
  left: 0;
  z-index: 500;
  transition: all 0.3s;
  width: 100%;

  &.scrolled {
    opacity: 0 !important;
  }
  .items {
    font-family: Open Sans;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.26px;
    padding-bottom: 12px;
    img {
      height: 16px;
      margin-right: 6px !important;
    }
  }
  .main-tags {
    flex-shrink: 0;
  }
`;
