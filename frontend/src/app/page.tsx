import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">🏠 Roomly</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Find Your Perfect Roommate
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Match based on lifestyle compatibility, not just location.
            Because who you live with matters more than where you live.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our algorithm considers sleep schedules, cleanliness, budget, and habits to find compatible roommates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💬 Connect First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Chat with potential roommates before committing. Real-time messaging helps you make the right choice.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🛡️ Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Report and block features keep the community safe. Verified profiles build trust.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Ready to find your roommate?</CardTitle>
              <CardDescription>
                Join thousands of people finding compatible living arrangements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/register">
                <Button size="lg" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2026 Roomly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
