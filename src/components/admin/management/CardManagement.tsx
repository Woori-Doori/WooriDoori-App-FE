import { useState, useEffect } from 'react'
import { useAdminHeader } from '@/context/AdminHeaderContext'
import { Button } from '@/components/admin/ui/button'
import { Checkbox } from '@/components/admin/ui/checkbox'
import { Input } from '@/components/admin/ui/input'
import { Label } from '@/components/admin/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/admin/ui/dialog'

interface Card {
  id: number
  card_name: string
  annual_fee_1: string
  annual_fee_2: string
  file_id: number
  card_benef: string
  card_type: string
  card_svc: string
  card_url: string
}

type SortOrder = 'asc' | 'desc'

const initialCards: Card[] = [
  { 
    id: 0, 
    card_name: '카드의정석 EVERY DISCOUNT', 
    annual_fee_1: '국내전용 12,000', 
    annual_fee_2: '해외겸용 12,000', 
    file_id: 2233, 
    card_benef: '국내외가맹점 0.8% 청구 할인 | 국내 온라인 간편결제 2% 청구 할인', 
    card_type: 'credit', 
    card_svc: 'T', 
    card_url: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103729&canvasser=88801014' 
  },
  { 
    id: 1, 
    card_name: '카드의정석 SHOPPING+', 
    annual_fee_1: '국내전용 10,000', 
    annual_fee_2: '해외겸용 12,000', 
    file_id: 2234, 
    card_benef: '온라인 쇼핑/백화점/대형할인점/슈퍼마켓 등 10% 청구 할인', 
    card_type: 'credit', 
    card_svc: 'T', 
    card_url: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=102492&canvasser=88801014' 
  },
  { 
    id: 2, 
    card_name: '카드의정석 TEN', 
    annual_fee_1: '국내전용 12,000', 
    annual_fee_2: '해외겸용 12,000', 
    file_id: 2235, 
    card_benef: '카페 10% 할인 | 편의점 10% 할인 | 음식점/주점 1% 할인', 
    card_type: 'credit', 
    card_svc: 'T', 
    card_url: 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=103686&canvasser=88801014' 
  },
]

export function CardManagement() {
  const { setActions } = useAdminHeader()
  const t = (key: string): string => {
    const map: Record<string, string> = {
      'table.id': 'ID',
      'table.cardName': '카드명',
      'table.annualFee1': '연회비(국내전용)',
      'table.annualFee2': '연회비(해외겸용)',
      'table.fileId': '파일ID',
      'table.cardBenefit': '카드혜택',
      'table.cardType': '카드타입',
      'table.cardService': '카드서비스',
      'table.cardUrl': '카드URL',
      'table.link': '링크',
      'table.edit': 'EDIT',
      'table.delete': 'DELETE',
      'table.create': 'CREATE',
      'table.export': 'EXPORT',
    }
    return map[key] || key
  }
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  // 카드 리스트 로컬 상태로 관리 (생성 지원)
  const [cardsState, setCardsState] = useState<Card[]>(initialCards)

  // 생성 모달 상태 및 폼
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [createForm, setCreateForm] = useState<Omit<Card, 'id'>>({
    card_name: '',
    annual_fee_1: '',
    annual_fee_2: '',
    file_id: 0,
    card_benef: '',
    card_type: 'credit',
    card_svc: 'T',
    card_url: '',
  })

  const toggleAll = (checked: boolean): void => {
    if (checked) {
      setSelectedIds(cardsState.map((c) => c.id))
    } else {
      setSelectedIds([])
    }
  }

  const toggleOne = (id: number, checked: boolean): void => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id))
    }
  }

  const handleSort = (): void => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleEdit = (id: number) => {
    console.log('Edit card:', id)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      console.log('Delete card:', id)
    }
  }

  const handleCreate = () => {
    setIsCreateDialogOpen(true)
  }

  const handleCreateSave = () => {
    const newId = cardsState.length > 0 ? Math.max(...cardsState.map(c => c.id)) + 1 : 1
    const newCard: Card = { id: newId, ...createForm }
    setCardsState(prev => [...prev, newCard])
    setIsCreateDialogOpen(false)
    setCreateForm({
      card_name: '',
      annual_fee_1: '',
      annual_fee_2: '',
      file_id: 0,
      card_benef: '',
      card_type: 'credit',
      card_svc: 'T',
      card_url: '',
    })
  }

  const handleExport = () => {
    // 선택된 항목이 있으면 선택된 항목만, 없으면 전체 데이터
    const dataToExport = selectedIds.length > 0
      ? cardsState.filter(c => selectedIds.includes(c.id))
      : cardsState

    // CSV 헤더
    const headers = [
      t('table.id'),
      t('table.cardName'),
      t('table.annualFee1'),
      t('table.annualFee2'),
      t('table.fileId'),
      t('table.cardBenefit'),
      t('table.cardType'),
      t('table.cardService'),
      t('table.cardUrl'),
    ]
    
    // CSV 데이터 행 생성
    const csvRows = [
      headers.join(','),
      ...dataToExport.map(card => [
        card.id,
        `"${card.card_name}"`,
        `"${card.annual_fee_1}"`,
        `"${card.annual_fee_2}"`,
        card.file_id,
        `"${card.card_benef}"`,
        `"${card.card_type}"`,
        `"${card.card_svc}"`,
        `"${card.card_url}"`
      ].join(','))
    ]

    // CSV 문자열 생성
    const csvContent = csvRows.join('\n')
    
    // BOM 추가 (Excel에서 한글 깨짐 방지)
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    
            // 다운로드 링크 생성
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `카드_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    setActions({
      onCreate: handleCreate,
      onExport: handleExport,
      onRefresh: () => {
        // 소프트 리프레시: 정렬상태 토글 후 원복하여 리렌더 유도
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        setTimeout(() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc')), 0)
      },
    })

    return () => {
      setActions({})
    }
  }, [setActions])

  const sortedCards = [...cardsState].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id
  })

  return (
    <div className="w-full">
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-[#1a1a1a] text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">카드 추가</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">새 카드를 등록하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid gap-2">
              <Label htmlFor="card_name" className="text-gray-700 dark:text-gray-300">카드명</Label>
              <Input id="card_name" value={createForm.card_name} onChange={(e) => setCreateForm({ ...createForm, card_name: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="annual_fee_1" className="text-gray-700 dark:text-gray-300">연회비(국내전용)</Label>
              <Input id="annual_fee_1" value={createForm.annual_fee_1} onChange={(e) => setCreateForm({ ...createForm, annual_fee_1: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="annual_fee_2" className="text-gray-700 dark:text-gray-300">연회비(해외겸용)</Label>
              <Input id="annual_fee_2" value={createForm.annual_fee_2} onChange={(e) => setCreateForm({ ...createForm, annual_fee_2: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file_id" className="text-gray-700 dark:text-gray-300">파일ID</Label>
              <Input id="file_id" type="number" value={createForm.file_id} onChange={(e) => setCreateForm({ ...createForm, file_id: Number(e.target.value) })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card_benef" className="text-gray-700 dark:text-gray-300">카드혜택</Label>
              <Input id="card_benef" value={createForm.card_benef} onChange={(e) => setCreateForm({ ...createForm, card_benef: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card_type" className="text-gray-700 dark:text-gray-300">카드타입</Label>
              <Input id="card_type" value={createForm.card_type} onChange={(e) => setCreateForm({ ...createForm, card_type: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card_svc" className="text-gray-700 dark:text-gray-300">카드서비스</Label>
              <Input id="card_svc" value={createForm.card_svc} onChange={(e) => setCreateForm({ ...createForm, card_svc: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card_url" className="text-gray-700 dark:text-gray-300">카드URL</Label>
              <Input id="card_url" value={createForm.card_url} onChange={(e) => setCreateForm({ ...createForm, card_url: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCreateDialogOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">취소</Button>
            <Button onClick={handleCreateSave} className="bg-blue-600 hover:bg-blue-700 text-white">저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1a1a1a]">
                      <th className="w-12 px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedIds.length === cardsState.length && cardsState.length > 0}
                          onCheckedChange={toggleAll}
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        <button onClick={handleSort} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                          {t('table.id')}
                          <svg
                            className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.cardName')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.annualFee1')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.annualFee2')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.fileId')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.cardBenefit')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.cardType')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.cardService')}</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{t('table.cardUrl')}</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400"></th>
                    </tr>
                  </thead>
          <tbody>
            {sortedCards.map((card) => (
              <tr key={card.id} className="border-b border-gray-200 dark:border-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(card.id)}
                    onCheckedChange={(checked) => toggleOne(card.id, checked as boolean)}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.id}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-white whitespace-nowrap">{card.card_name}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.annual_fee_1}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.annual_fee_2}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.file_id}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.card_benef}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.card_type}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">{card.card_svc}</td>
                        <td className="px-4 py-3 text-sm text-black dark:text-gray-300 whitespace-nowrap">
                          <a href={card.card_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline whitespace-nowrap">
                            {t('table.link')}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] gap-1.5"
                              onClick={() => handleEdit(card.id)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              {t('table.edit')}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-[#1a1a1a] gap-1.5"
                              onClick={() => handleDelete(card.id)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              {t('table.delete')}
                            </Button>
                          </div>
                        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
