import { useAccount, useConnectors } from "@starknet-react/core"

export default function ConnectWallet() {
  const { connectors, connect, disconnect } = useConnectors()
  const { account, address, status } = useAccount()
  const argentX = (c) => {
    return c.filter((x) => x.id() === "argentX")[0]
  }

  return (
    <div className="rounded-md w-100 right-0">
      {status === "connected" && (
        <div className="w-1/2">
          <p className="truncate">Account: {address}</p>
          <a
            key={argentX(connectors).id()}
            onClick={() => disconnect(argentX(connectors))}
            href="#"
            className="bg-gradient-to-r flex w-full items-center justify-center rounded-full border border-transparent px-8 py-3 text-base font-medium text-white from-cyan-400 to-cyan-700 bg-cyan-400 hover:bg-cyan-700 md:py-4 md:px-10 md:text-lg"
          >
            Disconnect
          </a>
        </div>
      )}

      {status !== "connected" && (
        <a
          key={argentX(connectors).id()}
          onClick={() => connect(argentX(connectors))}
          disabled={!argentX(connectors).available()}
          href="#"
          className="bg-gradient-to-r flex w-full items-center justify-center rounded-full border border-transparent px-8 py-3 text-base font-medium text-white from-cyan-400 to-cyan-700 bg-cyan-400 hover:bg-cyan-700 md:py-4 md:px-10 md:text-lg"
        >
          Connect Wallet
        </a>
      )}
    </div>
  )
}
