import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/one/hero-section'
import FeaturesOne from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/one'
import FeaturesTwo from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/two'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/one'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/one'
import Testimonials from '@/libs/tailark/registry/bases/radix/dusk/blocks/testimonials/one'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/one'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/one'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturesOne />
            <Stats />
            <FeaturesTwo />
            <Pricing />
            <Testimonials />
            <CallToAction />
            <Footer />
        </>
    )
}
