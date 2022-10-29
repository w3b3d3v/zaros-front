import MintForm from "../components/mint_form"
import { useAccount } from "@starknet-react/core"
import OuterBox from "./outer_box"

export default function Mint({ children, callback }) {
  const { account } = useAccount()
  return (
    <OuterBox>
      <h1 className="text-4xl flex font-bold space-x-2 tracking-tight text-gray-300">
        <span className="block xl:inline">Select your vault </span>{" "}
        <span className="block text-cyan-400 xl:inline">composition</span>
      </h1>
      {/* <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </p> */}
      <MintForm account={account} callback={callback}></MintForm>
      {children}
    </OuterBox>
  )
}
