import MintForm from "../components/mint_form"
import { useAccount } from "@starknet-react/core"

export default function Mint() {
  const { account } = useAccount()
  return (
    <div className="sm:text-center lg:text-left shadow shadow-white rounded-lg p-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-300">
        <span className="block xl:inline">Select your vault</span>{" "}
        <span className="block text-indigo-600 xl:inline">composition</span>
      </h1>
      {/* <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </p> */}
      <MintForm account={account}></MintForm>
    </div>
  )
}
