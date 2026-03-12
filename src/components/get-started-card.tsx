
import { Search, } from "lucide-react"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "@base-ui/react"
import { Button } from "./ui/button"
import { useState } from "react"
import type { UseMutateFunction } from "@tanstack/react-query"
import { Spinner } from "./ui/spinner"
import { DisplayCard } from "./ui/display-card"

export function GetStarted({ getForecast, isFetchingForecast }: { getForecast: UseMutateFunction<any, Error, string, unknown>, isFetchingForecast: boolean }) {
    const [search, setSearch] = useState('')

    return (
        <DisplayCard>
            {/* Temperature & Condition */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-3xl font-bold tracking-tight text-foreground leading-none">
                        Get Started
                    </p>
                </div>
            </div>
            {/* Divider */}
            <div className="border-t border-border" />
            <form onSubmit={(e) => {
                e.preventDefault()
                getForecast(search)

            }}

            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Location</FieldLabel>
                        <Input required onChange={(e) => setSearch(e.target.value)} id="name" autoComplete="off" placeholder="Enter a location here..." className="outline-1 rounded-md p-2" />

                    </Field>
                    <Button
                        className="w-full max-w-sm"
                        type="submit"

                        disabled={isFetchingForecast}
                    >
                        Search
                        {isFetchingForecast ? <Spinner /> : <Search size={20} />}
                    </Button>
                </FieldGroup>
            </form>
        </DisplayCard>
    )
}

