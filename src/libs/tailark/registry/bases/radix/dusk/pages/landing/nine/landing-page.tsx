import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/nine/hero-section'
import FeaturesTwo from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/two'
import FeaturesSeven from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/seven'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/one'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/one'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/one'
import Testimonials from '@/libs/tailark/registry/bases/radix/dusk/blocks/testimonials/one'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/one'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/one'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturesTwo />
            <Pricing />
            <FeaturesSeven />
            <Testimonials />
            <Stats />
            <CallToAction />
            <Footer />
        </>
    )
}
