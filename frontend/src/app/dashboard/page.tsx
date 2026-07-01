'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usersApi } from '@/lib/api'
import { isAuthenticated, clearTokens } from '@/lib/auth'

interface User {
  id: string
  email: string
  name: string
  is_verified: boolean
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const fetchUser = async () => {
      try {
        const userData = await usersApi.getMyProfile()
        setUser(userData)
      } catch (err) {
        clearTokens()
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    clearTokens()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">🏠 Roomly</h1>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h2>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Verified:</strong> {user?.is_verified ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Member since:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Complete your profile to start finding roommates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>Complete your preferences</span>
                  <Button size="sm" disabled>
                    Coming Soon
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>Browse compatible roommates</span>
                  <Button size="sm" disabled>
                    Coming Soon
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>View your matches</span>
                  <Button size="sm" disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
