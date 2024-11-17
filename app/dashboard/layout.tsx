import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import Image from 'next/image'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden lg:pl-20">
          <Header />
          <main className="flex-1 overflow-y-auto bg-muted/30">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
          <footer className="border-t bg-background p-4">
            <div className="container mx-auto flex items-center justify-between">
              <Image
                src="https://marmolturco.com/wp-content/uploads/2018/06/go2stone-siyah-logo@4x.png"
                alt="Go2Stone Logo"
                width={100}
                height={35}
                className="object-contain"
              />
              <p className="text-sm text-muted-foreground">
                © 2024 Go2Stone. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}