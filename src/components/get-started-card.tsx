
import { Search, } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "./ui/field"
import { Input } from "@base-ui/react"
import { Button } from "./ui/button"
import { useState } from "react"
import type { UseMutateFunction } from "@tanstack/react-query"
import { Spinner } from "./ui/spinner"

export function GetStarted({ getForecast, isFetchingForecast }: { getForecast: UseMutateFunction<any, Error, string, unknown>, isFetchingForecast: boolean }) {
    const [search, setSearch] = useState('')

    return (
        <Card className="w-full max-w-sm rounded-3xl border-border shadow-sm bg-card mb-6">
            <CardContent className="p-8 space-y-6">
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
                    className="gap-2 flex flex-col"
                >
                    <Field>
                        <FieldLabel htmlFor="name">Location</FieldLabel>
                        <Input onChange={(e) => setSearch(e.target.value)} id="name" autoComplete="off" placeholder="Enter a location here..." className="outline-1 rounded-md p-2" />

                    </Field>
                    <Button
                        className="w-full max-w-sm"
                        type="submit"

                        disabled={isFetchingForecast}
                    >
                        Search
                        {isFetchingForecast ? <Spinner /> : <Search size={20} />}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

