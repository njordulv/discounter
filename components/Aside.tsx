import { Sidebar, SidebarBody, SidebarContent } from '@/components/ui/sidebar'

const Aside = () => {
  return (
    <Sidebar>
      <SidebarBody className="h-auto top-0 left-0 justify-between gap-10 bg-card">
        <SidebarContent />
      </SidebarBody>
    </Sidebar>
  )
}

export default Aside
