export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  )
}
