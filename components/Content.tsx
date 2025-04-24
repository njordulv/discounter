import Aside from '@/components/Aside'
import MobileSidebar from '@/components/MobileSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper">
      <Aside />
      <MobileSidebar />
      <div className="w-full mx-auto h-screen">
        <Header />
        <main className="w-full max-w-5xl mx-auto h-[calc(100vh-5.6rem)] sm:py-16 py-2 px-2 flex flex-col sm:gap-3 gap-2 relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
