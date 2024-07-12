import { SelectionSwiper } from "../../Components/SelectionSwiper/SelectionSwiper";
import { NewSelectionDesktop } from "./NewSelectionDesktop/NewSelectionDesktop";
import { useState } from "react";
import { Spinner } from "../../Components/Spinner";

interface Props {
  onOpenInfo: (card: any) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  appendObjectToList: any;
  objects?: any;
  phonesCodes: any;
}

export const NewSelections = ({
  onOpenInfo,
  onSendRealtor,
  currency,
  onChangeCurrency,
  appendObjectToList,
  objects,
  phonesCodes,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [rating, setRating] = useState<boolean>(false);
  const [removed, setRemoved] = useState<any[]>([]);
  const [activeCard, setActiveCard] = useState(0);

  const handleChangeActiveCard = (prev?: boolean) => {
    const totalCards = objects?.length ?? 0;
    const updatedActiveCard = prev
      ? activeCard === 0
        ? totalCards - 1
        : activeCard - 1
      : activeCard === totalCards - 1
      ? 0
      : activeCard + 1;
    setActiveCard(updatedActiveCard);
  };

  return (
    <>
      {loading ? (
        <Spinner className="empty-title" />
      ) : (
        <>
          <NewSelectionDesktop
            cards={[objects?.[activeCard]]}
            onOpenInfo={onOpenInfo}
            onSendRealtor={onSendRealtor}
            onSwap={(index, direction, id, type) => null}
            removed={removed}
            rating={false}
            loadingMore={loadingMore}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            phonesCodes={phonesCodes}
            onNavigate={handleChangeActiveCard}
            cardsCount={objects?.length ?? 0}
          />
          <SelectionSwiper
            cards={[objects?.[activeCard]]}
            onSwap={() => null}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            disabled={loading || rating}
            phonesCodes={phonesCodes}
            onNavigate={
              objects?.length > 1 ? handleChangeActiveCard : undefined
            }
          />
        </>
      )}
    </>
  );
};
