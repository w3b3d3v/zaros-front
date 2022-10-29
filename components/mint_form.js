import { useFormik } from "formik"
import Image from "next/image"
import { Contract } from "starknet"
import erc20abi from "../utils/erc20abi.json"

const erc20Addresses = {
  eth: "0x049d36570d4e46f48e99674Bd3fcC84644dDD6B96F7C741b1562b82F9E004dc7",
  dai: "0x03e85bfBB8E2a42b7beaD9e88E9A1B19DbCCf661471061807292120462396ec9",
  usdc: "0x005A643907b9A4BC6A55E9069C4fD5fd1f5c79A22470690F75556C4736e34,426",
}

export default function MintForm({ account }) {
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

  return (
    <form className="mt-5 space-y-8" onSubmit={formik.handleSubmit}>
      <div className="shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
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
          className="h-10 w-3/4 rounded text-pink-500"
        />
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
          className="h-10 w-3/4 rounded text-pink-500"
        />
      </div>

      <div className="shadow shadow-white rounded-lg flex flex-row space-x-2 p-4">
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
          className="h-10 w-3/4 rounded text-pink-500"
        />
      </div>
      <button type="submit">Mint</button>
    </form>
  )
}
