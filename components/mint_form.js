import { useFormik } from "formik"
import Image from "next/image"

export default function MintForm() {
  const formik = useFormik({
    initialValues: {
      usdc: 0.0,
      dai: 0.0,
      eth: 0.0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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
