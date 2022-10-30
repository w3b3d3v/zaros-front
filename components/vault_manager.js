import VaultsManagerABI from "../utils/VaultsManager.json"
import { Contract } from "starknet"

export default function VaultManager({ account }) {
  return new Contract(
    VaultsManagerABI.abi,
    "0x0208722b1af4c9d0d9d51ce85864d2976b1ec322fb10d056f1c2b539cc109448",
    account
  )
}
