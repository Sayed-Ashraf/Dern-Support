import Navbar from "../../Components/Navbar/Navbar"
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "../../Components/ui/accordion"

export default function FAQs() {
  return (
    <>
    <Navbar/>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Get answers to the most common questions about our product.
            </p>
          </div>
          <Accordion className="w-full" collapsible type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              What are IT services and what do they encompass?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              IT services refer to the application of technology expertise to deliver solutions and support for businesses. They encompass a wide range of services such as network management, software development, cybersecurity, cloud computing, and technical support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              Why are IT services important for businesses?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              IT services are crucial for businesses as they help optimize operations, enhance productivity, streamline processes, improve data security, enable digital transformation, and provide technical expertise and support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              What are the different types of IT services commonly offered?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              Common types of IT services include network management, infrastructure management, cybersecurity, cloud computing, software development, data management, IT consulting, technical support, and IT project management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              How can IT services help improve operational efficiency in organizations?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              IT services can improve operational efficiency by implementing streamlined processes, automation, optimizing network infrastructure, utilizing cloud services, and providing scalable solutions tailored to business needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              What is the role of IT services in ensuring data security and privacy?
              </AccordionTrigger>
              <AccordionContent className="bg-gray-100 px-4 py-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              IT services play a critical role in ensuring data security and privacy by implementing robust cybersecurity measures, conducting regular security audits, implementing secure data storage and transmission practices, and adhering to data protection regulations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
    </>
  )
}