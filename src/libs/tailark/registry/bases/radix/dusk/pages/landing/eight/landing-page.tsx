import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/eight'
import FeaturesThree from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/three'
import FeaturesFive from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/five'
import FeaturesFour from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/four'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/two'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/two'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/two'
import LogoCloud from '@/libs/tailark/registry/bases/radix/dusk/blocks/logo-cloud/three'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/two'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/two'
import Testimonials from '@/libs/tailark/registry/bases/radix/dusk/blocks/testimonials/one'
import FAQs from '@/libs/tailark/registry/bases/radix/dusk/blocks/faqs/one'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <LogoCloud />
            <FeaturesFour />
            <FeaturesFive />
            <Content />
            <FeaturesThree />
            <Stats />
            <Pricing />
            <FAQs />
            <Testimonials />
            <CallToAction />
            <Footer />
        </>
    )
}
