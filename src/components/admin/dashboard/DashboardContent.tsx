export function DashboardContent() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-[#1a1a1a]">
          <h3 className="text-gray-400 text-sm mb-2">전체 상품</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-[#1a1a1a]">
          <h3 className="text-gray-400 text-sm mb-2">전체 사용자</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-[#1a1a1a]">
          <h3 className="text-gray-400 text-sm mb-2">총 주문</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-[#1a1a1a]">
          <h3 className="text-gray-400 text-sm mb-2">총 매출</h3>
          <p className="text-3xl font-bold text-white">₩0</p>
        </div>
      </div>
    </div>
  )
}

