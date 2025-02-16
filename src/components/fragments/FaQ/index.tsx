import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaQ = () => {
  return (
    <div>
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32  bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How much does OnlineLib cost?</AccordionTrigger>
              <AccordionContent>
                OnlineLib offers various subscription plans starting from $9.99
                per month. We also have a free trial for new users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I read books offline?</AccordionTrigger>
              <AccordionContent>
                Yes, you can download books for offline reading on our mobile
                apps for iOS and Android.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How many books can I read per month?
              </AccordionTrigger>
              <AccordionContent>
                With our unlimited plan, you can read as many books as you want.
                There are no restrictions!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you offer audiobooks?</AccordionTrigger>
              <AccordionContent>
                Yes, we have a growing collection of audiobooks available for
                our premium subscribers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default FaQ;
