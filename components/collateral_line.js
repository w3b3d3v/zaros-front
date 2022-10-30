import Image from "next/image"

export default function CollateralLine({ values, token }) {
  return (
    <div className="flex space-x-3">
      <label className="block text-sm font-medium text-gray-400">
        <Image src={"/images/" + token + ".svg"} alt={token} width={30} height={30}></Image>
      </label>
      <div>{token}</div>
      <div className="text-2xl right-0 relative text-cyan-300">
        {/* {values[token].toLocaleString(undefined, { maximumFractionDigits: 2 })} */}
      </div>
    </div>
  )
}
