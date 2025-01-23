import WelcomeSection from "./WelcomeSection";
import SupportForm from "./SupportForm";
import AskedQuestions from "@/components/question/AskedQuestions";
import SubscriptionBox from "@/components/subscription/SubscriptionBox";

const SupportPage = () => {
    return (
        <main className="container lg:pt-20 pt-10 lg:pb-8">
            <section className="grid grid-cols-5 xl:gap-10 lg:gap-6 md:gap-4 gap-8">
                <WelcomeSection />
                <SupportForm />
            </section>
            <AskedQuestions />
            <SubscriptionBox />
        </main>
    );
}

export default SupportPage;