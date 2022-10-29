import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import ConnectWallet from "./connect_wallet"
import { useState } from "react"

const networks = ["Starknet", "zkSync"]

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
      <nav
        className="relative flex items-center space-x-10 align-top sm:h-10 lg:justify-start"
        aria-label="Global"
      >
        <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <a href="#">
              <Image alt="Zaros" width={80} height={80} className="" src="/logo.svg" />
              <span className="sr-only">Zaros</span>
            </a>{" "}
            <h1 className="text-4xl">Zaros</h1>
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
    </Popover>
  )
}
