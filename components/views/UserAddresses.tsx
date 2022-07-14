import { useQuery } from "react-query";

import { getUserProfile } from "@/utils/userRequest";
import useBaseUrl from "@/hooks/useBaseUrl";
import { useAppSelector } from "@/hooks/useRedux";
import Ripples from "../loaders/Ripples";

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
        <div className="view">
          {addresses.map((address: addressType) => (
            <div className="user-address" key={address._id}>
              <h5>{address.type}</h5>
              <p>{address.address}</p>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .view p {
          margin: 0px 0px 10px 0px;
          font-size: 12px;
        }
        .view h5 {
          margin-bottom: 5px;
          color: var(--mall-blue);
        }
      `}</style>
    </>
  );
}
