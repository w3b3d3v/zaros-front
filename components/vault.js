import Image from "next/image"
import OuterBox from "./outer_box"
import { Button } from "flowbite-react"
import CollateralLine from "./collateral_line"
import VaultManager from "./vault_manager"
import { useAccount } from "@starknet-react/core"
import { useEffect, useState } from "react"
import { uint256ToBN } from "starknet/dist/utils/uint256"

export default function Vault({ children, values }) {
  const { account } = useAccount()
  const [readValues, setReadValues] = useState({})

  useEffect(() => {
    if (!account) {
      return
    }
    VaultManager({ account })
      .readVault(account.address)
      .then((res) => {
        console.log(res[0])
        setReadValues({
          dai: uint256ToBN(res[0].dai_ammount),
          usdc: uint256ToBN(res[0].usdc_ammount),
          eth: uint256ToBN(res[0].eth_ammount),
        })
      })
  }, [account])

  useEffect(() => {
    console.log(readValues)
  }, [readValues])
  return (
    <OuterBox>
      <div className="grid space-y-10">
        <div className="w-auto shadow shadow-white place-content-center grid rounded-lg space-y-5 space-x-2 p-4">
          <h1 className="text-2xl flex font-bold space-x-2 tracking-tight text-gray-300">
            <span className="block xl:inline">Accumulated Fees</span>{" "}
          </h1>

          <div className="flex space-x-3">
            <label className="block text-sm font-medium text-gray-400">
              <Image src="/images/usd.svg" alt="ETH" width={30} height={30}></Image>
            </label>
            <div>zUSD</div>
            <div className="text-2xl right-0 relative text-cyan-300">
              {Number(123.2).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <Button pill={true} className="" gradientMonochrome="cyan" type="submit">
            Claim Fees
          </Button>
        </div>

        <div className="w-auto shadow shadow-white place-content-center grid rounded-lg space-y-5 space-x-2 p-4">
          <h1 className="text-2xl flex font-bold space-x-2 tracking-tight text-gray-300">
            <span className="block xl:inline">Collateral Ratio</span>{" "}
          </h1>

          <CollateralLine values={values} token="eth" />
          <CollateralLine values={values} token="usdc" />
          <CollateralLine values={values} token="dai" />

          <div className="flex space-x-3">{children}</div>
        </div>
      </div>
    </OuterBox>
  )
}
