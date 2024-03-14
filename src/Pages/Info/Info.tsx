import { styled } from "styled-components";
import { MainInfo } from "./MainInfo/MainInfo";
import { SectionTitle } from "./SectionTitle";
import { AmenitiesList } from "./AmenitiesList";
// import dogIcon from "../../../assets/images/dog.svg";
// import washingMachineIcon from "../../../assets/images/washing machine.svg";
// import wifiIcon from "../../../assets/images/wifi.svg";
// import tvIcon from "../../../assets/images/tv.svg";
// import refrigeratorIcon from "../../../assets/images/refrigerator.svg";
// import airVentIcon from "../../../assets/images/air-vent.svg";
// import sofaIcon from "../../assets/images/sofa.svg";
// import dishwasherIcon from "../../assets/images/dishwasher.svg";
import { Descrioption } from "./Description";
import { Photos } from "./Photos/Photos";
import { useEffect } from "react";
import { rate } from "../../api/methods";
import { SelectionSwiper } from "../../Components/SelectionSwiper/SelectionSwiper";
import { useState } from "react";
import { PhotosView } from "./Photos/PhotosView/Photos";
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

interface Props {
  infoOpen: any;
  onClose: () => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  rieltor: { name: string; photo: string | undefined; phone: any };
}

export const Info = ({
  infoOpen,
  onClose,
  onSendRealtor,
  currency,
  onChangeCurrency,
  rieltor,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSwap = (
    index: number,
    direction: string,
    id: string,
    type: string
  ) => {
    if (infoOpen?.handleSwap) {
      infoOpen?.handleSwap(direction);
    } else {
      setLoading(true);
      rate(direction === "right" ? 1 : 0, id, type).then((code) => {
        setLoading(false);
        if (code === 0 && infoOpen.onChangeStatus) {
          infoOpen.onChangeStatus(direction === "right" ? 1 : 0);
        }
      });
    }
  };

  return (
    <>
      <PhotosView
        open={infoOpen}
        onClose={onClose}
        images={
          infoOpen?.img?.length > 0
            ? infoOpen?.img?.map((i: any) => i?.name)
            : []
        }
        defaultPhoto={1}
      />

      {/* <StyledInfo>
        <div className="desktop">
          <div>
            <Photos
              onClose={onClose}
              photos={
                infoOpen?.img?.length > 0
                  ? infoOpen?.img?.map((i: any) => i?.name)
                  : []
              }
            />
          </div>
          <MainInfo infoOpen={infoOpen} />
          <SectionTitle title="Зручності" />
          <AmenitiesList data={AMENITIES_DATA} />
          {infoOpen?.description?.length > 0 && (
            <>
              <SectionTitle title="Опис" />
              <Descrioption description={infoOpen?.description ?? ""} />
            </>
          )}
        </div>
      </StyledInfo>
      <SelectionSwiper
        cards={infoOpen ? [infoOpen] : []}
        onSwap={handleSwap}
        history
        onSendRealtor={onSendRealtor}
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        onClose={onClose}
        rieltor={rieltor}
        disabled={loading}
      /> */}
    </>
  );
};

const StyledInfo = styled.div`
  display: none;
  @media (min-width: 1000px) {
    max-width: 1400px;
    width: calc(100% - 13px);
    margin: 50px auto;
    display: block;
    z-index: 1000;
    padding-top: 50px;
  }
`;
