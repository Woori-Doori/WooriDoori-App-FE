import { useState, useEffect } from 'react'
import { useAdminHeader } from '@/context/AdminHeaderContext'
import { getUserList, ApiUser } from '@/lib/adminApi'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/ui/select'

interface User {
  id: number
  username: string
  password: string
  nickname: string
  name: string
  phone: string
  birthdate: string
  gender: string
  status: string
}

const getGenderLabel = (gender: string): string => {
  switch (gender) {
    case '1':
      return '남성'
    case '2':
      return '여성'
    case '3':
      return '기타'
    case '4':
      return '미지정'
    default:
      return '미지정'
  }
}

const formatBirthdate = (birthdate: string): string => {
  // YYYYMMDD 형식인 경우
  if (birthdate.length === 8) {
    const year = birthdate.substring(0, 4)
    const month = birthdate.substring(4, 6)
    const day = birthdate.substring(6, 8)
    return `${year}. ${month}. ${day}.`
  }
  // YYMMDD 형식인 경우
  if (birthdate.length === 6) {
    const year = birthdate.substring(0, 2)
    const month = birthdate.substring(2, 4)
    const day = birthdate.substring(4, 6)
    const fullYear = parseInt(year) > 50 ? `19${year}` : `20${year}`
    return `${fullYear}. ${month}. ${day}.`
  }
  return birthdate
}

// API 응답을 User 형식으로 변환
const convertApiUserToUser = (apiUser: ApiUser): User => {
  // birthDate (YYYYMMDD)를 birthdate (YYMMDD)로 변환
  let birthdate = apiUser.birthDate
  if (birthdate.length === 8) {
    birthdate = birthdate.substring(2) // YYYYMMDD → YYMMDD
  }
  
  return {
    id: apiUser.id,
    username: apiUser.memberId,
    password: '', // API에서 제공하지 않음
    nickname: '', // API에서 제공하지 않음
    name: apiUser.memberName,
    phone: apiUser.phone,
    birthdate: birthdate,
    gender: '4', // API에서 제공하지 않음, 기본값 '미지정'
    status: apiUser.status,
  }
}

export function UserManagement() {
  const { setActions } = useAdminHeader()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState<Partial<User>>({})
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // 생성 모달 상태 및 폼
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [createForm, setCreateForm] = useState<Omit<User, 'id'>>({
    username: '',
    password: '',
    nickname: '',
    name: '',
    phone: '',
    birthdate: '',
    gender: '4',
    status: 'ABLE',
  })

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const toggleAll = (checked: boolean): void => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const toggleOne = (id: number, checked: boolean): void => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id])
    } else {
      setSelectedUsers((prev) => prev.filter((userId) => userId !== id))
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setEditForm({ ...user })
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    if (editingUser && editForm) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...editForm } 
          : user
      ))
      setIsEditDialogOpen(false)
      setEditingUser(null)
      setEditForm({})
    }
  }

  const handleDelete = (id: number) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      // 삭제할 사용자의 원래 인덱스 찾기
      const deletedIndex = users.findIndex(user => user.id === id)
      
      // 삭제 후 남은 사용자들의 ID를 1부터 순차적으로 재정렬
      const updatedUsers = users
        .filter(user => user.id !== id)
        .map((user, index) => ({ ...user, id: index + 1 }))
      setUsers(updatedUsers)
      
      // 선택된 사용자 목록 업데이트: 삭제된 사용자 제거하고 새 ID로 매핑
      const updatedSelectedUsers = selectedUsers
        .filter(userId => userId !== id) // 삭제된 사용자 제거
        .map(oldId => {
          // 원래 사용자 목록에서의 인덱스 찾기
          const oldIndex = users.findIndex(u => u.id === oldId)
          if (oldIndex === -1) return null
          
          // 삭제된 사용자보다 앞에 있던 사용자들은 새 ID가 그대로 (oldIndex + 1)
          // 뒤에 있던 사용자들은 새 ID가 -1 (oldIndex)
          const newId = oldIndex < deletedIndex ? oldIndex + 1 : oldIndex
          return newId
        })
        .filter((id): id is number => id !== null && id > 0)
        .sort((a, b) => a - b)
      
      setSelectedUsers(updatedSelectedUsers)
    }
  }

  const handleCreate = () => {
    setIsCreateDialogOpen(true)
  }

  const handleCreateSave = () => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    const newUser: User = { id: newId, ...createForm }
    setUsers(prev => [...prev, newUser])
    setIsCreateDialogOpen(false)
    setCreateForm({
      username: '',
      password: '',
      nickname: '',
      name: '',
      phone: '',
      birthdate: '',
      gender: '4',
      status: 'ABLE',
    })
  }

  const handleExport = () => {
    // 선택된 항목이 있으면 선택된 항목만, 없으면 전체 데이터
    const dataToExport = selectedUsers.length > 0
      ? users.filter(u => selectedUsers.includes(u.id))
      : users

    // CSV 헤더
    const headers = ['ID', '사용자명', '닉네임', '이름', '성별', '전화번호', '생년월일', '상태']
    
    // CSV 데이터 행 생성
    const csvRows = [
      headers.join(','),
      ...dataToExport.map(user => [
        user.id,
        `"${user.username}"`,
        `"${user.nickname}"`,
        `"${user.name}"`,
        `"${getGenderLabel(user.gender)}"`,
        `"${user.phone}"`,
        `"${formatBirthdate(user.birthdate)}"`,
        `"${user.status}"`
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
    link.download = `사용자_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // 전체 사용자 조회 API 호출
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getUserList()
      
      if (response.statusCode === 200 && response.resultMsg === 'SUCCESS') {
        const convertedUsers = response.resultData.map(convertApiUserToUser)
        setUsers(convertedUsers)
      } else {
        setError('사용자 목록을 불러오는데 실패했습니다.')
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('사용자 목록을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    setActions({
      onExport: handleExport,
      onCreate: handleCreate,
      onRefresh: fetchUsers,
    })

    return () => {
      setActions({})
    }
  }, [setActions, selectedUsers, users])

  const sortedUsers = [...users].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id
  })

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-gray-400">로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-[#1a1a1a] text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">사용자 추가</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">새 사용자를 등록하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid gap-2">
              <Label htmlFor="c_username" className="text-gray-700 dark:text-gray-300">사용자명</Label>
              <Input id="c_username" value={createForm.username} onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_password" className="text-gray-700 dark:text-gray-300">패스워드</Label>
              <Input id="c_password" type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_nickname" className="text-gray-700 dark:text-gray-300">닉네임</Label>
              <Input id="c_nickname" value={createForm.nickname} onChange={(e) => setCreateForm({ ...createForm, nickname: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_name" className="text-gray-700 dark:text-gray-300">이름</Label>
              <Input id="c_name" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_phone" className="text-gray-700 dark:text-gray-300">전화번호</Label>
              <Input id="c_phone" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_birthdate" className="text-gray-700 dark:text-gray-300">생년월일 (YYMMDD)</Label>
              <Input id="c_birthdate" value={createForm.birthdate} onChange={(e) => setCreateForm({ ...createForm, birthdate: e.target.value })} placeholder="YYMMDD" className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_gender" className="text-gray-700 dark:text-gray-300">성별</Label>
              <Select value={createForm.gender} onValueChange={(v) => setCreateForm({ ...createForm, gender: v })}>
                <SelectTrigger className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectValue placeholder="성별 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectItem value="1">남성</SelectItem>
                  <SelectItem value="2">여성</SelectItem>
                  <SelectItem value="3">기타</SelectItem>
                  <SelectItem value="4">미지정</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c_status" className="text-gray-700 dark:text-gray-300">상태</Label>
              <Select value={createForm.status} onValueChange={(v) => setCreateForm({ ...createForm, status: v })}>
                <SelectTrigger className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectItem value="ABLE">ABLE</SelectItem>
                  <SelectItem value="DISABLE">DISABLE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCreateDialogOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">취소</Button>
            <Button onClick={handleCreateSave} className="bg-blue-600 hover:bg-blue-700 text-white">저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-[#1a1a1a] text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">사용자 정보 수정</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              사용자 정보를 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">사용자명</Label>
              <Input
                id="username"
                value={editForm.username || ''}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">패스워드</Label>
              <Input
                id="password"
                type="password"
                value={editForm.password || ''}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nickname" className="text-gray-700 dark:text-gray-300">닉네임</Label>
              <Input
                id="nickname"
                value={editForm.nickname || ''}
                onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">이름</Label>
              <Input
                id="name"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">전화번호</Label>
              <Input
                id="phone"
                value={editForm.phone || ''}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birthdate" className="text-gray-700 dark:text-gray-300">생년월일 (YYMMDD)</Label>
              <Input
                id="birthdate"
                value={editForm.birthdate || ''}
                onChange={(e) => setEditForm({ ...editForm, birthdate: e.target.value })}
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white"
                placeholder="YYMMDD"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300">성별</Label>
              <Select
                value={editForm.gender || ''}
                onValueChange={(value: string) => setEditForm({ ...editForm, gender: value })}
              >
                <SelectTrigger className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectValue placeholder="성별 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectItem value="1">남성</SelectItem>
                  <SelectItem value="2">여성</SelectItem>
                  <SelectItem value="3">기타</SelectItem>
                  <SelectItem value="4">미지정</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">상태</Label>
              <Select
                value={editForm.status || ''}
                onValueChange={(value: string) => setEditForm({ ...editForm, status: value })}
              >
                <SelectTrigger className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#2a2a2a] text-gray-900 dark:text-white">
                  <SelectItem value="ABLE">ABLE</SelectItem>
                  <SelectItem value="DISABLE">DISABLE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsEditDialogOpen(false)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-[#1a1a1a]">
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onCheckedChange={toggleAll}
                  className="border-gray-300 dark:border-gray-600"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">
                <button onClick={handleSort} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                  ID
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
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">사용자명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">닉네임</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">이름</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">성별</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">전화번호</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">생년월일</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-gray-400">상태</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-black dark:text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 dark:border-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#0f0f0f] transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => toggleOne(user.id, checked as boolean)}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{user.id}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{user.username}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{user.nickname}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-white">{user.name}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{getGenderLabel(user.gender)}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{user.phone}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{formatBirthdate(user.birthdate)}</td>
                <td className="px-4 py-3 text-sm text-black dark:text-gray-300">{user.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] gap-1.5"
                      onClick={() => handleEdit(user)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      EDIT
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-[#1a1a1a] gap-1.5"
                      onClick={() => handleDelete(user.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      DELETE
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

