"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  MapPin, 
  Phone,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AccountPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Account Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-playfair ethnic-text bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your account settings and view your orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl font-playfair ethnic-text">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {user.email}
                </CardDescription>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 mt-2">
                  Premium Member
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Member since {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Jodhpur, Rajasthan</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+91 98765 43210</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Actions */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Package className="h-5 w-5 mr-2 text-amber-600" />
                    Orders
                  </CardTitle>
                  <CardDescription>
                    View your order history and track current orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                    <Link href="/orders">
                      <Package className="h-4 w-4 mr-2" />
                      View Orders
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Wishlist
                  </CardTitle>
                  <CardDescription>
                    Manage your saved products and favorites
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                    <Link href="/wishlist">
                      <Heart className="h-4 w-4 mr-2" />
                      View Wishlist
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="h-5 w-5 mr-2 text-amber-600" />
                    Settings
                  </CardTitle>
                  <CardDescription>
                    Update your account information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-50">
                    <Link href="/account/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="h-5 w-5 mr-2 text-amber-600" />
                    Profile
                  </CardTitle>
                  <CardDescription>
                    Edit your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-50">
                    <Link href="/account/profile">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sign Out */}
            <Card className="mt-6 border-red-200 bg-gradient-to-b from-red-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-red-700">
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </CardTitle>
                <CardDescription className="text-red-600">
                  Sign out of your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 