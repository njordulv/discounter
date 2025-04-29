import Aside from '@/components/Aside'
import MobileSidebar from '@/components/MobileSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper">
      <Aside />
      <MobileSidebar />
      <main className="relative w-full overflow-auto flex-1 flex flex-col min-h-[calc(100vh-3rem)]">
        <Header />
        <section className="max-w-5xl w-full h-auto mx-auto flex flex-col sm:py-16 py-2 px-2 gap-2">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
