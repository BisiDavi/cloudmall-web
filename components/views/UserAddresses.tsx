import { useQuery } from "react-query";

import { getUserProfile } from "@/utils/userRequest";
import useBaseUrl from "@/hooks/useBaseUrl";
import { useAppSelector } from "@/hooks/useRedux";
import Ripples from "../loaders/Ripples";
import AddressList from "./AddressList";

type addressType = {
  _id: string;
  type: string;
  address: string;
};

export default function UserAddresses() {
  const { user }: any = useAppSelector((state) => state.user);
  const [baseUrl] = useBaseUrl();

  const { data, status } = useQuery(
    "getUserProfile",
    () => getUserProfile(baseUrl, user?._id),
    {
      enabled: !!baseUrl,
    }
  );

  const addresses = data?.data.user?.addresses;
  return (
    <>
      {status === "error" ? (
        "an error occured"
      ) : status === "loading" ? (
        <div className="loading">
          <Ripples centerRipple />
        </div>
      ) : (
        <>
          {addresses.map((address: addressType) => (
            <AddressList address={address} key={address._id} />
          ))}
        </>
      )}
      <style jsx>{`
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
