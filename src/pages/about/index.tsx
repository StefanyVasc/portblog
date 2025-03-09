import { Milestone } from 'lucide-react'
import { useMemo } from 'react'

import { Avatar, CustomTimeline, Header, Paragraph } from '@/components'
import { aboutILike, careerItems } from '@/static'

export function About() {
  const items = useMemo(() => careerItems.items, [])

  return (
    <div>
      <Header headerName="About..." />
      <section className="py-5">
        <div className="my-10 ">
          <h5>...Me</h5>
          <div className="flex items-center justify-center">
            <Avatar />
            <Paragraph>
              Hi, I&apos;m Goku!... Wait a minute 😅... <br />
              ...Hello there, my name is{' '}
              <span className="text-white bg-rose-500 dark:bg-rose-500 px-2  mr-1 rounded-md hover:bg-black hover:text-white transition-all duration-300">
                Stefany Sá
              </span>
              and I am a Front End Developer.
            </Paragraph>
          </div>
          {/* Características em Grid */}

          <div className="p-6 border rounded-lg shadow-md  mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {aboutILike.map((item, index) => (
                <div key={index} className="flex flex-col justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="">{item.icon}</div>

                    <span className="text-gray-700 dark:text-gray-300 font-400">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-gray-500 dark:text-gray-50 font-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h5>...Career</h5>
          <Paragraph>
            As an enthusiast of the user interface and dedicated Front End
            Developer with an unshakable passion for JavaScript. With over six
            years of experience, I bring a deep understanding of critical
            technologies, including HTML, CSS, JavaScript, TypeScript, ReactJS,
            Tailwind CSS, D3.js for interactive graph creation, Angular, Git,
            and Github. Throughout my professional journey, I maintain an
            unwavering commitment to continuous learning, regularly exploring
            emerging technologies and conducting Proof of Concepts (POCs).
          </Paragraph>

          <div className="py-10">
            <h5 className="flex gap-2 items-center">
              The road so far...
              <Milestone size={18} />
            </h5>
            <CustomTimeline items={items} />
          </div>
        </div>

        {/* <div className="mb-5">
          <h5>...Socials</h5>
        </div> */}
      </section>
    </div>
  )
}
