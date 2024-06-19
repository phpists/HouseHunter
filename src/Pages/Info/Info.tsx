import { styled } from "styled-components";
import { MainInfo } from "./MainInfo/MainInfo";
import { SectionTitle } from "./SectionTitle";
import { AmenitiesList } from "./AmenitiesList";
import { Descrioption } from "./Description";
import { Photos } from "./Photos/Photos";
import { useEffect } from "react";
import { rate } from "../../api/methods";
import { SelectionSwiper } from "../../Components/SelectionSwiper/SelectionSwiper";
import { useState } from "react";
import { PhotosView } from "./Photos/PhotosView/Photos";
import { Card } from "../NewSelections/NewSelectionDesktop/Card/Card";
import { BackButton } from "../../Components/BackButton";

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
  const [openPhoto, setOpenPhoto] = useState(false);
  const [status, setStatus] = useState<any>(undefined);

  useEffect(() => {
    setStatus(infoOpen?.status);
  }, [infoOpen]);

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
      infoOpen?.handleSwap(direction, () => setStatus(direction === "right"));
    } else {
      setLoading(true);
      rate(direction === "right" ? 1 : 0, id, type).then((code) => {
        setLoading(false);
        setStatus(direction === "right");
        if (code === 0 && infoOpen.onChangeStatus) {
          infoOpen.onChangeStatus(direction === "right" ? 1 : 0);
        }
      });
    }
  };

  return (
    <>
      {infoOpen?.history ? (
        <>
          <StyledInfo>
            <div className="desktop">
              <BackButton onClick={onClose} classes="back-btn" />
              <Card
                data={infoOpen}
                currency={currency}
                onChangeCurrency={onChangeCurrency}
                showLike={status !== undefined}
                status={status}
              />
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
            disabled={loading}
          />
        </>
      ) : (
        <PhotosView
          open={infoOpen}
          onClose={onClose}
          images={
            infoOpen?.img?.length > 0
              ? infoOpen?.img?.map((i: any) => i?.name)
              : []
          }
          defaultPhoto={1}
          preview
        />
      )}
    </>
  );
};

const StyledInfo = styled.div`
  display: none;
  position: relative;
  @media (min-width: 1000px) {
    max-width: 1400px;
    width: calc(100% - 13px);
    margin: 50px auto;
    display: block;
    z-index: 1000;
    padding-top: 50px;
  }
  .back-btn {
    position: absolute;
    top: 79px;
    left: 10px;
    z-index: 100;
  }
`;
