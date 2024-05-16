'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How to export bookmarks from web browser?',
    answer: `To export bookmarks from your web browser, access the bookmarks manager, usually found in the toolbar, then select the option to export bookmarks as HTML file.`,
  },
  {
    question: 'Can I import unlimited bookmarks?',
    answer: `Yes, the number of times you can import unlimited bookmarks varies depending on your plan. Afterwards, you can only import bookmarks within your plan's limit.`,
  },
  {
    question: 'When does the usage reset happen?',
    answer: `Usage reset happens on the same day every month, once based on the current billing cycle. You can view the usage info under the settings page.`,
  },
  {
    question: 'Does deleting my bookmarks reduce usage count?',
    answer: `Yes after deleting the bookmarks or tags or favorites, usage count will be adjusted accordingly.`,
  },
  {
    question: 'Can I access my bookmarks from different devices?',
    answer: `Yes, you can access your saved bookmarks from any device via web browser, anytime, as long as you have internet access.`,
  },
  {
    question: 'Do you have a browser extension?',
    answer:
      'Yes, you can download it from the Web Store by searching it or click the link in browser extensions section above.',
  },
  {
    question: 'I have more questions, how can I contact you?',
    answer: `You can contact us through the app\'s "Help" link in profile menu or send us an email to "namdeveloper.ca@gmail.com".`,
  },
]

export default function Faq() {
  return (
    <div className='mx-auto my-8 mt-20 sm:mt-20 flex flex-col items-center'>
      <h2 className='mt-4 mb-1 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]'>
        <span className='bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex'>
          Frequently Asked Questions
        </span>
      </h2>
      <div className='mt-5 max-w-md flex w-full flex-col'>
        <Accordion className='max-w-md' type='single' collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className='!text-left'>{faq.question}</AccordionTrigger>
              <AccordionContent className='text-neutral-600 text-base leading-6'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
