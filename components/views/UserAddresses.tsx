import { useQuery } from "react-query";

import Ripples from "@/components/loaders/Ripples";
import AddressList from "@/components/views/AddressList";
import useAddressRequest from "@/hooks/useAddressRequest";

type addressType = {
  _id: string;
  type: string;
  address: string;
};

export default function UserAddresses() {
  const { getUserProfile } = useAddressRequest();

  const { data, status } = useQuery("getUserProfile", () => getUserProfile());

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
