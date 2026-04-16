import { FallingPattern } from "@/components/ui/falling-pattern";

export default function CustomColorsDemo() {
	return (
		<div className="w-full relative min-h-screen">
			<FallingPattern
				className="h-screen [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]"
				color="#00ff88"
				duration={80}
				blurIntensity="0.5rem"
				density={2}
			/>
			<div className="absolute inset-0 z-10 flex items-center justify-center">
				<h1 className="font-mono text-7xl font-extrabold tracking-tighter">
					Custom Colors
				</h1>
			</div>
		</div>
	);
}
