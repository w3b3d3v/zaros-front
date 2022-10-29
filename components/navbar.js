import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import ConnectWallet from "./connect_wallet"
import { useState } from "react"

const networks = ["zkSync", "Starknet"]

const navigation = [
  { name: "Bridge", href: "#" },
  { name: "Swap", href: "#" },
  { name: "Mint", href: "#" },
  { name: "Manage Vaults", href: "#" },
]

export default function NavBar() {
  const [network, setNetwork] = useState(networks[0])
  return (
    <Popover>
      <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center space-x-10 align-top sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
            <div className="flex w-full items-center justify-between md:w-auto">
              <a href="#">
                <span className="sr-only">Zaros</span>
                <Image
                  alt="Zaros"
                  width={200}
                  height={50}
                  className="h-8 w-auto sm:h-10"
                  src="/logo.svg"
                />
              </a>{" "}
              Zaros
              <div className="-mr-2 flex items-center md:hidden"></div>
            </div>
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
          <ConnectWallet></ConnectWallet>
        </nav>
      </div>
    </Popover>
  )
}
