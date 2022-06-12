import Button from "../buttons";
import Input from "../forms/FormElements/Input";

const inputValue = {
  id: "autocomplete",
  label: "Enter your Address",
  name: "user-address",
  placeholder: "9, Omole Estate behind Mayfair, Ile-Ife",
  type: "text",
};

export default function AutocompleteView() {
  return (
    <>
      <div className="autocomplete">
        <Input input={inputValue} />
        <Button text="Confirm Address" className="itemButton autocomplete" />
      </div>
      <style jsx>
        {`
          .autocomplete {
            padding: 15px 30px;
            display: flex;
            flex-direction: column;
            height: 28vh;
          }
        `}
      </style>
    </>
  );
}
