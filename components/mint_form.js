import { useFormik } from "formik"
import Image from "next/image"
import { Contract } from "starknet"
import erc20abi from "../utils/erc20abi.json"
import { Button } from "flowbite-react"
import { useEffect, useMemo, useState } from "react"
import VaultManager from "./vault_manager"
import { bnToUint256 } from "starknet/dist/utils/uint256"

const erc20Addresses = {
  zeth: "0x04c83534Ce5A87e3C482d759c4112a509d708C80fF0F1B478bdA911Baab5d505",
  eth: "0x06636E9CF607ab04Fa718Dc3631e56253EE384ad7DD5A60e1bC2F59A5bAB34a8",
  dai: "0x0088595D636050F7DafA72cf297Af560306541f1Bd0aC14568B35CcC5D29107C",
  usdc: "0x04bAD03Eae13afE101BE8Af90C4E4f3934058604F9346E76B9d4E936C450aC67",
  zusd: "0x01838939E7b6C98b46a0a1aD0fcBEabaD7fc28364B1f5a7aB6eeDC48f6824326",
}

export default function MintForm({ account, callback }) {
  const [total, setTotal] = useState(0)
  const [price, setPrice] = useState(0)
  const contracts = {
    eth: new Contract(erc20abi, erc20Addresses.eth, account),
    dai: new Contract(erc20abi, erc20Addresses.dai, account),
    usdc: new Contract(erc20abi, erc20Addresses.usdc, account),
  }

  const formik = useFormik({
    initialValues: {
      usdc: 0.0,
      dai: 0.0,
      eth: 0.0,
    },

    onSubmit: (values) => {
      console.log(values)

      if (!account) {
        return
      }

      const m = (v) => v * Math.pow(10, 18)

      // VaultManager({ account }).createVault(
      //   [String(m(values["eth"])), "0"],
      //   [String(m(values["dai"])), "0"],
      //   [String(m(values["usdc"])), "0"],
      //   [String(m(total)), "0"]
      // )

      contracts["eth"].approve(account.address, [String(m(values["eth"])), "0"]).then((res) => {
        contracts["dai"].approve(account.address, [String(m(values["dai"])), "0"]).then((res) => {
          contracts["usdc"]
            .approve(account.address, [String(m(values["usdc"])), "0"])
            .then((res) => {
              VaultManager({ account })
                .createVault(
                  [String(m(values["eth"])), "0"],
                  [String(m(values["dai"])), "0"],
                  [String(m(values["usdc"])), "0"],
                  [String(m(total)), "0"]
                )
                .then((res) => {
                  callback()
                })
            })
        })
      })

      for (let token of Object.keys(values)) {
        console.log("Approving " + val + " " + token + " no " + contracts[token].address)
      }
    },
  })

  useEffect(() => {
    console.log(account)
  }, account)

  useEffect(() => {
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${usdcAddress}&vs_currencies=eth`
    fetch(url, { headers: { Origin: "http://localhost" } })
      .then((res) =>
        res.json().then((json) => {
          setPrice(1.0 / json[usdcAddress.toLowerCase()].eth)
        })
      )
      .catch((err) => {
        setPrice(1621)
        console.log(err)
      })
  })

  useEffect(() => {
    const t = formik.values.usdc + formik.values.dai + formik.values.eth * price
    setTotal(t / 3.0)
    callback({
      total: t,
      usdc: formik.values.usdc,
      dai: formik.values.dai,
      eth: formik.values.eth * price,
    })
  }, [formik.values])

  return (
    <form className="mt-5 space-y-8" onSubmit={formik.handleSubmit}>
      <div className="w-1x shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
        <label htmlFor="ETH" className="block text-sm font-medium text-gray-400">
          <Image src="/images/eth.svg" alt="ETH" width={30} height={30}></Image>
        </label>
        <div>ETH</div>
        <input
          id="eth"
          name="eth"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.eth}
          className="h-10 w-3/4 rounded text-cyan-400 bg-gray-900 text-2xl"
        />
      </div>
      <div className="place-content-center grid">
        <Image src="/images/plus.svg" alt="plus" width={20} height={20} />
      </div>

      <div className="shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
        <label className="block text-sm font-medium text-gray-400">
          <Image src="/images/dai.svg" alt="DAI" width={30} height={30}></Image>
        </label>
        <div>DAI</div>
        <input
          id="dai"
          name="dai"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.dai}
          className="h-10 w-3/4 rounded text-cyan-400 bg-gray-900 text-2xl"
        />
      </div>
      <div className="place-content-center grid">
        <Image src="/images/plus.svg" alt="plus" width={20} height={20} />
      </div>

      <div className="w-1x shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
        <label className="block text-sm font-medium text-gray-400">
          <Image src="/images/usdc.svg" alt="ETH" width={30} height={30}></Image>
        </label>
        <div>USDC</div>
        <input
          id="usdc"
          name="usdc"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.usdc}
          className="h-10 w-3/4 rounded text-cyan-400 bg-gray-900 text-2xl"
        />
      </div>

      <h3 className="bg-gray-800 rounded-lg h-10 align-middle">
        Total Colateral: {(total * 3).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </h3>
      <div className="place-content-center grid">
        <Image src="/images/down_arrow.svg" alt="arrow" width={20} height={20} />
      </div>
      <div>C-RATIO: 300%</div>
      <div className="w-1x shadow shadow-cyan-400 shadow-white rounded-lg flex flex-row space-x-2 p-4">
        <label className="block text-sm font-medium text-gray-400">
          <Image src="/images/usd.svg" alt="ETH" width={30} height={30}></Image>
        </label>
        <div>zUSD</div>
        <div className="text-2xl right-0 relative text-cyan-300">
          {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
      </div>

      <Button pill={true} className="w-1/2 " gradientMonochrome="cyan" type="submit">
        Mint
      </Button>
    </form>
  )
}
