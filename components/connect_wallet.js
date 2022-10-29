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
        <div>
          <p className="truncate">Account: {address}</p>
          <a
            key={argentX(connectors).id()}
            onClick={() => disconnect(argentX(connectors))}
            href="#"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
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
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
        >
          Connect Wallet
        </a>
      )}
    </div>
  )
}
