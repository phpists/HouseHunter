import { styled } from "styled-components";
import { Title } from "./Title";
import { Location } from "./Location";
import { Doors } from "./Doors";
import { Divider } from "./Divider";
import { Expand } from "./Expand";
import { Box } from "./Box";
import { Stairs } from "./Stairs";
import { SectionTitle } from "./SectionTitle";
import { List } from "./List";
import { Descrioption } from "./Description";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Slider } from "./Slider/Slider";
import { Header } from "./Header";
import { Footer } from "../../Footer/Footer";
// const AMENITIES_DATA = [
//   { icon: dogIcon, title: "Можна з тваринами" },
//   { icon: washingMachineIcon, title: "Пральна машина є" },
//   { icon: wifiIcon, title: "Інтернет є" },
//   { icon: tvIcon, title: "Телевізор є" },
//   { icon: refrigeratorIcon, title: "Холодильник є" },
//   { icon: airVentIcon, title: "Кондиціонер є" },
//   { icon: sofaIcon, title: "Меблі є" },
//   { icon: dishwasherIcon, title: "Посудомийка є" },
// ];

// const SPECIFICATION_DATA = [
//   { icon: homeIcon, title: "Хрущьовка" },
//   { icon: flameIcon, title: "Центральне опалення" },
//   { icon: containerIcon, title: "Цегла" },
// ];

interface Props {
  type: string;
  price: number;
  currency: string;
  location: string;
  doors: number | string;
  area: number | string;
  stairs: string;
  box: number | string;
  title: string;
  description: string;
  index: number;
  onClose: () => void;
  images: string[];
  onChangeStatus: (value: string | null) => void;
  onSendRealtor: () => void;
  onPhotoView: () => void;
}

export const MoreInfo = ({
  type,
  price,
  currency,
  location,
  doors,
  area,
  stairs,
  box,
  title,
  description,
  index,
  onClose,
  images,
  onChangeStatus,
  onSendRealtor,
  onPhotoView,
}: Props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, []);

  const handleClose = () => {
    controls.start({ opacity: 0, y: 400 });
    setTimeout(onClose, 500);
  };

  return (
    <StyledMoreInfo
      index={index}
      initial={{ opacity: 0, y: 400 }}
      animate={controls}
      transition={{
        type: "linear",
        stiffness: 260,
        damping: 30,
      }}
    >
      <Header onClose={handleClose} price={price} currency={currency} />
      <div className="content-wrapper">
        <Slider images={images} type={type} onPhotoView={onPhotoView} />
        <div className="content-info">
          <Title title={title} />
          <div className="info-items">
            <Location location={location} />
          </div>
          <div className="flex items-center info-items ">
            <Doors doors={doors} />
            <Divider />
            <Expand area={area} />
            <Divider />
            <Box box={box} />
            <Divider />
            <Stairs stairs={stairs} />
          </div>
          {/* <SectionTitle title="Технічні характеристики" />
          <List data={SPECIFICATION_DATA} moreTitle="характеристики" /> */}
          <SectionTitle title="Опис" />
          <Descrioption text={description} />
          {/* <SectionTitle title="Зручності" />
          <List data={AMENITIES_DATA} moreTitle="зручності" /> */}
        </div>
      </div>
      <Footer onChangeStatus={onChangeStatus} onSendRealtor={onSendRealtor} />
    </StyledMoreInfo>
  );
};

interface StyledMoreInfoProps {
  index: number;
}

const StyledMoreInfo = styled(motion.div)<StyledMoreInfoProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  overflow: auto;
  z-index: ${({ index }) => 1 + index};
  color: #fff;
  background: #2c2c2c;
  padding: 7px 15px 13px;
  padding-top: 7px;
  ::-webkit-scrollbar {
    display: none;
  }
  .info-items {
    font-family: "Open Sans", sans-serif;
    font-size: 13px !important;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.26px;
  }
  img {
    height: 16px;
    margin-right: 6px;
  }
  .back-btn {
    position: fixed;
    top: 10px;
    left: 10px;
  }
  .content-wrapper {
    border-radius: 13px;
    background: #464646;
    height: calc(100vh - 220px);
    overflow: auto;
    margin-bottom: 15px;
    .content-info {
      padding: 14px;
    }
  }
`;
