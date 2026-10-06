import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/ten/hero-section'
import FeaturesFive from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/five'
import FeaturesSix from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/six'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/two'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/two'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/two'
import Integrations from '@/libs/tailark/registry/bases/radix/dusk/blocks/integrations/one'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/two'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/two'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturesFive />
            <Content />
            <Integrations />
            <FeaturesSix />
            <Stats />
            <Pricing />
            <CallToAction />
            <Footer />
        </>
    )
}
