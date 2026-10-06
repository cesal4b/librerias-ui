import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/three/hero-section'
import FeaturesFive from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/five'
import FeaturesSix from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/six'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/three'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/one'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/one'
import Team from '@/libs/tailark/registry/bases/radix/dusk/blocks/team/one'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/one'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/one'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturesFive />
            <FeaturesSix />
            <Content />
            <Stats />
            <Team />
            <Pricing />
            <CallToAction />
            <Footer />
        </>
    )
}
