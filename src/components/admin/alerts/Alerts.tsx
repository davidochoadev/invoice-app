import { SmallClose } from "../Icon/Icons";

type Alert = {
   text: string,
   showAlert: React.Dispatch<React.SetStateAction<boolean>>;
 };

const WarningAlert = (props:Alert) => {
   return (
      <div className="bg-red-500 w-full text-white shadow-md flex flex-row justify-center items-center px-4 py-2">
         <p className="grow text-center text-white">{props.text}</p>
         <button onClick={() => props.showAlert(false)}>
            <SmallClose />
         </button>
      </div>
   )
}

export { WarningAlert };