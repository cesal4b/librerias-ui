import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/six/hero-section'
import FeaturesFour from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/four'
import FeaturesFive from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/five'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/two'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/two'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/two'
import Team from '@/libs/tailark/registry/bases/radix/dusk/blocks/team/two'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/two'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/two'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturesFour />
            <FeaturesFive />
            <Content />
            <Pricing />
            <Stats />
            <Team />
            <CallToAction />
            <Footer />
        </>
    )
}
