import { useState } from "react"
import MintForm from "../components/mint_form"
import NavBar from "../components/navbar"

const networks = ["zkSync", "Starknet"]

export default function Index() {
  const [network, setNetwork] = useState(networks[0])
  const [usdc, setUsdc] = useState(0)
  const [eth, setEth] = useState(0)
  const [dai, setDai] = useState(0)

  return (
    <div className="relative overflow-hidden dark">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 dark pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-12">
          <main className="mx-auto mt-10 space-y-8 max-w-7xl px-4 sm:mt-12 sm:px-12 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <NavBar></NavBar>
            <div className="mt-5 sm:mt-8 space-x-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Connect Wallet
                </a>
              </div>
              <select
                className="px-4 py-3 rounded-full w-60 text-black"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                {networks.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:text-center lg:text-left shadow shadow-white rounded-lg p-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-300">
                <span className="block xl:inline">Select your vault</span>{" "}
                <span className="block text-indigo-600 xl:inline">composition</span>
              </h1>
              {/* <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </p> */}
              <MintForm></MintForm>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
