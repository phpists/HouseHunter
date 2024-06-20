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
  object?: any;
  phonesCodes: any;
}

export const NewSelections = ({
  onOpenInfo,
  onSendRealtor,
  currency,
  onChangeCurrency,
  appendObjectToList,
  object,
  phonesCodes,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [rating, setRating] = useState<boolean>(false);
  const [removed, setRemoved] = useState<any[]>([]);
  return (
    <>
      {loading ? (
        <Spinner className="empty-title" />
      ) : (
        <>
          <NewSelectionDesktop
            cards={[object]}
            onOpenInfo={onOpenInfo}
            onSendRealtor={onSendRealtor}
            onSwap={(index, direction, id, type) => null}
            removed={removed}
            rating={false}
            loadingMore={loadingMore}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            phonesCodes={phonesCodes}
          />
          <SelectionSwiper
            cards={[object]}
            onSwap={() => null}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            disabled={loading || rating}
            phonesCodes={phonesCodes}
          />
        </>
      )}
    </>
  );
};
