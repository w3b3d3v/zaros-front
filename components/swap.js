import { useFormik } from "formik"
import Image from "next/image"
import { Contract } from "starknet"
import erc20abi from "../utils/erc20abi.json"
import { Button } from "flowbite-react"
import OuterBox from "./outer_box"

export default function Swap() {
  const formik = useFormik({
    initialValues: {
      usd: 0.0,
      eth: 0.0,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <OuterBox>
      <h1 className="text-4xl flex font-bold space-x-2 tracking-tight text-gray-300">
        <span className="block xl:inline">Swap your</span>{" "}
        <span className="block text-cyan-400 xl:inline">tokens</span>
      </h1>
      <form className="mt-5 space-y-8" onSubmit={formik.handleSubmit}>
        <div className="shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
          <label htmlFor="ETH" className="block text-sm font-medium text-gray-400">
            <Image src="/images/eth.svg" alt="ETH" width={30} height={30}></Image>
          </label>
          <div>zETH</div>
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
          <Image src="/images/down_arrow.svg" alt="arrow" width={20} height={20} />
        </div>
        <div className="shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
          <label htmlFor="ETH" className="block text-sm font-medium text-gray-400">
            <Image src="/images/usd.svg" alt="ETH" width={30} height={30}></Image>
          </label>
          <div>zUSD</div>
          <input
            id="usd"
            name="usd"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.usd}
            className="h-10 w-3/4 rounded text-cyan-400 bg-gray-900 text-2xl"
          />
        </div>
        <Button pill={true} gradientMonochrome="cyan" type="submit">
          Swap
        </Button>
      </form>
    </OuterBox>
  )
}
