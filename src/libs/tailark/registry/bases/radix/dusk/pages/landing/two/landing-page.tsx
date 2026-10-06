import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/two/hero-section'
import FeaturesThree from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/three'
import FeaturesFour from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/four'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/two'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/two'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/two'
import FAQs from '@/libs/tailark/registry/bases/radix/dusk/blocks/faqs/one'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/two'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/two'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturesThree />
            <Content />
            <FeaturesFour />
            <Stats />
            <Pricing />
            <FAQs />
            <CallToAction />
            <Footer />
        </>
    )
}
