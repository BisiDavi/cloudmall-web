import pills from "@/json/pills.json";
import Pill from "@/components/pills";

interface Props {
  storeType: "restaurant" | "store";
}

export default function RestaurantPillsGroup({ storeType }: Props) {
  const pillGroupClassname = storeType === "store" ? "gray" : "normal";
  return (
    <>
      <div className={`pill-group ${pillGroupClassname}`}>
        {pills[storeType].map((pill, index) => (
          <Pill key={index} text={pill} type={storeType} />
        ))}
      </div>
      <style jsx>
        {`
          .pill-group {
            display: flex;
            align-items: center;
            overflow-x: scroll;
          }
          .gray {
            background-color: var(--neutral-gray-2);
            padding: 10px 5px;
          }
        `}
      </style>
    </>
  );
}
