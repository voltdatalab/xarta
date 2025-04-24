
import { SharedDefaults } from '@/components/SharedDefaults'
import { Footer } from '@/components/Xarta/Footer'
import { Header } from '@/components/Xarta/Header'
import { Home as HomeComponent } from '@/components/Xarta/Home/Home'

// Important: https://next-intl.dev/docs/environments/server-client-components#async-components
export default async function Home() {

  return (
    <SharedDefaults>
      <main style={{minHeight: `calc(100vh - 350px)`}}>
        <div>
          <Header></Header>
          <HomeComponent></HomeComponent>
        </div>
      </main>
      <Footer/>
    </SharedDefaults>
  )
}
