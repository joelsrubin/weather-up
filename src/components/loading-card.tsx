import { Card, CardHeader, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function LoadingCard() {
    return (
        <Card className="w-full max-w-sm rounded-3xl border-border shadow-sm bg-card mb-6">
            <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Skeleton className="aspect-video w-full" />
            </CardContent>
        </Card>
    )
}