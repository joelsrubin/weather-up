import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type TGetStartedProps = {
    className?: string;
    selectedZip: number | null;
    setSelectedZip: React.Dispatch<React.SetStateAction<number | null>>
}

export function GetStartedForm({
    className,
    setSelectedZip
}: TGetStartedProps) {
    return (
        <div className={cn("flex flex-col gap-6", className)} >
            <Card>
                <CardHeader>
                    <CardTitle>Enter your zip code to get started</CardTitle>
                    <CardDescription>
                        Enter your zip code to get a personalized forecast
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Zip Code</FieldLabel>
                                <Input
                                    id="zip"
                                    type="number"
                                    min={0}
                                    onChange={(e) => {
                                        console.log(e)
                                        setSelectedZip(Number(e.target.value))
                                    }
                                    }
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Get Started</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
