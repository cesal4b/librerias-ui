import HeroSection from '@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/seven/hero-section'
import FeaturesSix from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/six'
import FeaturesSeven from '@/libs/tailark/registry/bases/radix/dusk/blocks/features/seven'
import Content from '@/libs/tailark/registry/bases/radix/dusk/blocks/content/three'
import Stats from '@/libs/tailark/registry/bases/radix/dusk/blocks/stats/one'
import Pricing from '@/libs/tailark/registry/bases/radix/dusk/blocks/pricing/one'
import FAQs from '@/libs/tailark/registry/bases/radix/dusk/blocks/faqs/one'
import CallToAction from '@/libs/tailark/registry/bases/radix/dusk/blocks/call-to-action/one'
import Footer from '@/libs/tailark/registry/bases/radix/dusk/blocks/footer/one'

export default function DuskLandingPage() {
    return (
        <>
            <HeroSection />
            <Content />
            <FeaturesSix />
            <Stats />
            <FeaturesSeven />
            <Pricing />
            <FAQs />
            <CallToAction />
            <Footer />
        </>
    )
}
