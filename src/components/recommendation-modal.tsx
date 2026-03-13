import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { Cloud, Shirt, Footprints, Icon, Droplets, Thermometer } from "lucide-react"
import { hatBaseball, trousers } from '@lucide/lab'
interface WeatherOutfitData {
    layers: string[]
    summary: string
}

interface RecommendationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    data?: WeatherOutfitData | undefined
    location?: string
    temperature?: number
}

const layerIcons: Record<string, React.ReactNode> = {
    "t-shirt": <Shirt className="w-4 h-4" />,
    shirt: <Shirt className="w-4 h-4" />,
    pants: <Icon iconNode={trousers} className="w-4 h-4" />,
    shorts: <Icon iconNode={trousers} className="w-4 h-4" />,
    jacket: <Droplets className="w-4 h-4" />,
    hat: <Icon iconNode={hatBaseball} className="w-4 h-4" />,
    cap: <Icon iconNode={hatBaseball} className="w-4 h-4" />,
    beanie: <Icon iconNode={hatBaseball} className="w-4 h-4" />,
    shoes: <Footprints className="w-4 h-4" />,
    sneakers: <Footprints className="w-4 h-4" />,
    sandals: <Footprints className="w-4 h-4" />,
}

function getLayerIcon(layer: string) {
    const lower = layer.toLowerCase()
    for (const [key, icon] of Object.entries(layerIcons)) {
        if (lower.includes(key)) return icon
    }
    return <Shirt className="w-4 h-4" />
}

function getLayerColor(index: number) {
    const colors = [
        "bg-sky-100 text-sky-700 border-sky-200",
        "bg-amber-100 text-amber-700 border-amber-200",
        "bg-slate-100 text-slate-700 border-slate-200",
        "bg-teal-100 text-teal-700 border-teal-200",
    ]
    return colors[index]
}

export function RecommendationModal({
    open,
    onOpenChange,
    data,
    location = "New York",
    temperature = 71,
}: RecommendationModalProps) {



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0 border-border/60 shadow-xl">
                {/* Header banner */}
                <div className="bg-weather-header px-6 pt-6 pb-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 rounded-full p-1.5">
                                <Cloud className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-black/80 text-sm font-medium tracking-wide uppercase">
                                Today's Forecast
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                            <Thermometer className="w-3.5 h-3.5 text-black/90" />
                            <span className="text-black text-sm font-semibold">High of {temperature}°F</span>
                        </div>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-black text-xl font-bold text-balance leading-tight">
                            What to wear in {location}
                        </DialogTitle>
                        <DialogDescription className="text-black/70 text-sm mt-1 leading-relaxed">
                            Recommended outfit guide for your child
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-5 bg-background">
                    {/* Layers section */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                            Clothing Layers
                        </h3>
                        <ul className="space-y-2">
                            {data?.layers.map((layer, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 border text-sm font-medium ${getLayerColor(index)}`}
                                >
                                    <span className="shrink-0">{getLayerIcon(layer)}</span>
                                    {layer}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Summary section */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                            Why This Outfit?
                        </h3>
                        <p className="text-sm text-foreground leading-relaxed text-pretty">
                            {data?.summary}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
