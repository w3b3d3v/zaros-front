import { useFormik } from "formik"
import Image from "next/image"
import { Contract } from "starknet"
import erc20abi from "../utils/erc20abi.json"
import { Button } from "flowbite-react"
import { useEffect, useMemo, useState } from "react"
import FormikObserver from "formik-observer"

const erc20Addresses = {
  eth: "0x078f6d0ca875b7e5a49a987fb96758a10c820fea21546568f66d3825aaf76f8f",
  dai: "0x02f5641f96940584d47d77e6126b8dfd055b277ada80723d0a4d926863d5cec8",
  usdc: "0x01ad533463afa8544cee30231bfebddd10f07a3c6bf9fdf6a315a25e7c375108",
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
      console.log(Object.keys(values))

      for (let token of Object.keys(values)) {
        const val = values[token] * Math.pow(10, 18)
        console.log("Approving " + val + " " + token + " no " + contracts[token].address)
        contracts[token].approve(account.address, [String(val), "0"])
      }
    },
  })

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
