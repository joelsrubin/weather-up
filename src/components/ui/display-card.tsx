import { Card, CardContent } from "./card";

export function DisplayCard({ children }: { children: React.ReactNode }) {
    return (
        <Card className="w-full max-w-sm rounded-3xl border-border shadow-sm bg-card mb-6">
            <CardContent className="p-8 space-y-6">
                {children}
            </CardContent>
        </Card>
    )
}