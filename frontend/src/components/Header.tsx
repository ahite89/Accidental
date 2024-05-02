import { MdInfoOutline } from "react-icons/md";
import Button from "./parameters/Button";
import { HeaderProps } from "../interfaces/header";

export default function Header({ handleOpenInfoBox }: HeaderProps) {
    return (
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between px-10 py-4">
            <p className="text-white text-2xl border-white border-2 border-solid p-2 rounded self-center">
                &#9838;ccidental
            </p>
            <Button onClick={handleOpenInfoBox}>
                <MdInfoOutline className="text-white text-4xl self-center" />
            </Button>
        </header>
    );
}