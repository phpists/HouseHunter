import { styled } from "styled-components";
import { Profile } from "../../Profile/Profile";
import { CallButton } from "./CallButton";
import { Socmedia } from "./Socmedia";

interface Props {
  data: any;
  phonesCodes: any;
}

export const Realtor = ({ data, phonesCodes }: Props) => (
  <StyledRealtor className="flex items-center  w-full">
    <Profile rieltor={data?.owner} />
    <div className="btns flex items-center">
      <div className="flex items-center">
        {data?.owner?.phone[0]?.viber === "1" && (
          <Socmedia
            type="viber"
            phone={
              `${
                phonesCodes?.find(
                  (c: any) => c?.id === data?.owner?.phone[0]?.id_phone_code
                )?.code
              }${data?.owner?.phone[0]?.phone}` ?? ""
            }
          />
        )}
        {data?.owner?.phone[0]?.telegram === "1" && (
          <Socmedia
            type="telegram"
            phone={
              `${
                phonesCodes?.find(
                  (c: any) => c?.id === data?.owner?.phone[0]?.id_phone_code
                )?.code
              }${data?.owner?.phone[0]?.phone}` ?? ""
            }
          />
        )}
        <CallButton
          phone={
            `${
              phonesCodes?.find(
                (c: any) => c?.id === data?.owner?.phone[0]?.id_phone_code
              )?.code
            }${data?.owner?.phone[0]?.phone}` ?? ""
          }
        />
      </div>
    </div>
  </StyledRealtor>
);

const StyledRealtor = styled.div`
  /* justify-content: center; */
  .btns {
    width: max-content;
  }
  a {
    display: block;
    margin: 0 20px 0 0 !important;
  }

  button {
    margin: 0;
  }

  @media (max-width: 1000px) {
    justify-content: space-between;
    .btns {
      flex-direction: row-reverse;
      button {
        background: none;
        margin: 0;
      }
      a {
        margin: 0 0 0 20px !important;
      }
    }
  }
`;
