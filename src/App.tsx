
import { Sun } from "lucide-react"
import { GetStartedForm } from "./components/get-started-card"
import { useState } from "react"

export function App() {
  const [selectedZip, setSelectedZip] = useState<number | null>(null)
  console.log({ selectedZip })
  return (
    <div className="flex flex-col min-h-svh p-6">
      <div className="flex space-x-2 pb-6">
        <h1 className="font-medium">Weather Up</h1>
        <Sun />
      </div>
      <div className="flex justify-center w-full">
        <GetStartedForm
          className="w-full sm:max-w-[50%]"
          selectedZip={selectedZip}
          setSelectedZip={setSelectedZip}
        />
      </div>
    </div>
  )
}

export default App
