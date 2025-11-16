/**
 * loading.tsx
 * Next.js automatically shows this component while 'page.tsx' is fetching data.
 * This replaces the 'loading' state logic.
 */
export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="h-[500px] bg-gray-200 rounded-2xl w-full"></div>
            <div className="grid md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                    <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                ))}
            </div>
        </div>
    )
}