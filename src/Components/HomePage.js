import React, { useState } from 'react'
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaUsersLine } from "react-icons/fa6";
import { LuAward } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaTableTennisSolid } from "react-icons/lia";
import { FaChess } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../CSS/HomePage.css"
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#e6f7ff] via-white to-[#e6fffa] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b border-[#40e0d0]/20 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 dark:border-[#40e0d0]/10 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <img src="/MatchMaster.png" alt="Match Master Logo" width={50} height={50} className="w-10 h-10 md:w-12 md:h-12" />
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text">Match Master</span>
        </Link>
        <nav className={`ml-auto flex gap-4 sm:gap-6 ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          {['Features', 'Sports', 'Testimonials', 'Pricing'].map((item) => (
            <Link key={item} className="text-sm font-medium text-gray-600 hover:text-[#40e0d0] dark:text-gray-300 dark:hover:text-[#40e0d0] transition-colors" href={`#${item.toLowerCase()}`}>
              {item}
            </Link>
          ))}
        </nav>
        <Button className="ml-4 bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button className="ml-2 md:hidden" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <IoMenu className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 bg-gradient-to-br from-[#1e3a8a] via-[#2a4a9a] to-[#40e0d0]">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2" {...fadeIn}>
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                  Revolutionize Your <span className="text-[#40e0d0]">Sports Management</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-gray-200 md:text-2xl dark:text-gray-300">
                  From organizing tournaments to tracking scores, Match Master streamlines your entire sports management process.
                </p>
              </motion.div>
              <motion.div className="space-x-4" {...fadeIn} transition={{ delay: 0.2 }}>
                <Button asChild size="lg" className="bg-white text-[#1e3a8a] hover:bg-[#40e0d0] hover:text-white transition-all duration-300">
                  <Link href="/register">Get Started for Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[#1e3a8a] transition-all duration-300">
                  <Link href="#features">Learn More</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text" {...fadeIn}>
              Powerful Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: IoCalendarNumberSharp, title: "Event Management", description: "Create and manage sports events with customizable schedules and brackets." },
                { icon: FaUsersLine, title: "Player Registration", description: "Streamline the registration process for players and teams." },
                { icon: LuAward, title: "Score Tracking", description: "Real-time score updates and automated result calculations." },
                { icon: FaRegStar, title: "Performance Analytics", description: "Gain insights into player and team performance with advanced analytics." },
                { icon: LuAward, title: "Tournament Creation", description: "Easily set up and manage tournaments of any size or format." },
                { icon: FaArrowRightLong, title: "Live Updates", description: "Keep participants and spectators informed with live event updates." },
              ].map((feature, index) => (
                <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.1 }}>
                  <Card className="hover:shadow-xl transition-shadow duration-300 border-[#40e0d0]/20 dark:border-[#40e0d0]/10 overflow-hidden group">
                    <CardHeader className="bg-gradient-to-r from-[#1e3a8a]/5 to-[#40e0d0]/5 group-hover:from-[#1e3a8a]/10 group-hover:to-[#40e0d0]/10 transition-all duration-300">
                      <feature.icon className="w-12 h-12 mb-4 text-[#1e3a8a] dark:text-[#40e0d0] group-hover:scale-110 transition-transform duration-300" />
                      <CardTitle className="text-xl font-semibold text-[#1e3a8a] dark:text-[#40e0d0]">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-300">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="sports" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#e6f7ff] to-[#e6fffa] dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text" {...fadeIn}>
              Supported Sports
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: LiaTableTennisSolid, name: "Table Tennis" },
                { icon: FaChess, name: "Chess" },
                { icon: FaDribbble, name: "Carom" },
                { icon: LuAward, name: "Badminton" },
              ].map((sport, index) => (
                <motion.div key={index} className="flex flex-col items-center" {...fadeIn} transition={{ delay: index * 0.1 }}>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#40e0d0] flex items-center justify-center mb-4 shadow-lg group hover:shadow-xl transition-all duration-300">
                    <sport.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3a8a] dark:text-[#40e0d0]">{sport.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text" {...fadeIn}>
              What Our Users Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", role: "Tournament Organizer", quote: "Match Master has revolutionized how we manage our annual chess tournament. It's a game-changer!" },
                { name: "Sarah Lee", role: "Badminton Coach", quote: "The performance analytics have helped us improve our training strategies. Highly recommended!" },
                { name: "Mike Chen", role: "Table Tennis Player", quote: "As a player, I love how easy it is to track my matches and see my progress over time." },
              ].map((testimonial, index) => (
                <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full border-[#40e0d0]/20 dark:border-[#40e0d0]/10 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-[#1e3a8a] dark:text-[#40e0d0]">{testimonial.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">{testimonial.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="italic text-gray-700 dark:text-gray-200">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#e6f7ff] to-[#e6fffa] dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text" {...fadeIn}>
              Simple, Transparent Pricing
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Basic", price: "$29", features: ["Up to 5 events", "100 player registrations", "Basic analytics", "Email support"] },
                { name: "Pro", price: "$79", features: ["Unlimited events", "Unlimited registrations", "Advanced analytics", "Priority support", "Custom branding"] },
                { name: "Enterprise", price: "Custom", features: ["All Pro features", "Dedicated account manager", "API access", "On-premise deployment option"] },
              ].map((plan, index) => (
                <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full flex flex-col border-[#40e0d0]/20 dark:border-[#40e0d0]/10 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-[#1e3a8a]/5 to-[#40e0d0]/5">
                      <CardTitle className="text-2xl font-bold text-[#1e3a8a] dark:text-[#40e0d0]">{plan.name}</CardTitle>
                      <CardDescription className="text-4xl font-extrabold bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text">{plan.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center text-gray-700 dark:text-gray-200">
                            <IoMdCheckmarkCircleOutline className="w-5 h-5 mr-2 text-[#40e0d0]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300" asChild>
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#1e3a8a] via-[#2a4a9a] to-[#40e0d0] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div className="space-y-2" {...fadeIn}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Sports Management?</h2>
                <p className="max-w-[600px] text-xl text-gray-200 md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users and take your sports events to the next level with Match Master.
                </p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <Button asChild size="lg" className="bg-white text-[#1e3a8a] hover:bg-[#40e0d0] hover:text-white transition-all duration-300">
                  <Link href="/register">Start Your Free Trial</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-white dark:bg-gray-900 border-t border-[#40e0d0]/20 dark:border-[#40e0d0]/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 Match Master. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <Link className="text-sm text-gray-600 hover:text-[#40e0d0] dark:text-gray-400 dark:hover:text-[#40e0d0] transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm text-gray-600 hover:text-[#40e0d0] dark:text-gray-400 dark:hover:text-[#40e0d0] transition-colors" href="#">
                Privacy Policy
              </Link>
              <Link className="text-sm text-gray-600 hover:text-[#40e0d0] dark:text-gray-400 dark:hover:text-[#40e0d0] transition-colors" href="#">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}