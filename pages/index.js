import { useState } from "react"
import NavBar from "../components/navbar"
import { Tabs } from "flowbite-react"
import Mint from "../components/mint"
import Swap from "../components/swap"
import Vault from "../components/vault"
export default function Index() {
  const [mintValues, setMintValues] = useState({})
  return (
    <div className="relative overflow-hidden dark">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 dark pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-12">
          <main className="mx-auto mt-10 space-y-8 max-w-7xl px-4 sm:px-12 lg:px-8">
            <NavBar></NavBar>
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item active={true} title="Mint">
                <Mint callback={setMintValues}>
                  <Vault values={mintValues}></Vault>
                </Mint>
              </Tabs.Item>
              <Tabs.Item title="Bridge">Bridge content</Tabs.Item>
              <Tabs.Item title="Swap">
                <Swap></Swap>
              </Tabs.Item>
              <Tabs.Item title="Manage Vault">
                <Vault values={mintValues}></Vault>
              </Tabs.Item>
            </Tabs.Group>
          </main>
        </div>
      </div>
    </div>
  )
}
