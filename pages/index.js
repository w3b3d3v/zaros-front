import { useState } from "react"
import NavBar from "../components/navbar"
import { Tabs } from "flowbite-react"
import Mint from "../components/mint"

export default function Index() {
  return (
    <div className="relative overflow-hidden dark">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 dark pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-12">
          <main className="mx-auto mt-10 space-y-8 max-w-7xl px-4 sm:mt-12 sm:px-12 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <NavBar></NavBar>
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item active={true} title="Mint">
                <Mint></Mint>
              </Tabs.Item>
              <Tabs.Item title="Bridge">Bridge content</Tabs.Item>
              <Tabs.Item title="Swap">Swap content</Tabs.Item>
              <Tabs.Item title="Manage Vault">Vault content</Tabs.Item>
            </Tabs.Group>
          </main>
        </div>
      </div>
    </div>
  )
}
