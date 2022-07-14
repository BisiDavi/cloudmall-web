import Link from "next/link";
import { useQuery } from "react-query";

import useAddressRequest from "@/hooks/useAddressRequest";

export default function UpdateLocation() {
  const { getUserProfile } = useAddressRequest();
  const { data, status } = useQuery("getUserProfile", getUserProfile);

  const addresses = data?.data.user?.addresses;

  console.log("addresses-footer", addresses);
  const defaultAddress =
    status === "success"
      ? addresses?.filter((address: any) => address.isDefault)
      : [];

  console.log("defaultAddress", defaultAddress);

  return (
    <>
      <Link href="/update-address" passHref>
        <a>
          {status === "error"
            ? "error"
            : status === "loading"
            ? "loading"
            : defaultAddress.length > 0 && (
                <div className="updatelocation">
                  <span>{defaultAddress[0].type}</span>
                  <div>
                    <h3>{defaultAddress[0].address}</h3>
                  </div>
                </div>
              )}
        </a>
      </Link>
      <style jsx>
        {`
          .updatelocation {
            width: 100%;
            font-size: 12px;
            font-style: normal;
            line-height: 18px;
            padding: 0px;
            margin-top: 0px;
            margin-left: 0px;
          }
          .updatelocation span {
            font-weight: 600;
          }
          .updatelocation h3 {
            font-weight: 500;
            margin-right: 10px;
            font-size: 12px;
            line-height: 14px;
          }
          .updatelocation div {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
